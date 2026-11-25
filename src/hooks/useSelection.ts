import { useEffect, useState } from "react";
import React from 'react';
import { dispatch, getActiveSlideId} from "../modules/editor.ts";
import {removeSelectedObjectsModifier} from "../modules/modifiers.ts";

function useSelection() {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const activeSlideId = getActiveSlideId();

    useEffect(() => {
        setSelectedIds([]);
    }, [activeSlideId]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Delete" && selectedIds.length > 0) {
                dispatch(removeSelectedObjectsModifier, selectedIds);
                setSelectedIds([]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedIds]);

    const handleSlideClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget && event.button === 0) {
            setSelectedIds([]);
        }
    };

    const handlerSelect = (event: React.MouseEvent, id: string) => {
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        if (!event.shiftKey) {
            setSelectedIds([id]);
            return;
        }
        setSelectedIds((prevSelectedIds) => {
            const isAlreadySelected = prevSelectedIds.includes(id);
            if (isAlreadySelected) {
                return prevSelectedIds.filter((item: string) => item !== id);
            }
            return [...prevSelectedIds, id];
        });
    };

    return { selectedIds, handleSlideClick, handlerSelect };
}

export { useSelection };