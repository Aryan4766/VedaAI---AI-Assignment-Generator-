/** Print-only CSS injected into the PDF iframe — kept out of the global Next.css bundle */
export const PRINT_PAPER_CSS = `
@page {
  size: A4 portrait;
  margin: 18mm 16mm 20mm 16mm;
}

@media print {
  html,
  body.print-paper-body {
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
    color: #1a1a1a !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .print-paper-body {
    font-family: Georgia, "Times New Roman", Times, serif;
  }

  .question-paper-print-root {
    box-shadow: none !important;
    border-radius: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
    background: #fff !important;
  }

  .exam-paper-header,
  .exam-student-info,
  .exam-section-block,
  .exam-section-heading,
  .exam-question-block,
  .exam-answer-key-section,
  .exam-answer-item,
  .exam-end-marker {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .exam-section-heading,
  .exam-paper-header h1 {
    break-after: avoid;
    page-break-after: avoid;
  }

  .exam-question-row {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) auto !important;
    align-items: start !important;
    column-gap: 1.25rem !important;
  }

  .exam-marks {
    text-align: right !important;
    white-space: nowrap !important;
    padding-left: 0 !important;
    align-self: start !important;
  }

  .exam-difficulty-badge {
    background: #fff !important;
    border: 1px solid #9ca3af !important;
    color: #374151 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .exam-section-block + .exam-section-block {
    margin-top: 1.75rem;
  }

  .exam-answer-key-section {
    border-top: 1px solid #d1d5db !important;
    padding-top: 1.5rem !important;
    margin-top: 2rem !important;
  }
}
`;
