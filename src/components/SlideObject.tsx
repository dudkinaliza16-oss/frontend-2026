import type { SlideObject as SlideObjectType } from "../domain/types/object.ts";
import styles from "./SlideObject.module.css";

type SlideObjectProps = {
    object: SlideObjectType;
    mode: "thumbnail" | "workspace";
};

function SlideObject(props: SlideObjectProps) {
    const object = props.object;
    const modeClass = props.mode === "thumbnail"
        ? styles.thumbnailObject
        : styles.workspaceObject;

    if (object.type === "text") {
        return (
            <textarea
                className={`${styles.textObject} ${modeClass}`}
                value={object.content}
                readOnly
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
