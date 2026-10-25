import {createRoot} from 'react-dom/client';
import {App} from './components/App/App.js';
import {addEditorChangeHandler, setInitialState} from './editor.js';
import {createTestPresentation} from './data.js';

setInitialState(createTestPresentation());

const root = createRoot(document.getElementById('root')!);

function renderApp(): void {
    root.render(<App/>);
}

renderApp();
addEditorChangeHandler(renderApp);