"use client";

import { Check, Copy, Download, X } from "lucide-react";
import { useCallback, useState } from "react";

type ExportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  jsonContent: string;
  filename: string;
};

export function ExportModal({
  isOpen,
  onClose,
  jsonContent,
  filename,
}: ExportModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(jsonContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = jsonContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [jsonContent]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, [jsonContent, filename]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-4 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-slate-200 border-b px-6 py-4">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">
              Export Form Schema
            </h2>
            <p className="text-slate-500 text-sm">
              Copy or download your form schema as JSON
            </p>
          </div>
          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="relative h-full">
            <pre className="h-full max-h-[50vh] overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-slate-800 text-sm">
              {jsonContent}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-slate-200 border-t px-6 py-4">
          <p className="text-slate-500 text-sm">
            Filename: <code className="text-slate-700">{filename}</code>
          </p>
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 text-sm transition-colors hover:bg-slate-50"
              onClick={handleCopy}
              type="button"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy to Clipboard
                </>
              )}
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-teal-700"
              onClick={handleDownload}
              type="button"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
