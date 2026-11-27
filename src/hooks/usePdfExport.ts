import { useCallback, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function usePdfExport(presentationName: string) {
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        if (!isExporting) {
            return;
        }
    }, [isExporting]);

    const exportToPdf = useCallback(async () => {
        setIsExporting(true);
        try {
            await document.fonts?.ready;

            const pdf = new jsPDF('l', 'mm', 'a4');
            const slideElements = Array.from(document.querySelectorAll('.slide-canvas')) as HTMLElement[];

            for (let i = 0; i < slideElements.length; i++) {
                const canvas = await html2canvas(slideElements[i], {
                    scale: 6,
                    useCORS: true,
                    logging: false,
                });
                const imgData = canvas.toDataURL('image/png');
                if (i > 0) {
                    pdf.addPage();
                }
                pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
            }
            const fileName = presentationName.trim() || 'presentation';
            pdf.save(`${fileName}.pdf`);
        } finally {
            setIsExporting(false);
        }
    }, [presentationName]);

    return { exportToPdf, isExporting };
}

export { usePdfExport };