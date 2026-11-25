import {Button} from "../button/Button.js";
import buttonStyles from '../button/Button.module.css';
import type {Slide} from "../../domain/types/slide.ts";
import {useSlideBackground} from "../../hooks/useSlideBackground.ts";
import {useImageLoader} from "../../hooks/useImageLoader.ts";
import {TextInput} from "../textInput/TextInput.tsx";
import {dispatch} from "../../modules/editor.ts";
import {
    setSlideBackgroundColorModifier,
    setSlideBackgroundImageModifier,
    clearSlideBackgroundModifier,
} from "../../modules/modifiers.ts";
import styles from "./BackgroundPanel.module.css"

type BackgroundPanelProps = {
    slide: Slide;
};

function BackgroundPanel({slide}: BackgroundPanelProps) {
    const {bgColorInput, changeBgColorInput, savedBgColor} = useSlideBackground(slide);

    const applyBgColor = (selectedColor: string) => {
        if (selectedColor !== savedBgColor) {
            dispatch(setSlideBackgroundColorModifier, {
                slideId: slide.id,
                color: selectedColor,
            });
        }
    };

    const backgroundLoader = useImageLoader((src) => {
        dispatch(setSlideBackgroundImageModifier, {
            slideId: slide.id,
            src: src,
        });
    });

    const clearBackground = () => {
        dispatch(clearSlideBackgroundModifier, {
            slideId: slide.id,
        });
    };

    return (
        <div className={styles.backgroundPanel}>
            <div>
                <TextInput
                    type="color"
                    value={bgColorInput}
                    onChange={changeBgColorInput}
                    onBlur={applyBgColor}
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