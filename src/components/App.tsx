import type {Presentation} from '../domain/types/presentation.js';
import {Toolbar} from './Toolbar.js';
import {SlideList} from "./SlideList.js";
import {Workspace} from "./Workspace.js";
import "./base.css";
import styles from "./App.module.css"
interface AppProps {
    presentation: Presentation;
}

function App(props : AppProps) {
    return (
        <div className={styles.mainContainer}>
            <Toolbar presentation={props.presentation} />
            <div className={styles.editorField}>
                <SlideList presentation={props.presentation} />
                <Workspace presentation={props.presentation} />
            </div>
        </div>
    );
}

export {App};