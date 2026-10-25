import type { SlideObject as SlideObjectType } from "../../domain/types/object.ts";
import styles from "./SlideObject.module.css";
import {TextInput} from "../TextInput/TextInput.js";

type SlideObjectProps = {
    object: SlideObjectType;
    mode: "thumbnail" | "workspace" | "overlay";
};

function SlideObject(props: SlideObjectProps) {
    const object = props.object;

    let modeClass = styles.overlayObject;
    if (props.mode === "thumbnail") {
        modeClass = styles.thumbnailObject;
    } else  if (props.mode === "workspace") {
        modeClass= styles.workspaceObject
    }
    if (object.type === "text") {
        return (
            <TextInput
                className={`${styles.textObject} ${modeClass}`}
                value={object.content}
                style={{
                    left: object.location.x,
                    top: object.location.y,
                    width: object.size.width,
                    height: object.size.height,
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
                className={`${styles.imageObject} ${modeClass}`}
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

export { SlideObject };
