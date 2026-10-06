type SlideObject = TextObject | ImageObject;

type TextObject = BaseObject & {
    type: 'text';
    content: string;
    font: Font;
}

type ImageObject = BaseObject & {
    type: 'image';
    imageUrl: string;
    opacity: number;
}
type BaseObject = {
    id: string;
    location: Point;
    size: Size;
    rotation: number;
}

type Font = {
    family: string;
    size: number;
    color: string;
}

type Point = {
    x: number;
    y: number;
}

type Size = {
    width: number;
    height: number;
}

export type {
    SlideObject,
    TextObject,
    ImageObject,
    Point,
    Size,
    Font
};