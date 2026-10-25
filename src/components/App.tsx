import type {Presentation} from '../domain/types/presentation.js';
import {Toolbar} from './Toolbar.js';
import {SlideList} from "./SlideList.js";
import {Workspace} from "./Workspace.js";
import "./base.css";
import styles from "./App.module.css"
import {getPresentationState, getPreviewMode, setPreviewMode} from "../editor.ts";
import {PreviewOverlay} from "./PreviewOverlay.tsx";

function App() {
    let presentation : Presentation = getPresentationState();
    if (getPreviewMode()) {
        return (
            <PreviewOverlay
                presentation={presentation}
                onClose={() => setPreviewMode(false)}
            />
        );
    }
    return (
        <div className={styles.mainContainer}>
            <Toolbar presentation={presentation} />
            <div className={styles.editorField}>
                <SlideList presentation={presentation} />
                <Workspace presentation={presentation} />
            </div>
        </div>
    );
}

export {App};