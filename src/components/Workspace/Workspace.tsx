import type { Presentation } from "../../domain/types/presentation.ts";
import { SlideProperties } from "../SlideProperties/SlideProperties.tsx";
import { SlidePreview } from "../SlidePreview/SlidePreview.tsx";
import styles from "./Workspace.module.css";
import {getActiveSlideState} from "../../editor.ts";
import {getActiveSlideId} from "../../modules/editor.ts";

type WorkspaceProps = {
    presentation: Presentation;
}
function Workspace(props: WorkspaceProps) {
    const activeSlideId = getActiveSlideState();
    const activeSlide = props.presentation.slides.find(slide => slide.id === activeSlideId)
        || props.presentation.slides[0];
    const activeSlideId = getActiveSlideId();
    if (props.presentation.slides.length === 0) {
        return (
            <div className={styles.emptyWorkspace}>
                <h2>Ваша презентация пока пуста</h2>
                <p>Добавьте первый слайд, чтобы начать работу.</p>
            </div>
        );
    }
    return (
        <div className={styles.workspaceWrapper}>
            <div className={styles.propertiesPanel}>
                <SlideProperties />
            </div>

            <div className={styles.slideArea}>
                {activeSlide && (
                    <SlidePreview
                        slide={activeSlide}
                        mode="workspace"
                    />
                )}
            </div>
        </div>
    );
}
export {
    Workspace
};
