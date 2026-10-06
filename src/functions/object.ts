import type {Slide} from "../types/slide.js";
import type {SlideObject, Point, Size, Font} from "../types/object.js";

function addSlideObject(slide: Slide,
                        object: SlideObject): Slide {
    return {
        ...slide,
        objects: [...slide.objects, object],
    }
}

function removeObject(slide: Slide,
                      objectId: string): Slide {
    const newObjects = slide.objects.filter(object => object.id !== objectId);
    return {
        ...slide,
        objects: newObjects,
    }
}

function modifyObject(slide: Slide,
                      objectId: string,
                      modifier: (obj: SlideObject) => SlideObject): Slide {
    return {
        ...slide,
        objects: slide.objects.map(obj => {
            if (obj.id === objectId) {
                return modifier(obj);
            }
            return obj;
        }),
    };
}

function moveObject(slide: Slide,
                    objectId: string,
                    newLocation: Point): Slide {
    return modifyObject(slide, objectId, obj => ({
        ...obj,
        location: newLocation,
    }));
}

function resizeObject(slide: Slide,
                      objectId: string,
                      newSize: Size): Slide {
    return modifyObject(slide, objectId, obj => ({
        ...obj,
        size: newSize,
    }));
}

function updateTextObjectStyle(slide: Slide,
                               objectId: string,
                               newFont: Font): Slide {
    return modifyObject(slide, objectId, obj => {
        if (obj.type === 'text') {
            return {
                ...obj,
                font: newFont
            };
        }
        return obj;
    });
}

export {
    addSlideObject,
    removeObject,
    resizeObject,
    moveObject,
    updateTextObjectStyle
}
