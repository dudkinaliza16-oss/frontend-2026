import {useEffect, useRef} from "react";
import type {Slide} from "../../domain/types/slide.ts";
import {TextInput} from "../textInput/TextInput.tsx";
import {useTextStyle} from "../../hooks/useTextStyle.ts";
import {updateTextObjectStyleModifier} from "../../modules/modifiers.ts";
import {dispatch} from "../../modules/editor.ts";
import styles from "./TextStylePanel.module.css";

const FONT_FAMILIES = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
];

type ColorDraft = {
    color: string;
    objectIds: string[];
};

type TextStylePanelProps = {
    slide: Slide;
    selectedObjectIds: string[];
    onPreviewColorChange: (color: string | null) => void;
};

export function TextStylePanel({slide, selectedObjectIds, onPreviewColorChange,}: TextStylePanelProps) {
    const {
        selectedTextObjects,
        fontFamily,
        fontSize,
        fontColor,
        setFontColor,
        applyFontFamily,
        applyFontSize,
    } = useTextStyle(slide, selectedObjectIds);
    const draftRef = useRef<ColorDraft | null>(null);
    const latestRef = useRef({slide, onPreviewColorChange});
    latestRef.current = {slide, onPreviewColorChange};
    const commit = () => {
        const draft = draftRef.current;
        draftRef.current = null;
        if (!draft) return;
        latestRef.current.onPreviewColorChange(null);
        for (const obj of latestRef.current.slide.objects) {
            if (obj.type === "text" && draft.objectIds.includes(obj.id) && obj.font.color !== draft.color) {
                dispatch(updateTextObjectStyleModifier, {
                    objectId: obj.id,
                    newFont: {...obj.font, color: draft.color},
                });
            }
        }
    };
    useEffect(() => {
        onPreviewColorChange(null);
    }, [slide.id, selectedObjectIds, onPreviewColorChange]);
    useEffect(() => {
        return commit();
    } , [slide.id, selectedObjectIds]);
    if (selectedTextObjects.length === 0) {
        return null;
    }
    const handleColorChange = (newColor: string) => {
        setFontColor(newColor);
        onPreviewColorChange(newColor);
        draftRef.current = {
            color: newColor,
            objectIds: selectedTextObjects.map((obj) => obj.id),
        };
    };
    return (
        <div className={styles.textStylePanel}>
            <select
                value={fontFamily}
                onChange={(event) => applyFontFamily(event.target.value)}
                className={styles.fontSelect}
            >
                <option value="" disabled>Шрифт...</option>
                {FONT_FAMILIES.map((font) => (
                    <option key={font} value={font}>{font}</option>
                ))}
            </select>
            <div className={styles.inputGroup}>
                <TextInput
                    type="number"
                    value={fontSize}
                    onChange={applyFontSize}
                    className={styles.numberInput}
                />
            </div>
            <div className={styles.colorGroup} onBlur={commit}>
                <span className={styles.colorLabel}>Цвет:</span>
                <TextInput
                    type="color"
                    value={fontColor}
                    onChange={handleColorChange}
                    className={styles.colorInput}
                />
            </div>
        </div>
    );
}