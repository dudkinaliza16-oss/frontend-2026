import type {Presentation} from "../domain/types/presentation.ts";
import {SlidePreview} from "./SlidePreview.tsx";
import {Button} from "./Button.tsx";
import {getActiveSlideState} from "../editor.ts";
import styles from "./PreviewOverlay.module.css";

type PreviewOverlayProps = {
    presentation: Presentation;
    onClose: () => void;
}

function PreviewOverlay(props: PreviewOverlayProps) {
    const slides = props.presentation.slides;
    const activeSlideId = getActiveSlideState();

    const currentIndex = slides.findIndex(slide => slide.id === activeSlideId);
    const safeIndex = currentIndex !== -1
        ? currentIndex
        : 0;

    const currentSlide = slides[safeIndex] || slides[0];

    const isFirst = safeIndex === 0;
    const isLast = safeIndex === slides.length - 1;
    return (
        <>
            {!isFirst &&
                (<Button text={""}
                    onClick={() => {
                        console.log("Назад");

                    }}
                    className={`${styles.overlayButton} ${styles.left}`}
            />)}
            {!isLast &&
                (<Button text={""}
                    onClick={() => {
                        console.log("");
                    }}
                    className={`${styles.overlayButton} ${styles.right}`}
            />)}
            <Button text={"Закрыть"}
                    onClick={() => {props.onClose()
                    }}
                    className={styles.close}
            />
            <div className={styles.overlayField}>
                <SlidePreview slide={currentSlide}
                              mode={"overlay"}
                />
            </div>
       </>
    )
}

export {PreviewOverlay}