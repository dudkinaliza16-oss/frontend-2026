import {
    addSlideObject,
    moveSlideObject,
    removeSlideObject,
    updateTextObjectContent,
    updateTextObjectStyle,
    resizeSlideObject
} from "../domain/functions/object.ts";
import type {StateEdit} from "./editor.ts";
import {generateId} from "../domain/functions/utils.ts";
import {addSlide, duplicateSlide} from "../domain/functions/slide.ts";
import type {Font, Point, Size, SlideObject} from "../domain/types/object.ts";
import type {Slide} from "../domain/types/slide.ts";

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

function addSlideModifier(stateEdit: StateEdit, params?: {newIndex?: number}): StateEdit {
    if (!stateEdit.presentation) {
        return stateEdit;
    }
    const newSlideId = generateId();
    const updatedPresentation = addSlide(stateEdit.presentation, newSlideId, params?.newIndex);
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

function updateTextObjectContentModifier(
    stateEdit: StateEdit,
    params: { objectId: string, newContent: string }): StateEdit {
    const {objectId, newContent} = params;
    if (!stateEdit.presentation || !stateEdit.activeSlideId) {
        return stateEdit;
    }
    const slideIndex = stateEdit.presentation.slides.findIndex(slide => slide.id === stateEdit.activeSlideId);
    if (slideIndex === -1) {
        return stateEdit;
    }
    let slide = stateEdit.presentation.slides[slideIndex];
    slide = updateTextObjectContent(slide, objectId, newContent);
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

function updateTextObjectStyleModifier(
    stateEdit: StateEdit,
    params: { objectId: string, newFont: Font }) {
    const {objectId, newFont} = params;
    if (!stateEdit.presentation || !stateEdit.activeSlideId) {
        return stateEdit;
    }
    const slideIndex = stateEdit.presentation.slides.findIndex(slide => slide.id === stateEdit.activeSlideId);
    if (slideIndex === -1) {
        return stateEdit;
    }
    let slide = stateEdit.presentation.slides[slideIndex];
    slide = updateTextObjectStyle(slide, objectId, newFont);
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

function setSlideBackgroundColorModifier(
    stateEdit: StateEdit,
    params: { slideId: string; color: string }
): StateEdit {
    const {slideId, color} = params;
    if (!stateEdit.presentation) {
        return stateEdit;
    }
    const slideIndex = stateEdit.presentation.slides.findIndex(slide => slide.id === slideId);
    if (slideIndex === -1) {
        return stateEdit;
    }
    const slide = stateEdit.presentation.slides[slideIndex];
    const updatedSlide: Slide = {
        ...slide,
        background: {
            type: 'color',
            color: color,
            opacity: 1
        }
    };
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

function setSlideBackgroundImageModifier(
    stateEdit: StateEdit,
    params: { slideId: string; src: string }
): StateEdit {
    const {slideId, src} = params;
    if (!stateEdit.presentation) {
        return stateEdit;
    }
    const slideIndex = stateEdit.presentation.slides.findIndex(slide => slide.id === slideId);
    if (slideIndex === -1) {
        return stateEdit;
    }
    const slide = stateEdit.presentation.slides[slideIndex];
    const updatedSlide: Slide = {
        ...slide,
        background: {
            type: 'image',
            imageUrl: src
        }
    };
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

function clearSlideBackgroundModifier(
    stateEdit: StateEdit,
    params: { slideId: string }
): StateEdit {
    const {slideId} = params;
    if (!stateEdit.presentation) {
        return stateEdit;
    }
    const slideIndex = stateEdit.presentation.slides.findIndex(slide => slide.id === slideId);
    if (slideIndex === -1) {
        return stateEdit;
    }
    const slide = stateEdit.presentation.slides[slideIndex];
    const updatedSlide: Slide = {
        ...slide,
        background: {
            type: 'none'
        }
    };
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

function addImageObjectModifier(
    stateEdit: StateEdit,
    params: { slideId: string; src: string }
): StateEdit {
    const {slideId, src} = params;
    if (!stateEdit.presentation) {
        return stateEdit;
    }
    const slideIndex = stateEdit.presentation.slides.findIndex(slide => slide.id === slideId);
    if (slideIndex === -1) {
        return stateEdit;
    }
    const slide = stateEdit.presentation.slides[slideIndex];
    const newImageObject: SlideObject = {
        type: "image",
        id: generateId(),
        location: {
            x: 200,
            y: 150
        },
        size: {
            width: 300,
            height: 200
        },
        opacity: 1,
        imageUrl: src,
        rotation: 0,
    };
    const updatedSlide = addSlideObject(slide, newImageObject);
    const newSlides = [...stateEdit.presentation.slides];
    newSlides[slideIndex] = updatedSlide;
    return {
        ...stateEdit,
        presentation: {
            ...stateEdit.presentation,
            slides: newSlides,
        },
    };
}

function resizeSlideObjectModifier(stateEdit: StateEdit, params: { objectId: string; newSize: Size; newLocation: Point}): StateEdit {
    const {objectId, newSize, newLocation} = params;
    if (!stateEdit.presentation || !stateEdit.activeSlideId) {
        return stateEdit;
    }
    const slideIndex = stateEdit.presentation.slides.findIndex(slide => slide.id === stateEdit.activeSlideId);
    if (slideIndex === -1) {
        return stateEdit;
    }
    let slide = stateEdit.presentation.slides[slideIndex];
    slide = resizeSlideObject(slide, objectId, newSize);
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

function duplicateSlideModifier(
    stateEdit: StateEdit,
    slideId: string
): StateEdit {
    if (!stateEdit.presentation) {
        return stateEdit;
    }

    const newSlideId = generateId();
    const updatedPresentation = duplicateSlide(
        stateEdit.presentation,
        slideId,
        newSlideId
    );
    return {
        ...stateEdit,
        presentation: updatedPresentation,
        activeSlideId: newSlideId,
    };
}

//function addTextObjectModifier() {
//
//}

export {
    removeSelectedObjectsModifier,
    removeSlidesModifier,
    updatePresentationNameModifier,
    addSlideModifier,
    addSlideObjectModifier,
    moveSlideObjectModifier,
    updateTextObjectContentModifier,
    updateTextObjectStyleModifier,
    setSlideBackgroundColorModifier,
    setSlideBackgroundImageModifier,
    clearSlideBackgroundModifier,
    addImageObjectModifier,
    resizeSlideObjectModifier,
    duplicateSlideModifier,
    //addTextObjectModifier,
};