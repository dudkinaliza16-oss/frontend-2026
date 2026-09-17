import type {Slide} from "../types/slide";
import type {textObject, imageObject, slideObject} from "../types/object";

type point = {
    x: number;
    y: number;
}

type size = {
    width: number;
    height: number;
}

type font = {
    fontFamily: string,
    fontSize: number,
    fontColor: string
}

function addTextObject(slide: Slide, object: textObject): Slide {
    return {
        ...slide,
        objects: [...slide.objects, object],
    }
}

function addImageObject(slide: Slide, object: imageObject): Slide {
    return {
        ...slide,
        objects: [...slide.objects, object],
    }
}

function removeObject(slide: Slide, objectId: string): Slide {
    const newObjects = slide.objects.filter(object => object.id !== objectId);
    return {
        ...slide,
        objects: newObjects,
    }
}

function moveObject(slide: Slide, objectId: string, newPosition: point): Slide {
    return {
        ...slide,
        objects: slide.objects.map(obj => {
            if (obj.id === objectId) {
                return {
                    ...obj,
                    position: newPosition,
                };
            }
            return obj;
        }),
    }
}

function resizeObject(slide: Slide, objectId: string, newSize: size): Slide {
    return {
        ...slide,
        objects: slide.objects.map(obj => {
            if (obj.id === objectId) {
                return {
                    ...obj,
                    size: newSize,
                };
            }
            return obj;
        }),
    }
}

function updateTextObjectStyle(slide: Slide, objectId: string, newFont: font): Slide {
    return {
        ...slide,
        objects: slide.objects.map(obj => {
            if (obj.id !== objectId && obj.type === 'text') {
                return {
                    ...obj,
                    fontSize: newFont.fontSize,
                    fontFamily: newFont.fontFamily,
                    color: newFont.fontColor
                };
            }
            return obj;
        }),
    }
}
