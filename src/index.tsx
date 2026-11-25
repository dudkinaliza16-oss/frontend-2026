import { createRoot } from 'react-dom/client';
import { App } from './components/app/App.js';
import { addEditorChangeHandler } from './modules/editor.js';
import { createTestPresentation } from './data.ts';
import { setInitialState } from './modules/editor.js';

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