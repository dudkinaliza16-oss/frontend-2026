import { useRef, useCallback } from "react";

function useImageLoader(onImageLoaded: (src: string) => void) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target && event.target.result;
            if (typeof result === 'string') {
                onImageLoaded(result);
            }
        };
        reader.readAsDataURL(file);
    }, [onImageLoaded]);

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }
    return { fileInputRef, handleFileChange, openFilePicker };
}

export { useImageLoader };