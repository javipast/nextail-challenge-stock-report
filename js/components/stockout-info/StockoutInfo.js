import { LitElement, html, css } from "../../vendor/lit-core.min.js";
import { ProgressBar } from "../progress-bar/ProgressBar.js";

export class StockoutInfo extends LitElement {
    static properties = {
        rate: {type: Number, reflect: true},
        coverage: {type: Number, reflect: true},
    }

    constructor() {
        super();
    }

    render() {
        return html`
            ${this.rateTemplate}
            ${this.coverageTemplate}
        `;
    }

    get rateTemplate(){
        return html`
            <div class="rate">
                <div>
                    <span class="percentage">${this.rate.toFixed(1)}<sup>%</sup></span>
                    <span class="uppercase">stockout</span>
                </div>
                <progress-bar 
                    progress="${this.rate}" 
                    style="--bar-clr:var(--clr-success); --bar-bg-clr:var(--clr-dim);"
                />
            </div>
        `;
    }

    get coverageTemplate(){
        return html`
            <div class="coverage">
                <div class="coverage-label" style="--clr:var(--clr-success);">
                    ${this.coverageLabel}
                </div>
                <div class="uppercase">WH Coverage</div>
            </div>
        `;
    }

    get coverageLabel(){
        return this.coverage < 50 
            ? html`<div class="coverage-label" style="--clr:var(--clr-danger);">Very Low</div>` 
            : html`<div class="coverage-label" style="--clr:var(--clr-success);">Good</div>`
    }

    static styles = css`

        :host{
            --bar-height: 10px;
            --fs: .7rem;
            font-size: var(--fs);
        }
        
        .rate{
            padding-block: .5rem;
            border-block: 1px solid var(--clr-dim);
        }

        .percentage{
            font-size: 2em;
        }

        .percentage sup{
            font-size:.6em;
        }

        progress-bar{
            margin-top:.25rem;
        }

        .coverage{
            margin-top: .5rem;
            display: grid;
            justify-items: end;
        }
    
        .coverage-label{
            font-size:1.2em;
            font-weight: 600;
            color: var(--clr);
        }

        .uppercase{
            text-transform: uppercase;
        }

    `;
}
customElements.define("stockout-info", StockoutInfo);
