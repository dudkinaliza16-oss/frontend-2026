import type {Presentation} from '../../domain/types/presentation.js';
import {Button} from '../button/Button.js';
import styles from './Toolbar.module.css';
import buttonStyles from '../button/Button.module.css';
import {dispatch, setPreviewMode} from '../../modules/editor.ts';
import {TextInput} from '../textInput/TextInput.tsx';
import {
    addSlideModifier,
    updatePresentationNameModifier
} from "../../modules/modifiers.ts";
import {usePdfExport} from "../../hooks/usePdfExport.ts";

type ToolbarProps = {
    presentation: Presentation;
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
};

function Toolbar(props: ToolbarProps) {
    const {exportToPdf, isExporting} = usePdfExport(props.presentation.name)
    return (
        <div className={styles.toolbar}>
            <div>
                <TextInput
                    value={props.presentation.name}
                    placeholder="Presentation name"
                    className={styles.presentationName}
                    onChange={(name) => {
                        dispatch(updatePresentationNameModifier, name);
                    }
                }
                />
            </div>
            <div className={styles.actions}>
                <Button
                    text="↩unDo"
                    className={buttonStyles.button}
                    onClick={props.onUndo}
                    disabled={!props.canUndo}
                />
                <Button
                    text="↪reDo"
                    className={buttonStyles.button}
                    onClick={props.onRedo}
                    disabled={!props.canRedo}
                />
                <Button
                    text="Add Slide"
                    className={buttonStyles.button}
                    onClick={() => {
                        dispatch(addSlideModifier, undefined);
                    }}
                />
                <Button
                    text="Show"
                    className={buttonStyles.button}
                    onClick={() => {
                        setPreviewMode(true);
                    }}
                />
                <Button
                    text={isExporting === true
                        ? "Exporting.."
                        : "Save PDF"}
                    className={buttonStyles.button}
                    onClick={exportToPdf}
                    disabled={isExporting}
                />
            </div>
        </div>
    );
}

export {Toolbar};