import type {Presentation} from './domain/types/presentation.js';
import {addSlide, setSlideBackgroundColor} from './domain/functions/slide.js'
import {createPresentation} from './domain/functions/presentation.js';
import {addSlideObject} from './domain/functions/object.js';
import {generateId} from "./domain/functions/utils.ts";
import type {SlideObject} from "./domain/types/object.ts";

function generateTextObject(id: string,
                            content: string,
                            x: number, y: number,
                            width: number, height: number,
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

function createTestPresentation(): Presentation {
    let presentation = createPresentation(generateId(), 'Тестовая презентация', generateId());

    let slide1 = presentation.slides[0];
    slide1 = setSlideBackgroundColor(slide1, '#f0f0f0');
    slide1 = addSlideObject(slide1, generateTextObject(generateId(),
        'Добро пожаловать!', 50, 50, 400, 60, 0, 'Arial', 32, '#333333'));
    slide1 = addSlideObject(slide1, generateTextObject(generateId(),
        'Лабораторная работа #2', 50, 120, 400, 40, 0, 'Arial', 20, '#666666'));
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

    slide3 = setSlideBackgroundColor(slide3, '#e8f5e9');
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
};
