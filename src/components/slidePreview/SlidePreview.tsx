import type {Slide} from "../../domain/types/slide.js";
import {SlideObject} from "../slideObject/SlideObject.js";
import styles from "./SlidePreview.module.css";
import {getBackgroundStyle} from "../../domain/functions/utils.js"
import {useDragAndDrop} from "../../hooks/useDragAndDrop.ts";
import {dispatch} from "../../modules/editor.ts";
import {moveSlideObjectModifier} from "../../modules/modifiers.ts";

type SlidePreviewProps = {
    slide: Slide;
    mode: "thumbnail" | "workspace" | "overlay";
    selectedIds?: string[];
    onObjectClick?: (event: React.MouseEvent, objectId: string) => void;
    onSlideClick?: (event: React.MouseEvent) => void;
}

function SlidePreview(props: SlidePreviewProps) {
    const selectedIds = props.selectedIds ?? [];
    const {dragging, offset, handleMouseDown} = useDragAndDrop((delta) => {
        if (delta.x === 0 && delta.y === 0) {
            return;
        }

        selectedIds.forEach((id) => {
            const obj = props.slide.objects.find(object => object.id === id);
            if (!obj) return;
            dispatch(moveSlideObjectModifier, {
                objectId: id,
                newLocation: {
                    x: obj.location.x + delta.x,
                    y: obj.location.y + delta.y,
                }
            });
        });
    });

    const slideObjects = props.slide.objects.map(object => {
        const isSelected = selectedIds.includes(object.id);
        const isDraggingThis = dragging && isSelected;

        const currentX = object.location.x + (isDraggingThis ? offset.x : 0);
        const currentY = object.location.y + (isDraggingThis ? offset.y : 0);

        return (
            <SlideObject
                key={object.id}
                object={{
                    ...object,
                    location: { x: currentX, y: currentY }
                }}
                mode={props.mode}
                isSelected={isSelected || isDraggingThis}
                onMouseDown={(event) => {
                    if (props.mode === "thumbnail") return;

                    if (!isSelected) {
                        props.onObjectClick?.(event, object.id);
                    }
                    handleMouseDown(event);
                }}
            />
        );
    });

    const contentClass = {
        thumbnail: styles.thumbnailContent,
        workspace: styles.workspaceContent,
        overlay: styles.overlayContent,
    }[props.mode];

    const previewClass = {
        thumbnail: styles.thumbnail,
        workspace: styles.workspace,
        overlay: styles.overlay,
    }[props.mode];

    const backgroundStyle = getBackgroundStyle(props.slide.background);
    return (
        <div className={previewClass}
             style={{
                 ...backgroundStyle,
                 userSelect: 'none'
             }}
             onClick={(event) => {
                 if (props.mode === "thumbnail") {
                     props.onSlideClick?.(event);
                     return;
                 }
                 if (event.target === event.currentTarget) {
                     props.onSlideClick?.(event);
                 }
             }}>
            <div className={contentClass}>
                {slideObjects}
            </div>
        </div>
    );
}

export {SlidePreview};