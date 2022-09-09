import { LitElement, html, css } from "../../vendor/lit-core.min.js";

export default class ProgressBar extends LitElement {
    static properties = {
        progress: {type: Number, reflect: true},
    }

    static styles = css`

        :host{
            --bar-height: 10px;
            --bar-clr: var(--clr-primary, #000);
            --bar-bg-clr: #aaa;
        }
        .bar{
            position: relative;
            width: 100%;
            display: block;
            height: var(--bar-height);
            border-radius: var(--bar-height);
            background-color: var(--bar-bg-clr);
            overflow: hidden;
        }

        .bar::after{
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            display: block;
            width: var(--bar-width);
            height: 100%;
            border-radius: var(--bar-height);
            background-color: var(--bar-clr);
        }
    `;

    constructor() {
        super();
        this.progress = 0;
    }

    render() {
        return html`
            <div class="bar" style="--bar-width:${this.progress.toFixed(0)}%"></div>
        `;
    }
}
customElements.define("progress-bar", ProgressBar);
