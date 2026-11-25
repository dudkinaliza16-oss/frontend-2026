import type { Presentation } from '../domain/types/presentation.ts';

type Modifier<P = unknown> = (
    model: StateEdit,
    params: P
) => StateEdit;

type StateEdit = {
    presentation: Presentation | null;
    activeSlideId: string | null;
    isPreviewMode: boolean;
}

let stateEdit: StateEdit = {
    presentation: null,
    activeSlideId: null,
    isPreviewMode: false
};
let past: StateEdit[] = [];
let future: StateEdit[] = [];

function setPreviewMode(mode: boolean): void {
    stateEdit.isPreviewMode = mode;
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function getPreviewMode(): boolean {
    return stateEdit.isPreviewMode;
}

function setInitialState(presentation: Presentation): void {
    stateEdit.presentation = presentation;
    stateEdit.activeSlideId = presentation.slides[0]?.id ?? null;
    past = [];
    future = [];
}

function getHistoryState(): { canUndo: boolean; canRedo: boolean } {
    return {
        canUndo: past.length > 0,
        canRedo: future.length > 0,
    };
}

function setActiveSlideId(id: string | null) {
    stateEdit.activeSlideId = id;
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function getPresentationState(): Presentation | null {
    return stateEdit.presentation;
}

function getActiveSlideId(): string | null {
    return stateEdit.activeSlideId;
}

let editorChangeHandler: (() => void) | null = null;

function addEditorChangeHandler(handler: () => void): void {
    const prevHandler = editorChangeHandler;
    editorChangeHandler = () => {
        prevHandler?.();
        handler();
    };
}

function dispatch<P>(
    modifier: Modifier<P>,
    params: P
): void {
    if (!stateEdit.presentation) {
        console.error('State is not initialized! Call setInitialState first.');
        return;
    }
    past = [...past, stateEdit];
    future = [];
    stateEdit = modifier(
        stateEdit,
        params
    );
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function undo(): void {
    if (past.length === 0 || !stateEdit.presentation) return;
    future = [stateEdit, ...future];
    const previous = past[past.length - 1];
    past = past.slice(0, -1);
    stateEdit = previous;
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function redo(): void {
    if (future.length === 0 || !stateEdit.presentation) return;
    past = [...past, stateEdit];
    const next = future[0];
    future = future.slice(1);
    stateEdit = next;
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function getCanUndo(): boolean { return past.length > 0; }

function getCanRedo(): boolean { return future.length > 0; }

export {
    setPreviewMode,
    getPreviewMode,
    setInitialState,
    getHistoryState,
    getPresentationState,
    getActiveSlideId,
    addEditorChangeHandler,
    setActiveSlideId,
    dispatch,
    undo,
    redo,
    getCanUndo,
    getCanRedo,
    type StateEdit,
};