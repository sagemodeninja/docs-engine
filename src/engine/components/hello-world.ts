import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('hello-world')
export class HelloWorld extends LitElement {
    public render() {
        return html`
            <h1>Hello World!</h1>
        `
    }
}