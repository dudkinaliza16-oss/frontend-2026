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

type ToolbarProps = {
    presentation: Presentation;
};

function Toolbar(props: ToolbarProps) {
    return (
        <div className={styles.toolbar}>
            <div>
                <TextInput
                    value={props.presentation.name}
                    placeholder="Название презентации"
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
                    onClick={() => console.log('save')}
                />
                <Button
                    text="↪reDo"
                    className={buttonStyles.button}
                    onClick={() => console.log('save')}
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
                    text="Save PDF"
                    className={buttonStyles.button}
                    onClick={() => console.log('save')}
                />
            </div>
        </div>
    );
}

export {Toolbar};
