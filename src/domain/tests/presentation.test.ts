import { describe, it, expect } from 'vitest';
import {createPresentation, updatePresentationName, savePresentation, loadPresentation} from "../functions/presentation.ts";
import {generateId} from "../functions/utils.ts";
describe('createPresentation', () => {
    it('should create a presentation with default slide', () => {
        const presentationId = generateId();
        const presentation = createPresentation(presentationId, 'My Presentation', generateId());
        expect(presentation.name).toBe('My Presentation');
        expect(presentation.slides.length).toBe(1);
    });
});
describe ( 'updatePresentationName', () => {
    it('should update presentation name', () => {
        const presentation = createPresentation(generateId(), 'My Presentation', generateId());
        const updatedPresentation = updatePresentationName(presentation, 'New Presentation Name');
        const expectedPresentation = {
            ...presentation,
            name: 'New Presentation Name',
        }
        expect(updatedPresentation).toEqual(expectedPresentation);
    })
})

describe('savePresentation / loadPresentation', () => {
    it('should save presentation to JSON string and restore it back correctly', () => {
        const originalPresentation = createPresentation(generateId(), 'Serializable Presentation', generateId());
        const serialized = savePresentation(originalPresentation);
        const deserialized = loadPresentation(serialized);
        expect(deserialized).toEqual(originalPresentation);
    });
})

