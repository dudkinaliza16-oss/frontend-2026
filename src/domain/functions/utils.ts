import type {Background, Slide} from "../types/slide.ts";
import type {SlideObject, TextObject, ImageObject} from "../types/object.ts";
import type {Presentation} from "../types/presentation.ts";
function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}
function createTestSlide(id: string, objects: SlideObject[] = []): Slide {
    return {
        id,
        background: {type: "none"},
        objects,
    };
}
function createTestPresentation(slides?: Slide[]): Presentation{
    return {
        id: generateId(),
        name: "Test Presentation",
        slides: slides ?? [createTestSlide("slide-1", []), createTestSlide("slide-2", []), createTestSlide("slide-3", [])],
    };
}
function createTestTextObject(id: string, text = "Test Text"):TextObject {
    return {
        type: 'text',
        content: text,
        font: {
            family: "Arial",
            size: 12,
            color: "black",
        },
        id,
        location: {x: 0, y: 0},
        size: {width: 10, height: 10},
        rotation: 0,
    };
}

function createTestImageObject(id: string, imageUrl = "test-url"): ImageObject {
    return {
        type: "image",
        imageUrl,
        opacity: 1,
        id,
        location: {x: 0, y: 0},
        size: {width: 10, height: 10},
        rotation: 0,
    };
}

function getBackgroundStyle(background: Background) {
    switch (background.type) {
        case 'color':
            return { backgroundColor: background.color };
        case "none":
            return { backgroundColor: "#ffffff" };
        case 'image':
            return {
                backgroundImage: `url(${background.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            };
        case "gradient":
            const angle = background.angle !== undefined ? `${background.angle}deg` : 'to right';
            const colorsJoined = background.colors.join(', ');

            return {
                backgroundImage: `linear-gradient(${angle}, ${colorsJoined})`,
            };
        default:
            return {};
    }
}

export {
    generateId,
    createTestTextObject,
    createTestImageObject,
    createTestSlide,
    createTestPresentation,
    getBackgroundStyle
}