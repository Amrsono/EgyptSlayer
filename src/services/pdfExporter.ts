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

  onProgress?.(10, 'Preparing magazine layout for high-res PDF rendering...');

  // Find all page elements inside the container
  let pageElements = Array.from(container.querySelectorAll<HTMLElement>('.magazine-page-render'));
  
  if (pageElements.length === 0) {
    pageElements = [container];
  }

  // Initialize PDF in landscape A4 mode (Double page spread)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pageElements.length; i++) {
    const pageEl = pageElements[i];
    const progressPercent = Math.round(15 + ((i + 1) / pageElements.length) * 80);
    onProgress?.(progressPercent, `Rendering Page Spread ${i + 1} of ${pageElements.length}...`);

    try {
      const canvas = await html2canvas(pageEl, {
        scale: 2, // High resolution output
        useCORS: true,
        allowTaint: false, // Prevents security error on tainted canvas
        backgroundColor: '#0a0a0c',
        logging: false,
        imageTimeout: 10000,
        ignoreElements: (element) => element.classList.contains('no-export'),
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.92);

      if (i > 0) {
        pdf.addPage([pdfWidth, pdfHeight], 'landscape');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    } catch (renderErr) {
      console.warn(`Page ${i + 1} rendering warning, attempting fallback render:`, renderErr);
      // Fallback: render without CORS strictness if an image fails
      const fallbackCanvas = await html2canvas(pageEl, {
        scale: 1.5,
        useCORS: false,
        allowTaint: true,
        backgroundColor: '#0a0a0c',
      });
      const imgData = fallbackCanvas.toDataURL('image/jpeg', 0.85);
      if (i > 0) pdf.addPage([pdfWidth, pdfHeight], 'landscape');
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }
  }

  onProgress?.(100, 'Saving PDF file...');
  pdf.save(fileName);
}
