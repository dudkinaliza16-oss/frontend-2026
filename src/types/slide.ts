import type { SlideObject } from "./object.js";

type Background = ColorBackground | ImageBackground | GradientBackground | DefaultBackground;

type ColorBackground = {
    type: "color";
    color: string;
    opacity: number;
}

type ImageBackground = {
    type: "image";
    imageUrl: string;
}

type GradientBackground = {
    type: 'gradient';
    colors: string[];
    angle?: number;
}


type Slide = {
    id: string;
    name: string;
    background: Background;
    objects: SlideObject[];
}

type DefaultBackground = {
    type: "none";
}

export type {
    Slide,
    Background
};