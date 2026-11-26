import {Button} from "../button/Button.js";
import styles from "./SlideProperties.module.css";
import buttonStyles from '../button/Button.module.css';
import {dispatch} from "../../modules/editor.ts";
import {addImageObjectModifier} from "../../modules/modifiers.ts";
import type {Slide} from "../../domain/types/slide.ts";
import {useImageLoader} from "../../hooks/useImageLoader.ts";
import {TextStylePanel} from "../textStylePanel/TextStylePanel.tsx";
import {BackgroundPanel} from "../backgroundPanel/BackgroundPanel.tsx";
import {useEffect, useState} from "react";

type SlidePropertiesProps = {
    slide: Slide;
    selectedObjectIds: string[];
    onPreviewBackgroundColorChange: (color: string | null) => void;
};

function SlideProperties(props: SlidePropertiesProps) {
    const hasSelectedObjects = (props.selectedObjectIds?.length ?? 0) > 0;

    const [isBgPanelVisible, setIsBgPanelVisible] = useState<boolean>(!hasSelectedObjects);
    useEffect(() => {
        setIsBgPanelVisible(!hasSelectedObjects);
    }, [hasSelectedObjects]);

    const imgObjLoader = useImageLoader((src) => {
        dispatch(addImageObjectModifier, {
            slideId: props.slide.id,
            src: src
        });
    });

    return (
        <div className={styles.properties}>
            <div className={styles.actions}>
                <Button
                    text="+Text"
                    className={buttonStyles.button}
                    onClick={() => console.log("add text")}
                />
                <input
                    ref={imgObjLoader.fileInputRef}
                    type="file"
                    style={{display: 'none'}}
                    accept="image/*"
                    onChange={imgObjLoader.handleFileChange}
                />
                <Button
                    text="+Image"
                    className={buttonStyles.button}
                    onClick={() => imgObjLoader.openFilePicker()}
                />
                <TextStylePanel
                    slide={props.slide}
                    selectedObjectIds={props.selectedObjectIds}
                />
                {isBgPanelVisible && (
                    <BackgroundPanel
                        slide={props.slide}
                    />
                )}
            </div>
        </div>
    );
}

export {SlideProperties};