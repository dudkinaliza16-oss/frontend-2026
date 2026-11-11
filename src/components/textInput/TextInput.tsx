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
            onChange={(event) => props.onChange?.(event.target.value)}
            style={props.style}
        />
    );
}

export {TextInput};