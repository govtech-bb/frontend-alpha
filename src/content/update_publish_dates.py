#!/usr/bin/env python3
import subprocess
import re
from pathlib import Path

CONTENT_DIR = Path(__file__).parent
GIT_ROOT = CONTENT_DIR.parent.parent


def get_git_date(filepath):
    try:
        rel_path = filepath.relative_to(GIT_ROOT)
        result = subprocess.run(
            ["git", "log", "-1", "--format=%cd", "--date=short", "--", str(rel_path)],
            capture_output=True,
            text=True,
            cwd=GIT_ROOT,
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
    except Exception as e:
        print(f"  Error getting git date: {e}")
    return None


def is_git_tracked(filepath):
    try:
        rel_path = filepath.relative_to(GIT_ROOT)
        result = subprocess.run(
            ["git", "ls-files", "--error-unmatch", str(rel_path)],
            capture_output=True,
            text=True,
            cwd=GIT_ROOT,
        )
        return result.returncode == 0
    except Exception:
        return False


def parse_frontmatter(content):
    if not content.startswith("---"):
        return None, content

    parts = content.split("---", 2)
    if len(parts) < 3:
        return None, content

    frontmatter = parts[1]
    body = parts[2]

    return frontmatter, body


def has_title(frontmatter):
    return bool(re.search(r"^title:\s*", frontmatter, re.MULTILINE))


def update_frontmatter(frontmatter, publish_date):
    lines = frontmatter.rstrip().split("\n")

    publish_date_line = f"publish_date: {publish_date}"
    found_publish_date = False

    for i, line in enumerate(lines):
        if re.match(r"^publish_date:\s*", line):
            lines[i] = publish_date_line
            found_publish_date = True
            break

    if not found_publish_date:
        lines.append(publish_date_line)

    return "\n".join(lines) + "\n"


def process_file(filepath):
    print(f"Processing: {filepath}")

    if not is_git_tracked(filepath):
        print(f"  Skipping - not tracked in git")
        return False

    git_date = get_git_date(filepath)
    if not git_date:
        print(f"  Skipping - no git history")
        return False

    content = filepath.read_text(encoding="utf-8")

    frontmatter, body = parse_frontmatter(content)

    if frontmatter is None:
        print(f"  Skipping - no frontmatter")
        return False

    if not has_title(frontmatter):
        print(f"  Skipping - no title in frontmatter")
        return False

    new_frontmatter = update_frontmatter(frontmatter, git_date)
    new_content = f"---{new_frontmatter}---{body}"

    filepath.write_text(new_content, encoding="utf-8")
    print(f"  Updated publish_date to {git_date}")
    return True


def main():
    md_files = list(CONTENT_DIR.glob("**/*.md"))
    print(f"Found {len(md_files)} .md files\n")

    updated = 0
    skipped = 0

    for filepath in sorted(md_files):
        if process_file(filepath):
            updated += 1
        else:
            skipped += 1

    print(f"\nDone: {updated} updated, {skipped} skipped")


if __name__ == "__main__":
    main()
