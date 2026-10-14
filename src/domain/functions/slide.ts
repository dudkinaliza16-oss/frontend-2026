import type {Slide, Background} from "../types/slide.ts";
import type {Presentation} from "../types/presentation.ts";

const DEFAULT_VALUE: number = 0;

function createDefaultSlide(id: string,
                            slideName: string): Slide {
    return {
        id: id,
        name: slideName,
        background: {type: 'none'},
        objects: [],
    };
}

function addSlide(presentation: Presentation,
                  id: string,
                  slideName?: string,
                  newIndex: number = -1): Presentation {
    const newSlide = createDefaultSlide(id, slideName || `Слайд ${presentation.slides.length + 1}`);
    if (newIndex <= 0 || newIndex > presentation.slides.length + 1) {
        return {
            ...presentation,
            slides: [...presentation.slides, newSlide],
        };
    }
    const targetIndex = newIndex - 1;

    return {
        ...presentation,
        slides: [
            ...presentation.slides.slice(0, targetIndex),
            newSlide,
            ...presentation.slides.slice(targetIndex),
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
    const slideIndex = presentation.slides.findIndex(slide => slide.id === slideId);
    if (slideIndex === -1) {
        return { ...presentation };
    }

    const currentSlide = presentation.slides[slideIndex];

    return addSlide(
        presentation,
        newId,
        currentSlide.name,
        slideIndex + 2
    );
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
