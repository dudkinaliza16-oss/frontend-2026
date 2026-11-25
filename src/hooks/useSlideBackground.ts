import { useState, useEffect } from "react";
import type { Slide } from "../domain/types/slide.ts";

function useSlideBackground(slide: Slide) {
    const savedBgColor = slide.background.type === 'color'
        ? slide.background.color
        : '#ffffff';

    const [bgColorInput, setBgColorInput] = useState<string>(savedBgColor);

    useEffect(() => {
        setBgColorInput(savedBgColor);
    }, [savedBgColor]);

    const changeBgColorInput = (value: string) => {
        setBgColorInput(value);
    };

    return {
        bgColorInput,
        savedBgColor,
        changeBgColorInput,
    };
}

export { useSlideBackground };