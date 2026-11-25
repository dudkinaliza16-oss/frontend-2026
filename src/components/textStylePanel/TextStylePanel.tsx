import type {Slide} from "../../domain/types/slide.ts";
import {TextInput} from "../textInput/TextInput.tsx";
import {useTextStyle} from "../../hooks/useTextStyle.ts";
import styles from "./TextStylePanel.module.css";

type TextStylePanelProps = {
    slide: Slide;
    selectedObjectIds: string[];
};

function TextStylePanel({slide, selectedObjectIds}: TextStylePanelProps) {
    const {
        selectedTextObjects,
        fontFamily,
        fontSize,
        draftColor,
        setDraftColor,
        applyFontFamily,
        applyFontSize,
        applyFontColor,
    } = useTextStyle(slide, selectedObjectIds);

    if (selectedTextObjects.length === 0) {
        return null;
    }

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