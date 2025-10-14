#!/usr/bin/env python3
"""
Content Migration Script for gov.bb

Fetches HTML from old gov.bb pages and uses Google Gemini 2.5 Flash
to extract main content as markdown with frontmatter.
"""

import argparse
import csv
import json
import logging
import os
import re
import time
from datetime import date
from pathlib import Path

import requests
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Suppress SSL warnings for gov.bb
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Load environment variables
load_dotenv()

# Configuration
SCRIPT_DIR = Path(__file__).parent
CSV_FILE = SCRIPT_DIR / "url_sitemap.csv"
OUTPUT_DIR = SCRIPT_DIR / "output"
PROMPT_FILE = SCRIPT_DIR / "prompt.md"
LOG_FILE = SCRIPT_DIR / "migration.log"
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Category descriptions for IA JSON
CATEGORY_DESCRIPTIONS = {
    "Family, Birth and Relationships": "Managing key life events and family responsibilities, from registering a birth to caring for others",
    "Work and Employment": "Employment services, tax information, and workplace resources",
    "Travel, ID and Citizenship": "Passports, visas, identification, and travel information for citizens and visitors",
    "Business and Trade": "Starting and operating a business, including registration, policies, and tax information",
    "Government, Democracy and Civic Life": "Information about Barbados' government structure, officials, departments, and national symbols",
}


