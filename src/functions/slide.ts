import type {Slide} from "../types/slide";
import type {Presentation} from "../types/presentation";

function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}

function createDefaultSlide(id: string, slideName: string): Slide {
    return {
        id: id,
        name: slideName,
        background: {type: 'none'},
        objects: [],
    };
}

function addSlide(presentation: Presentation, id: string, slideName?: string): Presentation {
    const newSlide = createDefaultSlide(id, slideName || `Слайд ${presentation.slides.length + 1}`);
    return {
        ...presentation,
        slides: [...presentation.slides, newSlide],
    };
}

function moveSlide(presentation: Presentation, slideId: string, newIndex: number): Presentation {
    const currentSlide = presentation.slides.find(slide => slide.id === slideId);
    if (!currentSlide) {
        return {...presentation};
    }
    const newSlides = [...presentation.slides].filter(slide => slide.id !== slideId);
    return {
        ...presentation, slides: [...newSlides.filter((_, index) => index < newIndex),
            currentSlide, ...newSlides.filter((_, index) => index >= newIndex)]
    }
}

function duplicateSlide(presentation: Presentation, slideId: string, newId: string): Presentation {
    const slideIndex = presentation.slides.findIndex(slide => slide.id === slideId);
    const currentSlide = presentation.slides[slideIndex];
    if (!currentSlide) {
        return {...presentation};
    }
    const duplicatedSlide = {
        ...currentSlide,
        id: newId,
        objects: currentSlide.objects.map(obj => ({...obj})),
    };

    const rawSlides = [
        ...presentation.slides.filter((_, index) => index <= slideIndex),
        duplicatedSlide,
        ...presentation.slides.filter((_, index) => index > slideIndex)
    ];

    const slides = rawSlides.map((slide, index) => ({
        ...slide,
        name: `Слайд ${index + 1}`
    }));

    return {
        ...presentation,
        slides
    };
}

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    return {
        ...slide,
        background: {
            type: 'color',
            color: color,
            opacity: 1,
        }
    }
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    return {
        ...slide,
        background: {
            type: 'image',
            imageUrl: imageUrl,
        }
    }
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle: number = 0): Slide {
    return {
        ...slide,
        background: {
            type: 'gradient',
            colors: colors,
            angle: angle,
        }
    }
}

function clearSlideBackground(slide: Slide): Slide {
    return {
        ...slide,
        background: {
            type: 'none',
        }
    }
}

export {
    createDefaultSlide,
    addSlide,
    moveSlide,
    duplicateSlide,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    setSlideBackgroundColor,
    clearSlideBackground
}
