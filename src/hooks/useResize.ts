import {useRef, useState, useEffect} from "react";
import type {Point, Size} from "../domain/types/object.ts";

export type ResizeHandle = "TL" | "TR" | "BL" | "BR";

type ResizeEndPayload = {
    size: Size;
    position: Point;
};

function useResize(onResizeEnd: (payload: ResizeEndPayload) => void) {
    const [resizing, setResizing] = useState<boolean>(false);
    const [currentSize, setCurrentSize] = useState<Size>({width: 0, height: 0});
    const [currentPosition, setCurrentPosition] = useState<Point>({x: 0, y: 0});

    const activeHandleRef = useRef<ResizeHandle>("BR");
    const startPositionRef = useRef<Point>({x: 0, y: 0});
    const startSizeRef = useRef<Size>({width: 0, height: 0});
    const startObjectPosRef = useRef<Point>({x: 0, y: 0});

    const currentSizeRef = useRef<Size>({width: 0, height: 0});
    const currentPosRef = useRef<Point>({x: 0, y: 0});

    const handleResizeStart = (
        event: React.MouseEvent,
        handle: ResizeHandle,
        size: Size,
        position: Point
    ) => {
        event.preventDefault();
        startPositionRef.current = {x: event.clientX, y: event.clientY};
        startSizeRef.current = size;
        startObjectPosRef.current = position;
        activeHandleRef.current = handle;
        setCurrentSize(size);
        setCurrentPosition(position);
        currentSizeRef.current = size;
        currentPosRef.current = position;
        setResizing(true);
    };

    useEffect(() => {
        if (!resizing) {
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            const dx = event.clientX - startPositionRef.current.x;
            const dy = event.clientY - startPositionRef.current.y;
            const startSize = startSizeRef.current;
            const startPos = startObjectPosRef.current;

            let newWidth = startSize.width;
            let newHeight = startSize.height;
            let newX = startPos.x;
            let newY = startPos.y;

            switch (activeHandleRef.current) {
                case "BR":
                    newWidth = startSize.width + dx;
                    newHeight = startSize.height + dy;
                    break;
                case "BL":
                    newWidth = startSize.width - dx;
                    newHeight = startSize.height + dy;
                    newX = startPos.x + dx;
                    break;
                case "TR":
                    newWidth = startSize.width + dx;
                    newHeight = startSize.height - dy;
                    newY = startPos.y + dy;
                    break;
                case "TL":
                    newWidth = startSize.width - dx;
                    newHeight = startSize.height - dy;
                    newX = startPos.x + dx;
                    newY = startPos.y + dy;
                    break;
            }

            if (newWidth < 30) {
                if (activeHandleRef.current === "TL" || activeHandleRef.current === "BL") {
                    newX = startPos.x + (startSize.width - 30);
                }
                newWidth = 30;
            }

            if (newHeight < 30) {
                if (activeHandleRef.current === "TL" || activeHandleRef.current === "TR") {
                    newY = startPos.y + (startSize.height - 30);
                }
                newHeight = 30;
            }

            const nextSize = {width: newWidth, height: newHeight};
            const nextPos = {x: newX, y: newY};

            setCurrentSize(nextSize);
            setCurrentPosition(nextPos);
            currentSizeRef.current = nextSize;
            currentPosRef.current = nextPos;
        };

        const handleMouseUp = () => {
            setResizing(false);
            onResizeEnd({
                size: currentSizeRef.current,
                position: currentPosRef.current,
            });
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [resizing, onResizeEnd]);

    return {
        resizing,
        currentSize,
        currentPosition,
        handleResizeStart,
    };
}

export {useResize};