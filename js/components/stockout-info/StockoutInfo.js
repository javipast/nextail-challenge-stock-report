import { LitElement, html, css } from "../../vendor/lit-core.min.js";
import ProgressBar from "../progress-bar/ProgressBar.js";

export default class StockoutInfo extends LitElement {
    static properties = {
        rate: {type: Number, reflect: true},
    }

    static styles = css`

        :host{
            --bar-height: 10px;
            --fs: .7rem;
            font-size: var(--fs);
        }
        
        .section{
            padding-block: .5rem;
            border-block: 1px solid var(--clr-dim);
        }

        .percentage{
            font-size: 2em;
            font-weight: 600;
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

    constructor() {
        super();
        this.rate = 0.0;
    }

    render() {
        return html`
            <div class="section flex flex-column">
                <div>
                    <span class="percentage">${this.rate.toFixed(1)}<sup>%</sup></span>
                    <span class="uppercase clr-dim">stockout</span>
                </div>
                <progress-bar 
                    progress="${this.rate}" 
                    style="--bar-clr:${this.statusColor}; --bar-bg-clr:var(--clr-dim);"
                />
            </div>
            <div class="coverage">
                <div class="coverage-label" style="--clr:${this.statusColor}">
                    ${this.coverageLabel}
                </div>
                <div class="uppercase clr-dim">WH Coverage</div>
            </div>
            
        `;
    }

    get coverageLabel(){
        return this.rate < 50 
            ? html`<div class="coverage-label" style="--clr:var(--clr-danger);">Very Low</div>` 
            : html`<div class="coverage-label" style="--clr:var(--clr-success);">Good</div>`
    }

    get statusColor(){
        return this.rate < 50
            ? 'var(--clr-danger)'
            : 'var(--clr-success)'
    }


}
customElements.define("stockout-info", StockoutInfo);