import { useState, useRef, useEffect } from "react";
import type { Slide } from "../../domain/types/slide.js";
import { SlideObject } from "../slideObject/SlideObject.js";
import styles from "./SlidePreview.module.css";
import { getBackgroundStyle } from "../../domain/functions/utils.js";
import { useDragAndDrop } from "../../hooks/useDragAndDrop.ts";
import { useResize, type ResizeHandle } from "../../hooks/useResize.ts";
import { dispatch } from "../../modules/editor.ts";
import { moveSlideObjectModifier, resizeSlideObjectModifier } from "../../modules/modifiers.ts";

type SlidePreviewProps = {
    slide: Slide;
    mode: "thumbnail" | "workspace" | "overlay";
    selectedIds?: string[];
    onObjectClick?: (event: React.MouseEvent, objectId: string) => void;
    onSlideClick?: (event: React.MouseEvent) => void;
};

function SlidePreview(props: SlidePreviewProps) {
    const selectedIds = props.selectedIds ?? [];
    const [resizingObjectId, setResizingObjectId] = useState<string | null>(null);

    const selectedIdsRef = useRef<string[]>(selectedIds);
    const slideObjectsRef = useRef(props.slide.objects);

    useEffect(() => {
        selectedIdsRef.current = selectedIds;
    }, [selectedIds]);

    useEffect(() => {
        slideObjectsRef.current = props.slide.objects;
    }, [props.slide.objects]);

    const { resizing, currentSize, currentPosition, handleResizeStart } = useResize((finalPayload) => {
        if (!resizingObjectId) {
            return;
        }
        dispatch(resizeSlideObjectModifier, {
            objectId: resizingObjectId,
            newSize: finalPayload.size,
            newLocation: finalPayload.position,
        });
        setResizingObjectId(null);
    });

    const { dragging, offset, handleMouseDown } = useDragAndDrop((delta) => {
        if (delta.x === 0 && delta.y === 0) {
            return;
        }
        const currentSelectedIds = selectedIdsRef.current;
        const currentObjects = slideObjectsRef.current;

        currentSelectedIds.forEach((id) => {
            const obj = currentObjects.find((object) => object.id === id);
            if (!obj) return;
            dispatch(moveSlideObjectModifier, {
                objectId: id,
                newLocation: {
                    x: obj.location.x + delta.x,
                    y: obj.location.y + delta.y,
                },
            });
        });
    });

    const slideObjects = props.slide.objects.map((object) => {
        const isSelected = selectedIds.includes(object.id);
        const isDragging = dragging && isSelected;
        const isResizing = resizing && resizingObjectId === object.id;

        let currentX = object.location.x;
        let currentY = object.location.y;
        let currentWidth = object.size.width;
        let currentHeight = object.size.height;

        if (isDragging) {
            currentX += offset.x;
            currentY += offset.y;
        }
        if (isResizing) {
            currentX = currentPosition.x;
            currentY = currentPosition.y;
            currentWidth = currentSize.width;
            currentHeight = currentSize.height;
        }

        return (
            <SlideObject
                key={object.id}
                object={{
                    ...object,
                    location: { x: currentX, y: currentY },
                    size: { width: currentWidth, height: currentHeight },
                }}
                mode={props.mode}
                isSelected={isSelected || isDragging || isResizing}
                onMouseDown={(event) => {
                    if (props.mode === "thumbnail") {
                        return;
                    }
                    const hasModifierKey = event.shiftKey || event.ctrlKey || event.metaKey;
                    const alreadyInGroup = isSelected && selectedIds.length > 1;

                    if (!alreadyInGroup || hasModifierKey) {
                        props.onObjectClick?.(event, object.id);
                    }
                    handleMouseDown(event);
                }}
                onResizeStart={(event, handle: ResizeHandle) => {
                    setResizingObjectId(object.id);
                    handleResizeStart(event, handle, object.size, object.location);
                }}
            />
        );
    });

    let contentClass = styles.overlayContent;
    if (props.mode === "thumbnail") {
        contentClass = styles.thumbnailContent;
    } else if (props.mode === "workspace") {
        contentClass = styles.workspaceContent;
    }

    let previewClass = styles.overlay;
    if (props.mode === "thumbnail") {
        previewClass = styles.thumbnail;
    } else if (props.mode === "workspace") {
        previewClass = styles.workspace;
    }

    const backgroundStyle = getBackgroundStyle(props.slide.background);

    return (
        <div
            className={previewClass}
            style={{ ...backgroundStyle, userSelect: "none" }}
            onClick={(event) => {
                if (props.mode === "thumbnail") {
                    props.onSlideClick?.(event);
                    return;
                }
                if (event.target === event.currentTarget) {
                    props.onSlideClick?.(event);
                }
            }}
        >
            <div className={contentClass}>
                {slideObjects}
            </div>
        </div>
    );
}

export { SlidePreview };