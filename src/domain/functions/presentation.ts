import type {Presentation} from "../types/presentation.ts";
import type {Slide} from "../types/slide.ts";

function createPresentation(id: string,
                            name: string,
                            slideId: string): Presentation {
    const defaultSlide: Slide = {
        id: slideId,
        name: "Слайд 1",
        background: {type: "none"},
        objects: [],
    };
    return {
        id,
        name,
        slides: [defaultSlide],
    };
}

function updatePresentationName(presentation: Presentation, name: string): Presentation {
    return {
        ...presentation,
        name,
    };
}

function savePresentation(presentation: Presentation): string {
    return JSON.stringify(presentation, null, 2);
}


function loadPresentation(json: string): Presentation {
    return JSON.parse(json);
}

export {
    createPresentation,
    updatePresentationName,
    savePresentation,
    loadPresentation,
};