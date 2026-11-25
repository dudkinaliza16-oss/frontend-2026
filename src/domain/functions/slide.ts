import type {Slide, Background} from "../types/slide.ts";
import type {Presentation} from "../types/presentation.ts";
import {generateId} from "./utils.ts";

const DEFAULT_VALUE: number = 0;

function createDefaultSlide(id: string): Slide {
    return {
        id: id,
        background: {type: 'none'},
        objects: [],
    };
}

function addSlide(presentation: Presentation,
                  id: string,
                  newIndex: number = -1): Presentation {
    const newSlide = createDefaultSlide(id);
    const slides = presentation.slides;

    if (newIndex < 0 || newIndex >= slides.length) {
        return {
            ...presentation,
            slides: [...slides, newSlide],
        };
    }
    return {
        ...presentation,
        slides: [
            ...slides.slice(0, newIndex),
            newSlide,
            ...slides.slice(newIndex),
        ],
    };
}

function removeSlides(presentation: Presentation,
                      slideIds: string[]): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.filter(slide => !slideIds.includes(slide.id)),
    }
}

function moveSlide(presentation: Presentation,
                   slideId: string,
                   newIndex: number): Presentation {
    const currentSlide = presentation.slides.find(slide => slide.id === slideId);
    if (!currentSlide) {
        return { ...presentation };
    }

    const filteredSlides = presentation.slides.filter(slide => slide.id !== slideId);
    const targetIndex = newIndex - 1;

    return {
        ...presentation,
        slides: [
            ...filteredSlides.slice(0, targetIndex),
            currentSlide,
            ...filteredSlides.slice(targetIndex)
        ]
    };
}

function duplicateSlide(
    presentation: Presentation,
    slideId: string,
    newId: string
): Presentation {
    const slideIndex = presentation.slides.findIndex((slide) => slide.id === slideId);
    if (slideIndex === -1) {
        return presentation;
    }

    const sourceSlide = presentation.slides[slideIndex];
    const clonedSlide: Slide = {
        ...structuredClone(sourceSlide),
        id: newId,
        objects: sourceSlide.objects.map((obj) => ({
            ...structuredClone(obj),
            id: generateId(),
        })),
    };

    const insertIndex = slideIndex + 1;

    return {
        ...presentation,
        slides: [
            ...presentation.slides.slice(0, insertIndex),
            clonedSlide,
            ...presentation.slides.slice(insertIndex),
        ],
    };
}

function modifyBackground(slide: Slide,
                          payload: Background): Slide {
    if (!slide.background) {
        return slide;
    }
    return {
        ...slide,
        background: {
            ...payload,
        }
    };
}
function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    return modifyBackground(slide,
        {
            type: 'color',
            color,
            opacity: 1
        });
}
function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    return modifyBackground(slide,
        {
            type: 'image',
            imageUrl,
        });

}
function setSlideBackgroundGradient(slide: Slide, colors: string[], angle: number = DEFAULT_VALUE): Slide {
    return modifyBackground(slide,
        {
            type: 'gradient',
            colors,
            angle,
        });
}

function clearSlideBackground(slide: Slide): Slide {
    return modifyBackground(slide,
        {
            type: 'none',
        });
}

export {
    createDefaultSlide,
    addSlide,
    moveSlide,
    removeSlides,
    duplicateSlide,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    setSlideBackgroundColor,
    clearSlideBackground
}
