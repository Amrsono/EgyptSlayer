import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
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

  // Ensure fonts (especially Arabic Cairo / Amiri / Segoe UI) are fully loaded before canvas render
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

  // Initialize PDF in PORTRAIT A4 mode
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
    onProgress?.(progressPercent, `Rendering High-Res Arabic Page ${i + 1} of ${pageElements.length}...`);

    // Ensure all images inside pageEl are fully loaded and decoded
    const images = Array.from(pageEl.querySelectorAll('img'));
    await Promise.all(
      images.map(async (img) => {
        if (img.complete && img.naturalWidth !== 0) {
          try {
            await img.decode();
          } catch (e) {
            // fallback
          }
          return;
        }
        return new Promise((resolve) => {
          img.onload = () => resolve(null);
          img.onerror = () => resolve(null);
        });
      })
    );

    let imgData: string;
    try {
      // Primary renderer: html-to-image (uses native browser rendering for 100% connected Arabic letters & ligatures)
      imgData = await toPng(pageEl, {
        quality: 0.98,
        pixelRatio: 2.5,
        backgroundColor: '#ffffff',
        filter: (element: HTMLElement) => !element.classList?.contains('no-export'),
        cacheBust: true,
        style: {
          transform: 'none',
          margin: '0',
        }
      });
    } catch (renderErr) {
      console.warn(`Page ${i + 1} html-to-image warning, attempting html2canvas fallback:`, renderErr);
      const canvas = await html2canvas(pageEl, {
        scale: 2.5,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
      });
      imgData = canvas.toDataURL('image/png', 0.95);
    }

    if (i > 0) {
      pdf.addPage([pdfWidth, pdfHeight], 'portrait');
    }

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  }

  onProgress?.(100, 'Saving PDF file...');
  pdf.save(fileName);
}
