import type {Presentation} from "../types/presentation";

function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}
function createPresentation(id: string, name: string): Presentation {
    return {
        id,
        name,
        slides: [],
    };
}

function updatePresentationName(presentation: Presentation, name: string): Presentation{
    return {
        ...presentation,
        name,
    };
}

function savePresentation(presentation: Presentation): string {
    return JSON.stringify(presentation, null, 2);
}

function loadPresentation(json: string): Presentation {
    return JSON.parse(json) as Presentation;
}

export {
    createPresentation,
    updatePresentationName,
    savePresentation,
    loadPresentation,
};