// src/index.tsx

import { App } from './App/App';
import { appStore } from './App/Store/AppStore';

const root = document.getElementById('root') as HTMLElement;

if (!root) {
    throw new Error('The root element is not found!');
}

const app = new App();
root.innerHTML = app.render();

// Подписываемся на изменения
appStore.$state.subscribe(() => {
    root.innerHTML = app.render();
    app.addEvents();
});