import * as React from "react";

type TextInputProps = {
    value: string;
    placeholder?: string;
    type?: 'text' | 'color' | 'number';
    onChange?: (value: string) => void;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    style?: React.CSSProperties;
    onMouseDown?: (e: React.MouseEvent) => void;
};

function TextInput(props: TextInputProps) {
    return (
        <input
            value={props.value}
            placeholder={props.placeholder}
            type={props.type}
            className={props.className}
            onChange={(event) => props.onChange?.(event.target.value)}
            style={props.style}
            onMouseDown={(event) => {
                props.onMouseDown?.(event);
                props.onClick?.(event);
            }}
        />
    );
}

export {TextInput};