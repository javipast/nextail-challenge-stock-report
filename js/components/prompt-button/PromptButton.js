import { LitElement, html, css } from "../../vendor/lit-core.min.js";

export class PromptButton extends LitElement {
    static properties = {
        actionId: { type: String },
        actionTitle: { type: String },
        promptTitle: { type: String },
        isPrompting: { type: Boolean, state: true },
    };

    constructor() {
        super();
        this.actionTitle = 'Action title';
        this.promptTitle = 'Are you sure?';
        this.isPrompting = false;
    }

    render() {
        console.log(this.actionTitle);
        return html` ${!this.isPrompting ? this.titleTemplate : this.promptTemplate} `;
    }

    get titleTemplate() {
        return html` <button @click=${this.showPrompt}>${this.actionTitle}</button> `;
    }

    get promptTemplate() {
        return html`
            <div>${this.promptTitle}</div>
            <div class="buttons-wrapper" style="--fs:clamp(1rem, 1.4em, 24px);">
                <button @click=${this._onAccept}>✓</button>
                <button @click=${this._onCancel}>⨯</button>
            </div>
        `;
    }

    showPrompt(){
        this.isPrompting = true;
    }
    showTitle(){
        this.isPrompting = false;
    }

    _onAccept(e){
        this.dispatchEvent(
            new CustomEvent("prompt-accepted", {
                detail: { actionId: this.actionId },
                bubbles: true,
                composed: true,
            })
        );
        this.isPrompting = false;
    }
    _onCancel(e){
        this.isPrompting = false;
    }

    static styles = css`
        :host {
            
        }

        *{
            color: var(--clr, #000);
        }

        button{
            font-family: inherit;
            color: var(--bt-clr, var(--clr));
            border: var(--bt-border, 0);
            padding: var(--bt-pad, 0.5em 0.8em);
            border-radius: var(--bt-radius, 0px);
            background: var(--bt-clr-bg, #aaa);
            font-size: var(--bt-fs, var(--fs));
            cursor: pointer;
            min-width: 3.5rem;
        }

        .buttons-wrapper{
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            gap: 1em;
        }

    `;
}
customElements.define("prompt-button", PromptButton);
