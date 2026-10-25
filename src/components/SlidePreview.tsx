import type {Slide} from "../domain/types/slide.ts";
import {SlideObject} from "./SlideObject.tsx";
import styles from "./SlidePreview.module.css";
import {getBackgroundStyle} from "../domain/functions/utils.ts"

type SlidePreviewProps = {
    slide: Slide;
    mode: "thumbnail" | "workspace" | "overlay";
    onClick?: () => void;
};

function SlidePreview(props: SlidePreviewProps) {
    const slideObjects = props.slide.objects.map(object => (
        <SlideObject
            key={object.id}
            object={object}
            mode={props.mode}

        />
    ));

    let contentClass = styles.overlayContent;
    if (props.mode === "thumbnail") {
        contentClass = styles.thumbnailContent;
    } else  if (props.mode === "workspace") {
        contentClass = styles.workspaceContent
    }

    let previewClass = styles.overlay;
    if (props.mode === "thumbnail") {
        previewClass = styles.thumbnail;
    } else  if (props.mode === "workspace") {
        previewClass = styles.workspace
    }

    const backgroundStyle = getBackgroundStyle(props.slide.background);

    return (
        <div className={previewClass}
             style={backgroundStyle}
             onClick={props.onClick}>
            <div className={contentClass}>
                {slideObjects}
            </div>
        </div>
    );
}

export {SlidePreview};
