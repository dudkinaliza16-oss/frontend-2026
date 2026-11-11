import React, { useRef, useState, useEffect } from "react";
import type { Point } from "../domain/types/object.ts";

function useDragAndDrop(onDrop: (delta: Point) => void) {
    const [dragging, setDragging] = useState<boolean>(false);
    const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
    const startPositionRef = useRef<Point>({ x: 0, y: 0 });
    const handleMouseDown = (event: React.MouseEvent) => {
        if (event.button === 0) {
            event.preventDefault();
            startPositionRef.current = { x: event.clientX, y: event.clientY };
            setDragging(true);
        }
    };
    useEffect(() => {
        if (!dragging) {
            return;
        }
        const handleMouseMove = (event: MouseEvent) => {
            const dx = event.clientX - startPositionRef.current.x;
            const dy = event.clientY - startPositionRef.current.y;
            setOffset({ x: dx, y: dy });
        };
        const handleMouseUp = (event: MouseEvent) => {
            const dx = event.clientX - startPositionRef.current.x;
            const dy = event.clientY - startPositionRef.current.y;
            if (dx !== 0 || dy !== 0) {
                onDrop({ x: dx, y: dy });
            }
            setDragging(false);
            setOffset({ x: 0, y: 0 });
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp)
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, onDrop]);

    return {
        dragging,
        offset,
        handleMouseDown,
    };
}

export { useDragAndDrop };