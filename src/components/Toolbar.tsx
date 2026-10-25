import type { Presentation } from '../domain/types/presentation.js';
import { Button } from './Button.js';
import styles from './Toolbar.module.css';
import buttonStyles from './Button.module.css';
import {dispatch, setPreviewMode} from '../editor.ts';
import { updatePresentationName } from '../domain/functions/presentation.ts';
import { TextInput } from './TextInput.tsx';
import {addSlide} from "../domain/functions/slide.ts";
import {generateId} from "../domain/functions/utils.ts";

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
                    onChange={(name) =>
                        dispatch(updatePresentationName, name)
                    }
                />
            </div>

            <div className={styles.actions}>
                <Button
                    text="Add Slide"
                    className={buttonStyles.button}
                    onClick={() => dispatch(addSlide, generateId())}

                />

                <Button
                    text="Add Image"
                    className={buttonStyles.button}
                    onClick={() => console.log('add img')}
                />

                <Button
                    text="Show"
                    className={buttonStyles.button}
                    onClick={() => {setPreviewMode(true);}}
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

export { Toolbar };
