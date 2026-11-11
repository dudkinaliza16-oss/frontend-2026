import type {Presentation} from './domain/types/presentation.js';
import {addSlide, setSlideBackgroundColor, setSlideBackgroundImage} from './domain/functions/slide.js'
import {createPresentation} from './domain/functions/presentation.js';
import {addSlideObject} from './domain/functions/object.js';
import {generateId} from "./domain/functions/utils.ts";
import type {SlideObject} from "./domain/types/object.ts";

function generateTextObject(id: string,
                            content: string,
                            x: number,
                            y: number,
                            width: number,
                            height: number,
                            rotation: number,
                            family: string,
                            size: number,
                            color: string
): SlideObject {
    return {
        id,
        type: "text",
        content,
        location: {x, y},
        size: {width, height},
        rotation,
        font: {
            family,
            size,
            color,
        }
    }
}
function generateImageObject(id: string,
                             imageUrl: string,
                             x: number,
                             y: number,
                             width: number,
                             height: number,
                             rotation: number,
                             opacity: number = 1
): SlideObject {
    return {
        id,
        type: "image",
        imageUrl,
        location: {x, y},
        size: {width, height},
        rotation,
        opacity,
    }
}

function createTestPresentation(): Presentation {
    let presentation = createPresentation(generateId(), 'Тестовая презентация', generateId());

    let slide1 = presentation.slides[0];
    slide1 = setSlideBackgroundColor(slide1, '#f0f0f0');
    slide1 = addSlideObject(slide1, generateTextObject(generateId(),
        'Добро пожаловать!', 50, 50, 400, 60, 0, 'Arial', 32, '#333333'));
    slide1 = addSlideObject(slide1, generateTextObject(generateId(),
        'Лабораторная работа #2', 50, 120, 400, 40, 0, 'Arial', 20, '#666666'));

    slide1 = addSlideObject(slide1, generateImageObject(
        generateId(),
        'https://static.mk.ru/upload/entities/2026/02/18/19/articlesImages/image/a4/99/31/af/05768fe712a79cc7755d46e011ee745e.jpg',
        500, 50, 200, 200, 0, 1
    ));

    presentation = {
        ...presentation,
        slides: [...presentation.slides.slice(0, presentation.slides.length-1), slide1],
    };

    presentation = addSlide(presentation, generateId());
    let slide2 = presentation.slides[presentation.slides.length - 1];

    slide2 = setSlideBackgroundColor(slide2, '#ffffff');
    slide2 = addSlideObject(
        slide2,
        generateTextObject(generateId(), 'Список задач:', 50, 50, 300, 40, 0, 'Arial', 24, '#000000')
    );
    slide2 = addSlideObject(
        slide2,
        generateTextObject(generateId(), '1. Разработать интерфейс', 50, 100, 300, 30, 0, 'Arial', 18, '#333333')
    );
    slide2 = addSlideObject(
        slide2,
        generateTextObject(generateId(), '2. Добавить интерактивность', 50, 140, 300, 30, 0, 'Arial', 18, '#333333')
    );
    slide2 = addSlideObject(
        slide2,
        generateTextObject(generateId(), '3. Выделить общие компоненты', 50, 180, 300, 30, 0, 'Arial', 18, '#333333')
    );

    presentation = {
        ...presentation,
        slides: [...presentation.slides.slice(0, presentation.slides.length-1), slide2],
    };

    presentation = addSlide(presentation, generateId());
    let slide3 = presentation.slides[presentation.slides.length - 1];

    slide3 = setSlideBackgroundImage(slide3, 'https://yt3.googleusercontent.com/ytc/AIdro_n3Tf5YiQ-eVjNm0DPlKiAWtnaXUWSnLA03AcYPaqXwycU=s900-c-k-c0x00ffffff-no-rj');
    slide3 = addSlideObject(slide3, generateTextObject(generateId(),'Итоги работы:', 50, 50, 300, 40, 0, 'Arial', 24, '#2e7d32'));
    slide3 = addSlideObject(slide3, generateTextObject(generateId(),'Готово!', 50, 120, 200, 60, 0, 'Arial', 36, '#4caf50'));

    presentation = {
        ...presentation,
        slides: [...presentation.slides.slice(0, presentation.slides.length-1), slide3],
    };

    return presentation;
}

export {
    createTestPresentation,
}