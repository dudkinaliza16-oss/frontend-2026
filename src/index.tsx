import { createRoot } from 'react-dom/client';
import { App } from './components/app/App.js';
import { addEditorChangeHandler } from './modules/editor.ts';
import { createTestPresentation } from './data.js';
import { setInitialState } from './modules/editor.ts';

const initialData = createTestPresentation();
setInitialState(initialData);

const root = createRoot(document.getElementById('root')!);

function renderApp(): void {
    root.render(<App />);
}

renderApp();

addEditorChangeHandler(() => {
    renderApp();
});