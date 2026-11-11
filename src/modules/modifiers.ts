import {addSlideObject, moveSlideObject, removeSlideObject} from "../domain/functions/object.ts";
import type {StateEdit} from "./editor.ts";
import {generateId} from "../domain/functions/utils.ts";
import {addSlide} from "../domain/functions/slide.ts";
import type {Point, SlideObject} from "../domain/types/object.ts";

function removeSelectedObjectsModifier(
    stateEdit: StateEdit,
    selectObjectIds: string[]
): StateEdit {
    if (!stateEdit.presentation || !stateEdit.activeSlideId) {
        return stateEdit;
    }
    const slideIndex = stateEdit.presentation.slides.findIndex(slide => slide.id === stateEdit.activeSlideId);
    if (slideIndex === -1) {
        return stateEdit;
    }
    let updatedSlide = stateEdit.presentation.slides[slideIndex];
    selectObjectIds.forEach(id => {
        updatedSlide = removeSlideObject(updatedSlide, id);
    });
    const newSlides = [...stateEdit.presentation.slides];
    newSlides[slideIndex] = updatedSlide;

    return {
        ...stateEdit,
        presentation: {
            ...stateEdit.presentation,
            slides: newSlides
        }
    };
}

function removeSlidesModifier(
    stateEdit: StateEdit,
    slideIds: string[]
): StateEdit {
    if (!stateEdit.presentation || slideIds.length === 0) {
        return stateEdit;
    }
    const slides = stateEdit.presentation.slides;
    const newSlides = slides.filter(slide => !slideIds.includes(slide.id));
    let newActiveId = stateEdit.activeSlideId;
    if (newActiveId && slideIds.includes(newActiveId)) {
        newActiveId = newSlides.length > 0
            ? newSlides[0].id
            : null;
    }
    return {
        ...stateEdit,
        presentation: {
            ...stateEdit.presentation,
            slides: newSlides
        },
        activeSlideId: newActiveId
    };
}

function updatePresentationNameModifier(stateEdit: StateEdit, newName: string) {
    if (!stateEdit.presentation) {
        return stateEdit;
    }
    return {
        ...stateEdit,
        presentation: {
            ...stateEdit.presentation,
            name: newName
        }
    }
}

function addSlideModifier(stateEdit: StateEdit): StateEdit {
    if (!stateEdit.presentation) {
        return stateEdit;
    }
    const newSlideId = generateId();
    const updatedPresentation = addSlide(stateEdit.presentation, newSlideId);
    return {
        ...stateEdit,
        presentation: updatedPresentation,
        activeSlideId: newSlideId
    };
}

function addSlideObjectModifier(stateEdit: StateEdit, object: SlideObject): StateEdit {
    if (!stateEdit.presentation || !stateEdit.activeSlideId) {
        return stateEdit;
    }
    const slides = stateEdit.presentation.slides;
    const slideIndex = slides.findIndex(slide => slide.id === stateEdit.activeSlideId);
    if (slideIndex === -1) {
        return stateEdit;
    }
    const updatedSlide = addSlideObject(slides[slideIndex], object);
    const newSlides = [...slides];
    newSlides[slideIndex] = updatedSlide;

    return {
        ...stateEdit,
        presentation: {
            ...stateEdit.presentation,
            slides: newSlides
        }
    };
}


function moveSlideObjectModifier(
    stateEdit: StateEdit,
    params: { objectId: string; newLocation: Point }
) {
    const {objectId, newLocation} = params;
    if (!stateEdit.presentation || !stateEdit.activeSlideId) {
        return stateEdit;
    }
    const slideIndex = stateEdit.presentation.slides.findIndex(slide => slide.id === stateEdit.activeSlideId);
    if (slideIndex === -1) {
        return stateEdit;
    }
    let slide = stateEdit.presentation.slides[slideIndex];
    slide = moveSlideObject(slide, objectId, newLocation);
    const newSlides = [...stateEdit.presentation.slides];
    newSlides[slideIndex] = slide;
    return {
        ...stateEdit,
        presentation: {
            ...stateEdit.presentation,
            slides: newSlides
        }
    };
}

export {
    removeSelectedObjectsModifier,
    removeSlidesModifier,
    updatePresentationNameModifier,
    addSlideModifier,
    addSlideObjectModifier,
    moveSlideObjectModifier,
}