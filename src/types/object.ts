type point = {
    x: number;
    y: number;
}

type size = {
    width: number;
    height: number;
}

type font = {
    family: string;
    size: number;
    color: string;
}

type baseObject = {
    id: string;
    location: point;
    size: size;
    rotation: number;
}

type textObject = baseObject & {
    type: 'text';
    content: string;
    font: font;
}

type imageObject = baseObject & {
    type: 'image';
    imageUrl: string;
    opacity: number;
}

type slideObject = textObject | imageObject;

export type {slideObject, textObject, imageObject, point};