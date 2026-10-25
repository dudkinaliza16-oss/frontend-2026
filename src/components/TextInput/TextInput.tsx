import * as React from "react";

type TextInputProps = {
    value: string;
    placeholder?: string;
    type?: 'text' | 'color' | 'number';
    onChange?: (value: string) => void;
    className?: string;
    style?: React.CSSProperties;
};

function TextInput(props: TextInputProps) {
    return (
        <input
            value={props.value}
            placeholder={props.placeholder}
            type={props.type}
            className={props.className}
            onChange={(e) => props.onChange(e.target.value)}
            style={props.style}
        />
    );
}

export {TextInput};