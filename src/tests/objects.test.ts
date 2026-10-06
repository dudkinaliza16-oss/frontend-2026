import { describe, it, expect } from 'vitest';
import {
    addSlideObject,
    removeObject,
    moveObject,
    resizeObject,
    updateTextObjectStyle
} from "../functions/object.js";
import type { Slide } from "../types/slide.js";
import type { Font } from "../types/object.js";
import {createTestSlide, createTestTextObject, createTestImageObject} from "../functions/utils.js";

describe("addSlideObject", () => {
    it("should add a new object to the end of the slide objects array", () => {
        const slide: Slide = createTestSlide("slide-1")
        const slideCopy = structuredClone(slide);

        const newObject = createTestTextObject("obj-1")

        const slideWithObject = addSlideObject(slide, newObject);

        const expectedSlide: Slide = {
            id: slide.id,
            name: "Test slide",
            background: {type: "none"},
            objects: [...slide.objects,newObject]
        }

        expect(expectedSlide).toEqual(slideWithObject);
        expect(slide).toEqual(slideCopy);
    });
});

describe("removeObject", () => {
    it("should remove a new object from the end of the slide objects array", () => {
        const obj1 = createTestTextObject("obj-1");
        const obj2 = createTestTextObject("obj-2");

        const slide: Slide = {
            ...createTestSlide("slide-1"),
            objects: [obj1, obj2],
        };
        const slideCopy = structuredClone(slide);

        const slideWithoutObject = removeObject(slide, "obj-1");

        const expectedSlide: Slide = {
            ...slide,
            objects: [obj2],
        };

        expect(slideWithoutObject).toEqual(expectedSlide);
        expect(slide).toEqual(slideCopy);

    });
});

describe("moveObject", () => {
    it("should move a new object to new position", () => {
        const newLocation = { x: 150, y: 300 };
        const obj1 = createTestTextObject("obj-1");
        const slide = {
            ...createTestSlide("slide-1"),
            objects: [obj1]
        };
        const slideCopy = structuredClone(slide);
        const slideWithMoveObject = moveObject(slide, "obj-1", newLocation);
        const expectedSlide: Slide = {
            ...slide,
            objects: [
                {
                    ...obj1,
                    location: newLocation
                }
            ]
        };
        expect(slideWithMoveObject).toEqual(expectedSlide);
        expect(slide).toEqual(slideCopy);
    });
});

describe("resizeObject", () => {
    it("should update size of the specified object", () => {
        const newSize = {width: 20, height: 20 };
        const obj1 = createTestTextObject("obj-1");
        const slide = {
            ...createTestSlide("slide-1"),
            objects: [obj1]
        };
        const slideCopy = structuredClone(slide);
        const slideWithResizeObject = resizeObject(slide, "obj-1", newSize);
        const expectedSlide: Slide = {
            ...slide,
            objects: [
                {
                    ...obj1,
                    size: newSize
                }
            ]
        };
        expect(slideWithResizeObject).toEqual(expectedSlide);
        expect(slide).toEqual(slideCopy);
    });
});

describe("updateTextObjectStyle", () => {
    it("should update font properties for a text object", () => {
        const newFont: Font = {
            family: "Roboto",
            size: 24,
            color: "#FF0000"
        };
        const textObj = createTestTextObject("text-1");
        const slide: Slide = {
            ...createTestSlide("slide-1"),
            objects: [textObj]
        };
        const slideCopy = structuredClone(slide);
        const slideWithUpdatedStyle = updateTextObjectStyle(slide, "text-1", newFont);
        const expectedSlide: Slide = {
            ...slide,
            objects: [
                {
                    ...textObj,
                    font: newFont
                }
            ]
        };

        expect(slideWithUpdatedStyle).toEqual(expectedSlide);
        expect(slide).toEqual(slideCopy);
    });
    it("should not modify object if target object is not of type 'text'", () => {
        const newFont: Font = {
            family: "Roboto",
            size: 24,
            color: "#FF0000"
        };
        const imageObj = createTestImageObject("img-1");
        const slide: Slide = {
            ...createTestSlide("slide-1"),
            objects: [imageObj]
        };
        const slideCopy = structuredClone(slide);

        const slideWithUpdatedStyle = updateTextObjectStyle(slide, "img-1", newFont);

        expect(slideWithUpdatedStyle).toEqual(slide);
        expect(slide).toEqual(slideCopy);
    });
})
