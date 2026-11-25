import type {Presentation} from "../../domain/types/presentation.ts";
import type {Slide} from "../../domain/types/slide.ts";
import {SlidePreview} from "../slidePreview/SlidePreview.tsx";
import styles from "./SlideList.module.css";
import {setActiveSlideId, getActiveSlideId, dispatch} from "../../modules/editor.ts";
import {
    addSlideModifier,
    duplicateSlideModifier,
    removeSlidesModifier,
} from "../../modules/modifiers.ts";
import {Button} from "../button/Button.tsx";
import {useSlideContextMenu} from "./hooks/useSlideContextMenu.ts";

type SlideListProps = {
    presentation: Presentation;
};

function SlideList(props: SlideListProps) {
    const slides: Slide[] = props.presentation.slides;
    const activeSlideId = getActiveSlideId();
    const {contextMenu, openContextMenu, closeContextMenu} = useSlideContextMenu();

    const handleAddSlide = (index: number) => {
        dispatch(addSlideModifier, {newIndex: index + 1});
        closeContextMenu();
    };

    const handleDuplicateSlide = (slideId: string) => {
        dispatch(duplicateSlideModifier, slideId);
        closeContextMenu();
    };

    const handleDeleteSlide = (slideId: string) => {
        dispatch(removeSlidesModifier, [slideId]);
        closeContextMenu();
    };

    return (
        <div className={styles.slideList}>
            {slides.map((slide, index) => {
                const isMenuOpen = contextMenu?.slideId === slide.id;

                return (
                    <div
                        key={slide.id}
                        className={`${styles.slideItem} ${
                            activeSlideId === slide.id ? styles.Active : ""
                        }`}
                        onContextMenu={(event) => {
                            event.preventDefault();
                            openContextMenu(slide.id, index);
                        }}
                    >
    <span className={styles.slideNumber}>
        {index + 1}
    </span>

                        <SlidePreview
                            slide={slide}
                            mode="thumbnail"
                            onSlideClick={() => {
                                setActiveSlideId(slide.id);
                            }}
                        />

                        {isMenuOpen && (
                            <div
                                className={styles.contextMenu}
                                onContextMenu={(event) => event.preventDefault()}
                            >
                                <Button
                                    text="Add slide"
                                    className={styles.menuButton}
                                    onClick={() => handleAddSlide(contextMenu.index)}
                                />
                                <Button
                                    text="Duplicate slide"
                                    className={styles.menuButton}
                                    onClick={() => handleDuplicateSlide(contextMenu.slideId)}
                                />
                                <Button
                                    text="Delete slide"
                                    className={`${styles.menuButton} ${styles.deleteButton}`}
                                    onClick={() => handleDeleteSlide(contextMenu.slideId)}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export {SlideList};