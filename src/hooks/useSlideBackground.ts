import { useState, useEffect } from "react";
import type { Slide } from "../domain/types/slide.ts";
import { dispatch } from "../modules/editor.ts";
import { setSlideBackgroundColorModifier } from "../modules/modifiers.ts";

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

    const applyBgColor = (selectedColor: string) => {
        if (selectedColor !== savedBgColor) {
            dispatch(setSlideBackgroundColorModifier, {
                slideId: slide.id,
                color: selectedColor,
            });
        }
    };

    return {
        bgColorInput,
        changeBgColorInput,
        applyBgColor,
    };
}

export { useSlideBackground };