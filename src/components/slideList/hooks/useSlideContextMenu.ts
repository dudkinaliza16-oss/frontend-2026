import { useState, useEffect, useCallback } from "react";

export type ContextMenuState = {
    slideId: string;
    index: number;
} | null;

function useSlideContextMenu() {
    const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);

    const openContextMenu = useCallback((slideId: string, index: number) => {
        setContextMenu({ slideId, index });
    }, []);

    const closeContextMenu = useCallback(() => {
        setContextMenu(null);
    }, []);

    useEffect(() => {
        if (!contextMenu) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setContextMenu(null);
            }
        };

        const handleClickOutside = () => {
            setContextMenu(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("click", handleClickOutside);
        };
    }, [contextMenu]);

    return {
        contextMenu,
        openContextMenu,
        closeContextMenu,
    };
}

export {
    useSlideContextMenu,
}