import type { Slide } from "../domain/types/slide.ts";
import { SlideObject } from "./SlideObject.tsx";
import styles from "./SlidePreview.module.css";

type SlidePreviewProps = {
    slide: Slide;
    mode: "thumbnail" | "workspace";
};

function SlidePreview(props: SlidePreviewProps) {
    const slideObjects = props.slide.objects.map(object => (
        <SlideObject
            key={object.id}
            object={object}
            mode={props.mode}
        />
    ));

    const contentClass = props.mode === "thumbnail"
        ? styles.thumbnailContent
        : styles.workspaceContent;

    const previewClass = props.mode === "thumbnail"
        ? styles.thumbnail
        : styles.workspace;

    return (
        <div className={previewClass}>
            <div className={contentClass}
            >
                {slideObjects}
            </div>
        </div>
    );
}

export { SlidePreview };
