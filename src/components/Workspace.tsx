
import type { Presentation } from "../domain/types/presentation.ts";
import { SlideProperties } from "./SlideProperties.tsx";
import { SlidePreview } from "./SlidePreview.tsx";
import styles from "./Workspace.module.css";

type WorkspaceProps = {
    presentation: Presentation;
};

function Workspace(props: WorkspaceProps) {
    const firstSlide = props.presentation.slides[0];
    return (
        <div className={styles.workspaceWrapper}>
            <div className={styles.propertiesPanel}>
                <SlideProperties />
            </div>

            <div className={styles.slideArea}>
                {firstSlide && (
                    <SlidePreview
                        slide={firstSlide}
                        mode="workspace"
                    />
                )}
            </div>
        </div>
    );
}

export { Workspace };
