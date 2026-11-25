import {useEffect, useState} from "react";
import type {Slide} from "../../domain/types/slide.ts";
import type {TextObject} from "../../domain/types/object.ts";
import {TextInput} from "../textInput/TextInput.tsx";
import {updateTextObjectStyleModifier} from "../../modules/modifiers.ts";
import {dispatch} from "../../modules/editor.ts";
import styles from "./TextStylePanel.module.css";

function getTextStyleState(selectedTextObjects: TextObject[]) {
    if (selectedTextObjects.length === 0) {
        return {
            fontFamily: "",
            fontSizeValue: "",
            fontColor: "#000000",
        };
    }

    const firstText = selectedTextObjects[0];
    let hasMixedFamily = false;
    let hasMixedSize = false;
    let hasMixedColor = false;
    for (let i = 1; i < selectedTextObjects.length; i++) {
        const obj = selectedTextObjects[i];
        if (obj.font.family !== firstText.font.family) {
            hasMixedFamily = true;
        }
        if (obj.font.size !== firstText.font.size) {
            hasMixedSize = true;
        }
        if (obj.font.color !== firstText.font.color) {
            hasMixedColor = true;
        }
    }
    return {
        fontFamily: !hasMixedFamily
            ? firstText.font.family
            : "",
        fontSizeValue: !hasMixedSize
            ? String(firstText.font.size)
            : "",
        fontColor: !hasMixedColor
            ? firstText.font.color
            : "#000000",
    };
}

type TextStylePanelProps = {
    slide: Slide;
    selectedObjectIds: string[];
};

function TextStylePanel({slide, selectedObjectIds}: TextStylePanelProps) {
    const selectedTextObjects = slide.objects.filter(
        (obj): obj is TextObject =>
            selectedObjectIds.includes(obj.id) && obj.type === "text"
    );

    const styleState = getTextStyleState(selectedTextObjects);

    const [fontFamily, setFontFamily] = useState<string>(styleState.fontFamily);
    const [fontSize, setFontSize] = useState<string>(styleState.fontSizeValue);
    const [draftColor, setDraftColor] = useState<string>(styleState.fontColor);

    useEffect(() => {
        setFontFamily(styleState.fontFamily);
        setFontSize(styleState.fontSizeValue);
        setDraftColor(styleState.fontColor);
    }, [
        selectedObjectIds,
        styleState.fontFamily,
        styleState.fontSizeValue,
        styleState.fontColor,
    ]);

    if (selectedTextObjects.length === 0) {
        return null;
    }

    const applyFontFamily = (newFamily: string) => {
        setFontFamily(newFamily);
        selectedTextObjects.forEach((textObj) => {
            if (textObj.font.family !== newFamily) {
                dispatch(updateTextObjectStyleModifier, {
                    objectId: textObj.id,
                    newFont: {...textObj.font, family: newFamily},
                });
            }
        });
    };

    const applyFontSize = (inputValue: string) => {
        setFontSize(inputValue);
        if (inputValue.trim() === "") {
            return;
        }
        const parsed = Number(inputValue);
        if (Number.isNaN(parsed)) {
            return;
        }
        const clampedSize = Math.max(8, Math.min(200, parsed));
        selectedTextObjects.forEach((textObj) => {
            if (clampedSize !== textObj.font.size) {
                dispatch(updateTextObjectStyleModifier, {
                    objectId: textObj.id,
                    newFont: {...textObj.font, size: clampedSize},
                });
            }
        });
    };
    const applyFontColor = () => {
        selectedTextObjects.forEach((textObj) => {
            if (draftColor !== textObj.font.color) {
                dispatch(updateTextObjectStyleModifier, {
                    objectId: textObj.id,
                    newFont: {...textObj.font, color: draftColor},
                });
            }
        });
    };

    return (
        <div className={styles.textStylePanel}>
            <select
                value={fontFamily}
                onChange={(event) => applyFontFamily(event.target.value)}
                className={styles.fontSelect}
            >
                <option value="" disabled>Шрифт...</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
            </select>

            <div className={styles.inputGroup}>
                <TextInput
                    type="number"
                    value={fontSize}
                    onChange={applyFontSize}
                    className={styles.numberInput}
                />
            </div>
            <div className={styles.colorGroup} onBlur={applyFontColor}>
                <span className={styles.colorLabel}>Цвет:</span>
                <TextInput
                    type="color"
                    value={draftColor}
                    onChange={setDraftColor}
                    className={styles.colorInput}
                />
            </div>
        </div>
    );
}

export {TextStylePanel};