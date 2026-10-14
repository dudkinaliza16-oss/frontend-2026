import type {Presentation} from '../domain/types/presentation.js';
import {dispatch} from '../editor.js';
import {updatePresentationName} from '../domain/functions/presentation.js';

interface AppProps {
    presentation: Presentation;
}

function App({presentation}: AppProps) {
    return (
        <div>
            <h1
                onClick={() => dispatch(updatePresentationName, 'New title')}
                style={{cursor: 'pointer'}}
            >
                {presentation.name}
            </h1>
            <p>Слайдов: {presentation.slides.length}</p>
        </div>
    );
}

export {App};