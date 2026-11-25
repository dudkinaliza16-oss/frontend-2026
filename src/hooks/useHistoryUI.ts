import { useState, useEffect, useCallback } from 'react';
import {undo, redo, getCanUndo, getCanRedo, addEditorChangeHandler} from '../modules/editor.js';

type HistoryUI = {
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
}

function useHistoryUI(): HistoryUI {
    const [canUndo, setCanUndo] = useState(getCanUndo());
    const [canRedo, setCanRedo] = useState(getCanRedo());

    useEffect(() => {
        const sync = () => {
            setCanUndo(getCanUndo());
            setCanRedo(getCanRedo());
        };
        sync();
        return addEditorChangeHandler(sync);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.code === 'KeyZ') {
                event.preventDefault();
                undo();
            } else if ((event.ctrlKey || event.metaKey) && event.code === 'KeyY') {
                event.preventDefault();
                redo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const onUndo = useCallback(() => {
        undo();
    }, []);

    const onRedo = useCallback(() => {
        redo();
    }, []);
    return { canUndo, canRedo, onUndo, onRedo };
}

export {
    useHistoryUI,
}