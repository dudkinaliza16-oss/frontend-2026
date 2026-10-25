import type {Presentation} from "../domain/types/presentation.ts";
import type {Slide} from "../domain/types/slide.ts";
import {SlidePreview} from "./SlidePreview.tsx";
import styles from "./SlideList.module.css";
import {setActiveSlideId} from "../editor.ts";

type SlideListProps = {
    presentation: Presentation;
};

function SlideList(props: SlideListProps) {
    const slides: Slide[] = props.presentation.slides;
    const slideList = slides.map((slide, index) => (
        <div key={slide.id}
             className={styles.slideItem}>
            <span className={styles.slideNumber}>
                {index + 1}
            </span>
            <SlidePreview
                slide={slide}
                mode="thumbnail"
                onClick={() => {
                    setActiveSlideId(slide.id);
                }}
            />
        </div>
    ));

    return (
        <div className={styles.slideList}>
            {slideList}
        </div>
    );
}

export {SlideList};
