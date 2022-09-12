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
        return html`
        ${!this.isPrompting 
            ? this.titleTemplate 
            : this.promptTemplate} 
        `;
    }

    get titleTemplate() {
        return html` <button @click=${this._showPrompt}>${this.actionTitle}</button> `;
    }

    get promptTemplate() {
        return html`
            <div>${this.promptTitle}</div>
            <div class="buttons-wrapper" style="--fs:clamp(1rem, 1.3em, 24px);">
                <button @click=${this._onCancel}>✗</button>
                <button @click=${this._onAccept}>✓</button>
            </div>
        `;
    }

    _showPrompt(){
        this.isPrompting = true;
    }
    _showTitle(){
        this.isPrompting = false;
    }

    _onAccept(){
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
        }
        .buttons-wrapper > *:first-child{
            border-radius: var(--bt-radius, 0px) 0 0 var(--bt-radius, 0px);
        }
        .buttons-wrapper > *:last-child{
            border-radius: 0 var(--bt-radius, 0px) var(--bt-radius, 0px) 0;
        }

    `;
}
customElements.define("prompt-button", PromptButton);
