import type {SlideObject as SlideObjectType} from "../../domain/types/object.ts";import type {ResizeHandle} from "../../hooks/useResize.ts";
import styles from "./SlideObject.module.css";
import {EditableText} from "../editableText/EditableText.tsx";
import {updateTextObjectContentModifier} from "../../modules/modifiers.ts";
import {dispatch} from "../../modules/editor.ts";

type SlideObjectProps = {
    object: SlideObjectType;
    mode: "thumbnail" | "workspace" | "overlay";
    isSelected?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    onMouseDown?: (e: React.MouseEvent) => void;
    onResizeStart?: (e: React.MouseEvent, handle: ResizeHandle) => void;
};

function SlideObject(props: SlideObjectProps) {
    const object = props.object;

    let modeClass = styles.overlayObject;
    if (props.mode === "thumbnail") {
        modeClass = styles.thumbnailObject;
    } else if (props.mode === "workspace") {
        modeClass = styles.workspaceObject;
    }

    let selectionClass = "";
    if (props.isSelected) {
        selectionClass = styles.selected;
    }

    let textOnChange = undefined;
    if (props.mode === "workspace") {
        textOnChange = (newContent: string) => {
            dispatch(updateTextObjectContentModifier, {
                objectId: object.id,
                newContent,
            });
        };
    }

    const containerStyle = {
        left: `${object.location.x}px`,
        top: `${object.location.y}px`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
        transform: `rotate(${object.rotation}deg)`,
    };

    const renderHandles = () => {
        if (!props.isSelected) {
            return null;
        }
        return (
            <>
                <div
                    className={`${styles.handle} ${styles.handleTL}`}
                    onMouseDown={(event) => props.onResizeStart?.(event, "TL")}
                />
                <div
                    className={`${styles.handle} ${styles.handleTR}`}
                    onMouseDown={(event) => props.onResizeStart?.(event, "TR")}
                />
                <div
                    className={`${styles.handle} ${styles.handleBL}`}
                    onMouseDown={(event) => props.onResizeStart?.(event, "BL")}
                />
                <div
                    className={`${styles.handle} ${styles.handleBR}`}
                    onMouseDown={(event) => props.onResizeStart?.(event, "BR")}
                />
            </>
        );
    };

    if (object.type === "text") {
        const textStyle = {
            fontFamily: object.font.family,
            fontSize: `${object.font.size}px`,
            color: object.font.color,
        };

        return (
            <div
                style={containerStyle}
                className={`${styles.slideObjectContainer} ${modeClass} ${selectionClass}`}
            >
                <EditableText
                    onMouseDown={props.onMouseDown}
                    className={styles.textObject}
                    value={object.content}
                    onChange={textOnChange}
                    style={textStyle}
                />
                {renderHandles()}
            </div>
        );
    }

    if (object.type === "image") {
        const imageStyle = {
            opacity: object.opacity,
        };

        return (
            <div
                style={containerStyle}
                className={`${styles.slideObjectContainer} ${modeClass} ${selectionClass}`}
            >
                <img
                    onMouseDown={props.onMouseDown}
                    className={styles.imageObject}
                    src={object.imageUrl}
                    alt=""
                    style={imageStyle}
                />
                {renderHandles()}
            </div>
        );
    }

    return null;
}

export {SlideObject};