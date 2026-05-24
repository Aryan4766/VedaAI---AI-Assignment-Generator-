/**
 * Vector-quality PDF export via native browser print (Save as PDF).
 * Replaces html2canvas screenshot slicing — crisp text and stable page breaks.
 */

import { PRINT_PAPER_CSS } from "./print-paper-styles";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function waitForStylesheets(doc: Document): Promise<void> {
  const links = Array.from(
    doc.querySelectorAll('link[rel="stylesheet"]'),
  ) as HTMLLinkElement[];

  if (links.length === 0) return Promise.resolve();

  return Promise.all(
    links.map(
      (link) =>
        new Promise<void>((resolve) => {
          if (link.sheet) {
            resolve();
            return;
          }
          link.addEventListener("load", () => resolve(), { once: true });
          link.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  ).then(() => undefined);
}

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("PDF export is only available in the browser");
  }

  const iframe = document.createElement("iframe");
  iframe.setAttribute(
    "style",
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;",
  );
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  const win = iframe.contentWindow;
  const doc = iframe.contentDocument;

  if (!win || !doc) {
    iframe.remove();
    throw new Error("Could not create print frame");
  }

  const title = escapeHtml(filename.replace(/\.pdf$/i, ""));
  const clone = element.cloneNode(true) as HTMLElement;
  clone.classList.add("question-paper-print-root");

  doc.open();
  doc.write(
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>${title}</title></head><body class="print-paper-body"></body></html>`,
  );
  doc.close();

  document.querySelectorAll('link[rel="stylesheet"]').forEach((node) => {
    const link = node as HTMLLinkElement;
    const copy = doc.createElement("link");
    copy.rel = "stylesheet";
    copy.href = link.href;
    doc.head.appendChild(copy);
  });

  document.querySelectorAll("style").forEach((node) => {
    const style = doc.createElement("style");
    style.textContent = node.textContent;
    doc.head.appendChild(style);
  });

  const printStyle = doc.createElement("style");
  printStyle.textContent = PRINT_PAPER_CSS;
  doc.head.appendChild(printStyle);

  doc.body.appendChild(clone);

  await waitForStylesheets(doc);
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      setTimeout(resolve, 350);
    });
  });

  await new Promise<void>((resolve) => {
    const cleanup = () => {
      win.removeEventListener("afterprint", onAfterPrint);
      iframe.remove();
      resolve();
    };

    const onAfterPrint = () => cleanup();

    win.addEventListener("afterprint", onAfterPrint, { once: true });
    win.focus();
    win.print();

    setTimeout(cleanup, 120_000);
  });
}
