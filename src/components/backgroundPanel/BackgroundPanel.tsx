import {useEffect, useRef} from "react";
import {Button} from "../button/Button.js";
import buttonStyles from '../button/Button.module.css';
import type {Slide} from "../../domain/types/slide.ts";
import {useSlideBackground} from "../../hooks/useSlideBackground.ts";
import {useImageLoader} from "../../hooks/useImageLoader.ts";
import {TextInput} from "../textInput/TextInput.tsx";
import {dispatch} from "../../modules/editor.ts";
import {
    setSlideBackgroundImageModifier,
    clearSlideBackgroundModifier,
} from "../../modules/modifiers.ts";
import styles from "./BackgroundPanel.module.css";

type BackgroundPanelProps = {
    slide: Slide;
    onPreviewBackgroundColorChange?: (color: string | null) => void;
};

function BackgroundPanel({slide, onPreviewBackgroundColorChange}: BackgroundPanelProps) {
    const {bgColorInput, changeBgColorInput, applyBgColor} = useSlideBackground(slide);

    const latestRef = useRef({ bgColorInput, applyBgColor, onPreviewBackgroundColorChange });
    latestRef.current = { bgColorInput, applyBgColor, onPreviewBackgroundColorChange };

    useEffect(() => {
        return () => {
            latestRef.current.applyBgColor(latestRef.current.bgColorInput);
            latestRef.current.onPreviewBackgroundColorChange?.(null);
        };
    }, []);

    const backgroundLoader = useImageLoader((src) => {
        dispatch(setSlideBackgroundImageModifier, {
            slideId: slide.id,
            src: src,
        });
    });

    const clearBackground = () => {
        onPreviewBackgroundColorChange?.(null);
        dispatch(clearSlideBackgroundModifier, {
            slideId: slide.id,
        });
    };

    const handleBackgroundInputChange = (newColor: string) => {
        changeBgColorInput(newColor);
        onPreviewBackgroundColorChange?.(newColor);
    };

    const handleBackgroundBlur = () => {
        applyBgColor(bgColorInput);
        onPreviewBackgroundColorChange?.(null);
    };

    return (
        <div className={styles.backgroundPanel}>
            <div>
                <TextInput
                    type="color"
                    value={bgColorInput}
                    onChange={handleBackgroundInputChange}
                    onBlur={handleBackgroundBlur}
                />
            </div>

            <div>
                <input
                    ref={backgroundLoader.fileInputRef}
                    type="file"
                    style={{display: 'none'}}
                    accept="image/*"
                    onChange={backgroundLoader.handleFileChange}
                />
                <Button
                    text="+Background Image"
                    className={buttonStyles.button}
                    onClick={backgroundLoader.openFilePicker}
                />
            </div>

            <div>
                <Button
                    text="Clear background"
                    className={buttonStyles.button}
                    onClick={clearBackground}
                />
            </div>
        </div>
    );
}

export {BackgroundPanel};