type ButtonProps = {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}
function Button(props: ButtonProps) {
    return (
        <button className={props.className}
                onClick={props.onClick}
                disabled={props.disabled}>
            {props.text}

        </button>
    )
}
export {
    Button,
}