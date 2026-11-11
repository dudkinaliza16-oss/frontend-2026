import type {Presentation} from "../../domain/types/presentation.ts";
import type {Slide} from "../../domain/types/slide.ts";
import {SlidePreview} from "../slidePreview/SlidePreview.tsx";
import styles from "./SlideList.module.css";
import {setActiveSlideId, getActiveSlideId, dispatch} from "../../modules/editor.ts";
import {removeSlidesModifier} from "../../modules/modifiers.ts";

type SlideListProps = {
    presentation: Presentation;
};

function SlideList(props: SlideListProps) {
    const slides: Slide[] = props.presentation.slides;
    const slideList = slides.map((slide, index) => (
        <div key={slide.id}
             className={`${styles.slideItem} 
             ${getActiveSlideId() === slide.id
                 ? styles.Active
                 : ''}`}
             onContextMenu={() => {
                 dispatch(removeSlidesModifier, [slide.id]);
             }}>
            <span className={styles.slideNumber}>
                {index + 1}
            </span>
            <SlidePreview
                slide={slide}
                mode="thumbnail"
                onSlideClick={() => {
                    setActiveSlideId(slide.id);
                }
                }
            />
        </div>
    ));
    return (
        <div className={styles.slideList}>
            {slideList}
        </div>
    );
}

export {
    SlideList
};
