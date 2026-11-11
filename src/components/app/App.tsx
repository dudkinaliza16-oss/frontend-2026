import {Toolbar} from '../toolbar/Toolbar.js';
import {SlideList} from "../slideList/SlideList.js";
import {Workspace} from "../workspace/Workspace.js";
import {PreviewOverlay} from "../previewOverlay/PreviewOverlay.js";
import styles from "./App.module.css"
import {getPresentationState, getPreviewMode, setPreviewMode} from "../../modules/editor.ts";

function App() {
    const presentation = getPresentationState();
    if (!presentation) {
        return null;
    }
    if (getPreviewMode()) {
        return (
            <PreviewOverlay
                presentation={presentation}
                onClose={() => setPreviewMode(false)}
            />
        );
    }
    return (
        <div
            className={styles.mainContainer}>
            <Toolbar presentation={presentation}/>
            <div className={styles.editorField}>
                <SlideList presentation={presentation}/>
                <Workspace presentation={presentation}/>
            </div>
        </div>
    );
}

export {App};