//import type { Slide } from "../domain/types/slide.ts";
import { Button } from "./Button.tsx";
import styles from "./SlideProperties.module.css";
import buttonStyles from './Button.module.css';

//type SlidePropertiesProps = {
//    slide: Slide;
//};

function SlideProperties() {
    return (
        <div className={styles.properties}>

            <div className={styles.actions}>
                <Button
                    text="+ Текст"
                    className={buttonStyles.button}
                    onClick={() => console.log("add text")}
                />

                <Button
                    text="+ Изображение"
                    className={buttonStyles.button}
                    onClick={() => console.log("add image")}
                />

                <Button
                    text="Фон"
                    className={buttonStyles.button}
                    onClick={() => console.log("change background")}
                />
            </div>
        </div>
    );
}

export { SlideProperties };
