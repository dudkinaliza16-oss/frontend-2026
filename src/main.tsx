import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './components/App.tsx'
import {addEditorChangeHandler, getPresentationState, setInitialState} from './editor.js';
import {createTestPresentation} from './data.js';

setInitialState(createTestPresentation());

const root = createRoot(document.getElementById('root')!);

function renderApp(): void {
    root.render(
        <StrictMode>
            <App presentation={getPresentationState()}/>
        </StrictMode>
    );
}

renderApp();
addEditorChangeHandler(renderApp);