def slugify(text: str) -> str:
    """Convert text to a URL-friendly slug."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')


def load_prompt_template() -> str:
    """Load the prompt template from prompt.md."""
    with open(PROMPT_FILE, 'r', encoding='utf-8') as f:
        return f.read()


def fetch_html(url: str) -> str:
    """Fetch HTML content from a URL."""
    logger.info(f"Fetching: {url}")
    try:
        # Disable SSL verification for gov.bb (certificate issues)
        response = requests.get(url, timeout=30, verify=False)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch {url}: {e}")
        raise


def sanitize_urls_in_markdown(markdown: str) -> str:
    """
    Sanitize URLs in markdown by encoding spaces and other special characters.
    Handles both inline links [text](url) and images ![alt](url).
    """
    def encode_url(match):
        """Encode spaces and special characters in URL."""
        prefix = match.group(1)  # '](' or '![]('
        url = match.group(2)

        # Only encode if URL contains spaces or unencoded characters
        if ' ' in url or any(char in url for char in ['[', ']', '(', ')']):
            # Replace spaces with %20
            url = url.replace(' ', '%20')
            # Could add more encoding here if needed

        return f"{prefix}{url})"

    # Pattern to match markdown links and images
    # Matches: [text](url) or ![alt](url)
    pattern = r'(!?\]\()([^)]+)\)'

    sanitized = re.sub(pattern, encode_url, markdown)
    return sanitized


def detect_html_tags(markdown: str) -> list[str]:
    """
    Detect HTML tags in the markdown content.
    Returns a list of unique HTML tags found (e.g., ['div', 'p', 'span']).
    """
    # Pattern to match HTML tags like <tag> or </tag> or <tag attr="value">
    # Excludes code blocks (lines starting with 4 spaces or inside ```)
    html_tag_pattern = r'</?([a-zA-Z][a-zA-Z0-9]*)[^>]*>'

    # Split by code blocks to avoid matching tags in code examples
    lines = markdown.split('\n')
    tags_found = []
    in_code_block = False

    for line in lines:
        # Track code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            continue

        # Skip lines in code blocks or indented code
        if in_code_block or line.startswith('    '):
            continue

        # Find HTML tags in this line
        matches = re.findall(html_tag_pattern, line)
        tags_found.extend(matches)

    # Return unique tags, case-insensitive
    unique_tags = list(set(tag.lower() for tag in tags_found))
    return unique_tags


def extract_content_with_gemini(html: str, url: str, prompt_template: str, max_retries: int = 2) -> str:
    """
    Use Google Gemini to extract main content as markdown.
    Retries if HTML tags are detected in the output.
    """
    # Initialize Gemini client
    client = genai.Client(api_key=GOOGLE_API_KEY)

    # Replace the example URL in the prompt with the actual URL
    base_prompt = prompt_template.replace(
        "https://www.gov.bb/Citizens/apply-passport",
        url
    )

    attempt = 0
    while attempt <= max_retries:
        # Build the full prompt
        if attempt == 0:
            full_prompt = f"{base_prompt}\n\n{html}"
        else:
            # Add feedback about HTML tags found in previous attempt
            feedback = f"\n\n**CRITICAL CORRECTION REQUIRED:**\nYour previous output contained HTML tags: {', '.join(f'<{tag}>' for tag in html_tags_found)}\n\nYou MUST convert ALL HTML to pure Markdown. Do NOT include any HTML tags in your output.\n\nPlease re-process the content and ensure your output contains ONLY Markdown formatting.\n\n"
            full_prompt = f"{base_prompt}{feedback}\n\n{html}"

        logger.info(f"Calling Gemini API for content extraction (attempt {attempt + 1}/{max_retries + 1})...")
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=full_prompt
            )

            markdown_output = response.text

            # Sanitize URLs (encode spaces to %20)
            markdown_output = sanitize_urls_in_markdown(markdown_output)

            # Check for HTML tags in the output
            html_tags_found = detect_html_tags(markdown_output)

            if html_tags_found:
                logger.warning(f"HTML tags detected in output: {', '.join(html_tags_found)}")
                if attempt < max_retries:
                    logger.info(f"Retrying extraction to remove HTML tags...")
                    attempt += 1
                    time.sleep(1)  # Brief delay before retry
                    continue
                else:
                    logger.error(f"Max retries reached. Output still contains HTML tags: {', '.join(html_tags_found)}")
                    # Return anyway but log the issue
                    return markdown_output
            else:
                if attempt > 0:
                    logger.info(f"✓ Successfully removed HTML tags on retry {attempt}")
                return markdown_output

        except Exception as e:
            logger.error(f"Gemini API error: {e}")
            raise

    return markdown_output


def parse_markdown_response(markdown: str) -> tuple[str, str]:
    """
    Parse the Gemini response to extract frontmatter and content.
    Returns (title, full_markdown)
    """
    # Extract title from frontmatter
    title_match = re.search(r'^title:\s*["\']?(.+?)["\']?\s*$', markdown, re.MULTILINE)
    title = title_match.group(1) if title_match else "Untitled"

    return title, markdown


def add_extraction_date(markdown: str, extraction_date: str) -> str:
    """Add extraction_date field to the frontmatter."""
    # Find the end of the frontmatter (second ---)
    parts = markdown.split('---', 2)
    if len(parts) >= 3:
        frontmatter = parts[1].rstrip()  # Remove trailing whitespace
        content = parts[2]

        # Add extraction_date to frontmatter
        frontmatter += f"\nextraction_date: {extraction_date}\n"

        return f"---{frontmatter}---{content}"
    else:
        logger.warning("Could not parse frontmatter, adding extraction_date at top")
        return f"---\nextraction_date: {extraction_date}\n---\n\n{markdown}"


def update_title_in_frontmatter(markdown: str, csv_title: str) -> str:
    """Update the title in frontmatter if CSV has a title."""
    if not csv_title:
        return markdown

    # Replace title in frontmatter
    updated = re.sub(
        r'^title:\s*["\']?.+?["\']?\s*$',
        f'title: "{csv_title}"',
        markdown,
        count=1,
        flags=re.MULTILINE
    )

    return updated


def add_section_to_frontmatter(markdown: str, section: str) -> str:
    """Add section field to the frontmatter."""
    if not section:
        return markdown

    # Find the end of the frontmatter (second ---)
    parts = markdown.split('---', 2)
    if len(parts) >= 3:
        frontmatter = parts[1].rstrip()  # Remove trailing whitespace
        content = parts[2]

        # Add section to frontmatter
        frontmatter += f'\nsection: "{section}"\n'

        return f"---{frontmatter}---{content}"
    else:
        logger.warning("Could not parse frontmatter for section")
        return markdown


def extract_description_from_markdown(markdown: str) -> str:
    """Extract description from frontmatter."""
    desc_match = re.search(r'^description:\s*["\']?(.+?)["\']?\s*$', markdown, re.MULTILINE)
    return desc_match.group(1) if desc_match else ""


def generate_ia_json(pages_metadata: list[dict], output_file: Path):
    """Generate hierarchical IA JSON file grouped by sections."""
    # Group pages by section
    sections_dict = {}
    for page in pages_metadata:
        section = page.get("section", "Uncategorized")
        if section not in sections_dict:
            sections_dict[section] = []

        # Build page object without filename
        page_obj = {
            "title": page["title"],
            "slug": page["slug"],
            "source_url": page["source_url"],
            "description": page.get("description", ""),
            "extraction_date": page["extraction_date"]
        }

        # Add last_updated_date if present
        if page.get("last_updated_date"):
            page_obj["last_updated_date"] = page["last_updated_date"]

        sections_dict[section].append(page_obj)

    # Build array of ServiceCategoryType objects
    ia = []
    for section_title, pages in sections_dict.items():
        category = {
            "title": section_title,
            "slug": slugify(section_title),
            "description": CATEGORY_DESCRIPTIONS.get(section_title, ""),
            "pages": pages
        }
        ia.append(category)

    # Write JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(ia, f, indent=2, ensure_ascii=False)

    logger.info(f"Generated IA JSON: {output_file}")


def save_markdown(markdown: str, filename: str):
    """Save markdown content to a file."""
    output_path = OUTPUT_DIR / filename

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(markdown)

    logger.info(f"Saved: {output_path}")


def process_page(row: dict, prompt_template: str, extraction_date: str) -> tuple[bool, dict | None]:
    """
    Process a single page from the CSV.
    Returns (success, page_metadata) where page_metadata contains info for IA JSON.
    """
    page_name = row.get('Page names', '').strip()
    section = row.get('Section', '').strip()
    old_url = row.get('Old URL', '').strip()

    # Skip if no URL
    if not old_url:
        logger.debug(f"Skipping '{page_name}' - no URL")
        return False, None

    logger.info(f"\n{'=' * 80}")
    logger.info(f"Processing: {page_name or old_url}")
    logger.info(f"URL: {old_url}")

    try:
        # Fetch HTML
        html = fetch_html(old_url)

        # Extract content with Gemini
        markdown = extract_content_with_gemini(html, old_url, prompt_template)

        # Add extraction date
        markdown = add_extraction_date(markdown, extraction_date)

        # Add section if available
        if section:
            markdown = add_section_to_frontmatter(markdown, section)

        # Update title if CSV has one
        if page_name:
            markdown = update_title_in_frontmatter(markdown, page_name)

        # Parse to get title for filename
        title, markdown = parse_markdown_response(markdown)

        # Extract description for metadata
        description = extract_description_from_markdown(markdown)

        # Generate filename
        filename = f"{slugify(title)}.md"
        slug = slugify(title)

        # Build metadata for IA JSON
        metadata = {
            "title": title,
            "slug": slug,
            "section": section if section else "Uncategorized",
            "source_url": old_url,
            "description": description,
            "extraction_date": extraction_date
        }

        # Check if file already exists
        output_path = OUTPUT_DIR / filename
        if output_path.exists():
            logger.info(f"File already exists, skipping: {filename}")
            return True, metadata

        # Save markdown
        save_markdown(markdown, filename)

        logger.info(f"✓ Successfully processed: {title}")
        return True, metadata

    except Exception as e:
        logger.error(f"✗ Failed to process '{page_name or old_url}': {e}")
        return False, None


def main():
    """Main migration script."""
    parser = argparse.ArgumentParser(
        description="Migrate content from old gov.bb site using Google Gemini"
    )
    parser.add_argument(
        '--limit',
        type=int,
        help='Limit processing to first N pages (useful for testing)'
    )
    args = parser.parse_args()

    # Validate environment
    if not GOOGLE_API_KEY:
        logger.error("GOOGLE_API_KEY not found in .env file")
        return 1

    if not CSV_FILE.exists():
        logger.error(f"CSV file not found: {CSV_FILE}")
        return 1

    if not PROMPT_FILE.exists():
        logger.error(f"Prompt file not found: {PROMPT_FILE}")
        return 1

    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True)

    # Load prompt template
    prompt_template = load_prompt_template()

    # Get today's date
    extraction_date = date.today().strftime('%Y-%m-%d')

    logger.info(f"Starting migration...")
    logger.info(f"CSV file: {CSV_FILE}")
    logger.info(f"Output directory: {OUTPUT_DIR}")
    logger.info(f"Extraction date: {extraction_date}")
    if args.limit:
        logger.info(f"Limit: {args.limit} pages")

    # Read CSV
    with open(CSV_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    # Filter rows with valid URLs
    rows_with_urls = [row for row in rows if row.get('Old URL', '').strip()]
    total_pages = len(rows_with_urls)

    logger.info(f"Found {total_pages} pages with URLs")

    # Apply limit if specified
    if args.limit:
        rows_with_urls = rows_with_urls[:args.limit]
        logger.info(f"Processing first {len(rows_with_urls)} pages")

    # Process each page
    success_count = 0
    failure_count = 0
    pages_metadata = []

    for i, row in enumerate(rows_with_urls, 1):
        logger.info(f"\n[{i}/{len(rows_with_urls)}]")

        success, metadata = process_page(row, prompt_template, extraction_date)

        if success and metadata:
            success_count += 1
            pages_metadata.append(metadata)
        else:
            failure_count += 1

        # Rate limiting - small delay between requests
        if i < len(rows_with_urls):
            time.sleep(2)  # 2 second delay between pages

    # Generate IA JSON file
    if pages_metadata:
        ia_file = OUTPUT_DIR / "content-ia.json"
        generate_ia_json(pages_metadata, ia_file)

    # Summary
    logger.info(f"\n{'=' * 80}")
    logger.info("Migration complete!")
    logger.info(f"Successful: {success_count}")
    logger.info(f"Failed: {failure_count}")
    logger.info(f"Total: {success_count + failure_count}")
    logger.info(f"Output directory: {OUTPUT_DIR}")
    logger.info(f"Log file: {LOG_FILE}")
    if pages_metadata:
        logger.info(f"IA JSON file: {OUTPUT_DIR / 'content-ia.json'}")

    return 0 if failure_count == 0 else 1


if __name__ == "__main__":
    exit(main())
