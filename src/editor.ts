import type { Presentation } from './domain/types/presentation.js';

type Modifier<P = any> = (model: Presentation, params: P) => Presentation;

let currentPresentation: Presentation | null = null;
let editorChangeHandler: (() => void) | null = null;

//let currentSlide: string;

function setInitialState(presentation: Presentation): void {
    currentPresentation = presentation;
}

function getState(): Presentation | null {
    return currentPresentation;
}

function addEditorChangeHandler(handler: () => void): void {
    editorChangeHandler = handler;
}

function dispatch(modifier: Modifier, params: any = null): void {
    if (!currentPresentation) {
        console.error('State is not initialized! Call setInitialState first.');
        return;
    }
    currentPresentation = modifier(currentPresentation, params);
    editorChangeHandler?.();
}

export { setInitialState, getState, addEditorChangeHandler, dispatch };