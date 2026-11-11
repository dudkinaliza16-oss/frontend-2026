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

let editorChangeHandler: (() => void) | null = null;

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

function addEditorChangeHandler(handler: () => void): void {
    editorChangeHandler = handler;
}

function dispatch<P>(
    modifier: Modifier<P>,
    params: P
):void {
    if (!stateEdit.presentation) {
        console.error('State is not initialized! Call setInitialState first.');
        return;
    }
    stateEdit = modifier(
        stateEdit,
        params
    );
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

export {
    setPreviewMode,
    getPreviewMode,
    setInitialState,
    getPresentationState,
    getActiveSlideId,
    addEditorChangeHandler,
    setActiveSlideId,
    dispatch,
    type StateEdit,
};