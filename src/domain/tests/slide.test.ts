import {describe, it, expect} from 'vitest';
import {
    createDefaultSlide,
    addSlide,
    moveSlide,
    removeSlides,
    duplicateSlide,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    setSlideBackgroundColor,
    clearSlideBackground
} from "../functions/slide.ts";
import type {Presentation} from "../types/presentation.ts";
import type {Slide} from "../types/slide.ts";
import {createTestPresentation} from "../functions/utils.ts";
describe("createDefaultSlide", () => {
    it("should create a slide with name", () => {
        const slide = createDefaultSlide("slide-1", "Новый слайд");
        expect(slide).toEqual({id: "slide-1", name: "Новый слайд", background: {type: "none"}, objects: []});
    });
});
describe("addSlide", () => {
    it("should add a default slide to the specified position", () => {
        const presentation: Presentation = createTestPresentation();
        const presentationCopy = structuredClone(presentation);
        const updatedPresentation = addSlide(presentation, "new-slide-id", "My slide", 1);
        const newSlide: Slide = {
            id: "new-slide-id",
            name: "My slide",
            background: {type: "none"},
            objects: []
        };
        const expectedPresentation: Presentation = {
            ...presentation,
            slides: [newSlide, ...presentation.slides]
        };
        expect(updatedPresentation).toEqual(expectedPresentation);
        expect(presentation).toEqual(presentationCopy);
    });
    it("should use default name if slideName is not provided", () => {
        const presentation: Presentation = createTestPresentation();
        const presentationCopy = structuredClone(presentation);
        const updatedPresentation = addSlide(presentation, "new-slide-id");
        const defaultSlide: Slide = {
            id: "new-slide-id",
            name: `Слайд ${presentation.slides.length + 1}`,
            background: {type: "none"},
            objects: []
        };
        const expectedPresentation: Presentation = {
            ...presentation,
            slides: [...presentation.slides, defaultSlide]
        };
        expect(updatedPresentation).toEqual(expectedPresentation);
        expect(presentation).toEqual(presentationCopy);
    });
});
describe("removeSlides", () => {
    it("should remove specified slides from presentation", () => {
        const presentation: Presentation = createTestPresentation();
        const presentationCopy = structuredClone(presentation);
        const slideToRemoveId = presentation.slides[0].id;
        const updatedPresentation = removeSlides(presentation, [slideToRemoveId]);
        const expectedPresentation: Presentation = {
            ...presentation,
            slides: presentation.slides.filter(s => s.id !== slideToRemoveId)
        };
        expect(updatedPresentation).toEqual(expectedPresentation);
        expect(presentation).toEqual(presentationCopy);
    });
    it("should remove multiple slides at once", () => {
        const presentation: Presentation = createTestPresentation();
        const presentationCopy = structuredClone(presentation);
        const idsToRemove = [presentation.slides[0].id, presentation.slides[1].id];
        const updatedPresentation = removeSlides(presentation, idsToRemove);
        const expectedPresentation: Presentation = {
            ...presentation,
            slides: presentation.slides.filter(s => !idsToRemove.includes(s.id))
        };
        expect(updatedPresentation).toEqual(expectedPresentation);
        expect(presentation).toEqual(presentationCopy);
    });

    it("should handle non-existent slide IDs without breaking presentation", () => {
        const presentation: Presentation = createTestPresentation();
        const presentationCopy = structuredClone(presentation);
        const updatedPresentation = removeSlides(presentation, ["non-existent-id"]);
        const expectedPresentation: Presentation = {
            ...presentation
        };
        expect(updatedPresentation).toEqual(expectedPresentation);
        expect(presentation).toEqual(presentationCopy);
    });
});
describe("moveSlide", () => {
    it("should move a slide to target index", () => {
        const presentation: Presentation = createTestPresentation();
        const presentationCopy = structuredClone(presentation);
        const slideToMove = presentation.slides[0];
        const targetIndex = 2;
        const updatedPresentation = moveSlide(presentation, slideToMove.id, targetIndex);
        const filteredSlides = presentation.slides.filter(s => s.id !== slideToMove.id);
        const insertAt = targetIndex - 1;
        const expectedSlides = [
            ...filteredSlides.slice(0, insertAt),
            slideToMove,
            ...filteredSlides.slice(insertAt)
        ];
        const expectedPresentation: Presentation = {
            ...presentation,
            slides: expectedSlides
        };
        expect(updatedPresentation).toEqual(expectedPresentation);
        expect(presentation).toEqual(presentationCopy);
    });
    it("should return identical presentation copy if slide ID is not found", () => {
        const presentation: Presentation = createTestPresentation();
        const presentationCopy = structuredClone(presentation);
        const updatedPresentation = moveSlide(presentation, "not-existent-id", 1);
        const expectedPresentation: Presentation = {
            ...presentation
        };
        expect(updatedPresentation).toEqual(expectedPresentation);
        expect(presentation).toEqual(presentationCopy);
    });
});
describe("duplicateSlide", () => {
    it("should duplicate slide and insert it right after original with new ID", () => {
        const presentation: Presentation = createTestPresentation();
        const presentationCopy = structuredClone(presentation);
        const originalIndex = 0;
        const originalSlide = presentation.slides[originalIndex];
        const newSlideId = "duplicate_id";
        const updatedPresentation = duplicateSlide(presentation, originalSlide.id, newSlideId);
        const duplicatedSlide: Slide = {
            ...originalSlide,
            id: newSlideId
        };
        const expectedSlides = [
            ...presentation.slides.slice(0, originalIndex + 1),
            duplicatedSlide,
            ...presentation.slides.slice(originalIndex + 1)
        ];
        const expectedPresentation: Presentation = {
            ...presentation,
            slides: expectedSlides
        };
        expect(updatedPresentation).toEqual(expectedPresentation);
        expect(presentation).toEqual(presentationCopy);
    });
    it("should return identical presentation copy if slide ID is not found", () => {
        const presentation: Presentation = createTestPresentation();
        const presentationCopy = structuredClone(presentation);
        const updatedPresentation = duplicateSlide(presentation, "non-existent-id", "duplicate_id");
        const expectedPresentation: Presentation = {
            ...presentation
        };
        expect(updatedPresentation).toEqual(expectedPresentation);
        expect(presentation).toEqual(presentationCopy);
    });
});
describe("Background functions", () => {
    const testSlide: Slide = {
        id: "slide-1",
        name: "Test Slide",
        background: { type: "none" },
        objects: []
    };

    describe("setSlideBackgroundColor", () => {
        it("should set solid color background on slide", () => {
            const slide = structuredClone(testSlide);
            const slideCopy = structuredClone(slide);

            const updatedSlide = setSlideBackgroundColor(slide, "#FF0000");

            const expectedSlide: Slide = {
                ...slide,
                background: {
                    type: "color",
                    color: "#FF0000",
                    opacity: 1
                }
            };
            expect(updatedSlide).toEqual(expectedSlide);
            expect(slide).toEqual(slideCopy);
        });
    });
    describe("setSlideBackgroundImage", () => {
        it("should set image background on slide", () => {
            const slide = structuredClone(testSlide);
            const slideCopy = structuredClone(slide);
            const imageUrl = "https://localhost";
            const updatedSlide = setSlideBackgroundImage(slide, imageUrl);
            const expectedSlide: Slide = {
                ...slide,
                background: {
                    type: "image",
                    imageUrl
                }
            };
            expect(updatedSlide).toEqual(expectedSlide);
            expect(slide).toEqual(slideCopy);
        });
    });
    describe("setSlideBackgroundGradient", () => {
        it("should set gradient background with default angle 0", () => {
            const slide = structuredClone(testSlide);
            const slideCopy = structuredClone(slide);
            const colors = ["#FF0000", "#0000FF"];
            const updatedSlide = setSlideBackgroundGradient(slide, colors);
            const expectedSlide: Slide = {
                ...slide,
                background: {
                    type: "gradient",
                    colors,
                    angle: 0
                }
            };
            expect(updatedSlide).toEqual(expectedSlide);
            expect(slide).toEqual(slideCopy);
        });
        it("should set gradient background with custom angle", () => {
            const slide = structuredClone(testSlide);
            const slideCopy = structuredClone(slide);
            const colors = ["#FFFFFF", "#000000"];
            const updatedSlide = setSlideBackgroundGradient(slide, colors, 90);
            const expectedSlide: Slide = {
                ...slide,
                background: {
                    type: "gradient",
                    colors,
                    angle: 90
                }
            };
            expect(updatedSlide).toEqual(expectedSlide);
            expect(slide).toEqual(slideCopy);
        });
    });
    describe("clearSlideBackground", () => {
        it("should reset background type to none", () => {
            const coloredSlide: Slide = {
                ...testSlide,
                background: { type: "color", color: "#FF0000", opacity: 1 }
            };
            const slideCopy = structuredClone(coloredSlide);

            const updatedSlide = clearSlideBackground(coloredSlide);

            const expectedSlide: Slide = {
                ...coloredSlide,
                background: { type: "none" }
            };
            expect(updatedSlide).toEqual(expectedSlide);
            expect(coloredSlide).toEqual(slideCopy);
        });
    });
});