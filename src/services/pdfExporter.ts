import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportMagazineToPDF(
  containerId: string,
  fileName: string = 'EgyptSlayer_Metal_Magazine.pdf',
  onProgress?: (progress: number, status: string) => void
): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Magazine render container (#${containerId}) was not found in the DOM.`);
  }

  onProgress?.(10, 'Preparing magazine layout & loading web fonts...');

  // Ensure fonts (especially Arabic Cairo / Amiri) are fully loaded before html2canvas render
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch (e) {
      console.warn('Font loading check passed with fallback readiness.');
    }
  }

  // Find all page elements inside the container
  let pageElements = Array.from(container.querySelectorAll<HTMLElement>('.magazine-page-render'));
  
  if (pageElements.length === 0) {
    pageElements = [container];
  }

  // Item 1: Initialize PDF in PORTRAIT A4 mode
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pageElements.length; i++) {
    const pageEl = pageElements[i];
    const progressPercent = Math.round(15 + ((i + 1) / pageElements.length) * 80);
    onProgress?.(progressPercent, `Rendering PDF Portrait Page ${i + 1} of ${pageElements.length}...`);

    try {
      // Item 2: Render canvas with pure white background (#ffffff)
      const canvas = await html2canvas(pageEl, {
        scale: 2.5, // High resolution crisp text output
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        ignoreElements: (element) => element.classList.contains('no-export'),
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        pdf.addPage([pdfWidth, pdfHeight], 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    } catch (renderErr) {
      console.warn(`Page ${i + 1} rendering warning, attempting fallback render:`, renderErr);
      const fallbackCanvas = await html2canvas(pageEl, {
        scale: 1.8,
        useCORS: false,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });
      const imgData = fallbackCanvas.toDataURL('image/jpeg', 0.88);
      if (i > 0) pdf.addPage([pdfWidth, pdfHeight], 'portrait');
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }
  }

  onProgress?.(100, 'Saving PDF file...');
  pdf.save(fileName);
}
