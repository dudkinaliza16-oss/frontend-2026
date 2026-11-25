import type {Presentation} from "../../domain/types/presentation.ts";
import {SlideProperties} from "../slideProperties/SlideProperties.tsx";
import {SlidePreview} from "../slidePreview/SlidePreview.tsx";
import styles from "./Workspace.module.css";
import {getActiveSlideId} from "../../modules/editor.ts";
import {useSelection} from "../../hooks/useSelection.ts";

type WorkspaceProps = {
    presentation: Presentation;
}

function Workspace(props: WorkspaceProps) {
    const activeSlideId = getActiveSlideId();
    const {selectedIds, handleSlideClick, handlerSelect} = useSelection();
    const activeSlide = props.presentation.slides.find(
        slide => slide.id === activeSlideId
    );
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
            {activeSlide && (
                <>
                    <div className={styles.propertiesPanel}>
                        <SlideProperties
                            slide={activeSlide}
                            selectedObjectIds={selectedIds}
                        />
                    </div>
                    <div className={styles.slideArea}>
                        <SlidePreview
                            slide={activeSlide}
                            mode="workspace"
                            selectedIds={selectedIds}
                            onObjectClick={handlerSelect}
                            onSlideClick={handleSlideClick}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export {
    Workspace
};
