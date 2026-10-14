import {createRoot} from 'react-dom/client';
import {App} from './components/App.js';
import {addEditorChangeHandler, getState, setInitialState} from './editor.js';
import {createTestPresentation} from './data.js';

setInitialState(createTestPresentation());

const root = createRoot(document.getElementById('root')!);

function renderApp(): void {
    root.render(<App presentation={getState()}/>);
}

renderApp();
addEditorChangeHandler(renderApp);