import type {SlideObject as SlideObjectType} from "../../domain/types/object.ts";
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
};

function SlideObject(props: SlideObjectProps) {
    const object = props.object;
    let modeClass = styles.overlayObject;
    if (props.mode === "thumbnail") {
        modeClass = styles.thumbnailObject;
    } else if (props.mode === "workspace") {
        modeClass = styles.workspaceObject
    }
    const selectionClass =
        props.isSelected
            ? styles.selected
            : "";
    if (object.type === "text") {
        return (
            <EditableText
                onMouseDown={props.onMouseDown}
                className={`${styles.textObject} ${modeClass} ${selectionClass}`}
                value={object.content}
                onChange={
                    props.mode === "workspace"
                        ? (newContent) =>
                            dispatch(updateTextObjectContentModifier, {
                                objectId: object.id,
                                newContent,
                            })
                        : undefined
                }
                style={{
                    left: object.location.x,
                    top: object.location.y,
                    width: object.size.width,
                    transform: `rotate(${object.rotation}deg)`,
                    fontFamily: object.font.family,
                    fontSize: object.font.size,
                    color: object.font.color,
                }}
            />
        );
    }

    if (object.type === "image") {
        return (
            <img
                onMouseDown={props.onMouseDown}
                className={`${styles.imageObject} ${modeClass} ${selectionClass}`}
                src={object.imageUrl}
                alt=""
                style={{
                    left: object.location.x,
                    top: object.location.y,
                    width: object.size.width,
                    height: object.size.height,
                    transform: `rotate(${object.rotation}deg)`,
                    opacity: object.opacity,
                }}
            />
        );
    }

    return null;
}

export {SlideObject};
