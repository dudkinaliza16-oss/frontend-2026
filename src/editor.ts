import type { Presentation } from './domain/types/presentation.js';

type Modifier<P = any> = (model: Presentation, params: P) => Presentation;

type StateEdit = {
    presentation: Presentation | null;
    activeSlideId: string | null;
}

let stateEdit: StateEdit = {
    presentation: null,
    activeSlideId: null,
};

let editorChangeHandler: (() => void) | null = null;


function setInitialState(presentation: Presentation): void {
    stateEdit.presentation = presentation;
}

function setActiveSlideId(id: string | null) {
    stateEdit.activeSlideId = id;
}
function getPresentationState(): Presentation | null {
    return stateEdit.presentation;
}

function getActiveSlideState(): string | null {
    return stateEdit.activeSlideId;
}

function addEditorChangeHandler(handler: () => void): void {
    editorChangeHandler = handler;
}

function dispatch(modifier: Modifier, params: any = null): void {
    if (!stateEdit.presentation) {
        console.error('State is not initialized! Call setInitialState first.');
        return;
    }
    stateEdit.presentation = modifier(stateEdit.presentation, params);
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

export { setInitialState, getPresentationState, getActiveSlideState, addEditorChangeHandler, setActiveSlideId, dispatch };