import {useState} from "react";
import styles from "./EditableText.module.css";

type EditableTextProps = {
    value: string;
    className?: string;
    style?: React.CSSProperties;
    onMouseDown?: (e: React.MouseEvent) => void;
    onChange?: (newValue: string) => void;
};

function EditableText(props: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div
            className={`${props.className} ${styles.editableText} ${isEditing ? styles.editing : ""}`}
            contentEditable={isEditing}
            onMouseDown={(event) => {
                if (!isEditing) {
                    props.onMouseDown?.(event);
                }
            }}
            onDoubleClick={() => {
                setIsEditing(true);
            }}
            onBlur={(event) => {
                setIsEditing(false);
                props.onChange?.(event.currentTarget.innerText);
            }}
            style={props.style}
        >
            {props.value}
        </div>
    );
}

export {EditableText};