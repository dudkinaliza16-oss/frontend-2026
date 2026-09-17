import type {slideObject, point} from "./object";
type colorBackground = {
    type: "color";
    color: string;
    opacity: number;
}

type imageBackground = {
    type: "image";
    imageUrl: string;
}

type gradientBackground = {
    type: 'gradient';
    colors: string[];
    angle?: number;
}

type noneBackground = {
    type: "none";
}

type Background = colorBackground | imageBackground | gradientBackground | noneBackground;

type Slide = {
    id: string;
    name: string;
    background: Background;
    objects: slideObject[];
}

export type {Slide, Background};