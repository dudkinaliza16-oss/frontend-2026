import {useHistoryUI} from '../../hooks/useHistoryUI.js';
import {Toolbar} from '../toolbar/Toolbar.js';
import {SlideList} from "../slideList/SlideList.js";
import {Workspace} from "../workspace/Workspace.js";
import {PreviewOverlay} from "../previewOverlay/PreviewOverlay.js";
import styles from "./App.module.css"
import {getPresentationState, getPreviewMode, setPreviewMode} from "../../modules/editor.ts";

function App() {
    const presentation = getPresentationState();
    const {canUndo, canRedo, onUndo, onRedo} = useHistoryUI();
    if (!presentation) return <div>Загрузка...</div>;
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
            <Toolbar
                presentation={presentation}
                canUndo={canUndo}
                canRedo={canRedo}
                onUndo={onUndo}
                onRedo={onRedo}
            />
            <div className={styles.editorField}>
                <SlideList presentation={presentation}/>
                <Workspace presentation={presentation}/>
            </div>
        </div>
    );
}

export {App};