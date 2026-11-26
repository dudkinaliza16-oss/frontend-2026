import {useEffect, useState} from "react";
import type {Slide} from "../domain/types/slide.ts";
import type {TextObject} from "../domain/types/object.ts";
import {updateTextObjectStyleModifier} from "../modules/modifiers.ts";
import {dispatch} from "../modules/editor.ts";

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
        fontFamily: !hasMixedFamily ? firstText.font.family : "",
        fontSizeValue: !hasMixedSize ? String(firstText.font.size) : "",
        fontColor: !hasMixedColor ? firstText.font.color : "#000000",
    };
}

function useTextStyle(slide: Slide, selectedObjectIds: string[]) {
    const selectedTextObjects = slide.objects.filter(
        (obj): obj is TextObject =>
            selectedObjectIds.includes(obj.id) && obj.type === "text"
    );

    const styleState = getTextStyleState(selectedTextObjects);
    const selectionKey = selectedObjectIds.join(",");

    const [fontFamily, setFontFamily] = useState<string>(styleState.fontFamily);
    const [fontSize, setFontSize] = useState<string>(styleState.fontSizeValue);
    const [fontColor, setFontColor] = useState<string>(styleState.fontColor);

    useEffect(() => {
        setFontFamily(styleState.fontFamily);
        setFontSize(styleState.fontSizeValue);
        setFontColor(styleState.fontColor);
    }, [
        selectionKey,
        styleState.fontFamily,
        styleState.fontSizeValue,
        styleState.fontColor,
    ]);

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

    const applyFontColor = (newColor: string) => {
        setFontColor(newColor);
        selectedTextObjects.forEach((textObj) => {
            if (newColor !== textObj.font.color) {
                dispatch(updateTextObjectStyleModifier, {
                    objectId: textObj.id,
                    newFont: {...textObj.font, color: newColor},
                });
            }
        });
    };

    return {
        selectedTextObjects,
        fontFamily,
        fontSize,
        fontColor,
        setFontColor,
        applyFontFamily,
        applyFontSize,
        applyFontColor,
    };
}

export {useTextStyle};