import { Component } from 'solid-js';
import { render } from 'solid-js/web';

const App: Component = () => {
    return (
        <p class="text-center">Hello, world!</p>
    );
};


render(() => <App />, document.getElementById('root') as HTMLElement);
