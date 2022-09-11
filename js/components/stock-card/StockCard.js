import { LitElement, html, css } from "../../vendor/lit-core.min.js";
import { StockoutInfo } from "../stockout-info/StockoutInfo.js";
import { PromptButton } from "../prompt-button/PromptButton.js";


export class StockCard extends LitElement {
    // controller = new StockCardController(this);

    assetsPath = "images/";
    imageExt = ".jpg";

    static properties = {
        code: { type: String, reflect: true },
        title: { type: String, reflect: true },
        price: { type: Number, reflect: true },
        rate: { type: Number, reflect: true },
        rank: { type: Number },
        coverage: { type: Number, reflect: true },
    };

    constructor() {
        super();
        this.addEventListener('prompt-accepted', (e) => {
            this._removeSelf();
        });
    }

    

    render() {
        return html`
            <div class="stock-card">
                <div class="header">
                    <img src="${this.assetsPath + this.code + this.imageExt}" class="figure" />
                    <div class="rank">${this.rank}</div>

                    <div class="prompt-wrapper">
                        <prompt-button
                            .actionTitle=${'Mark Complete'}
                            .promptTitle=${'Are you sure you want to mark this product as complete?'}
                        />
                    </div>
                </div>
                <div class="info">
                    <div class="id">${this.code}</div>
                    <div class="title clr-hl">${this.title}</div>
                    <div class="price">${this.price.toFixed(2)}€</div>
                    <!-- Chart -->
    
                    <stockout-info .rate="${this.rate}" .coverage="${this.coverage}" />
                </div>
            </div>
        `;
    }

    _removeSelf() {
        this.dispatchEvent(
            new CustomEvent("card-removed", {
                detail: { code: this.code },
                bubbles: true,
                composed: true,
            })
        );
    }

    static styles = css`
        :host {
            --bg: var(--clr-bg-hl);
            --border-radius: 0.3rem;

            max-width: var(--stock-card-max-w, 20rem);
            min-width: var(--stock-card-min-w, 10rem);
            background: var(--bg);
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: 0 0.25rem 1rem 0rem var(--clr-dim);
            justify-self: center;
        }

        :host * {
            font-size: var(--fs, 1rem);
            font-weight: var(--fw, 500);
            color: var(--clr);
        }

        .stock-card:hover .figure{
            opacity: .1;
        }

        .stock-card:hover .prompt-wrapper{
            opacity:1;
            pointer-events: all;
        }

        .header, .prompt-wrapper{
            width: 100%;
            aspect-ratio: 1 / 1.3;
            position:relative;
        }

        .prompt-wrapper{
            --fs: 0.8rem;
            --clr: var(--clr-hl);
            --bt-clr: #eee;
            --bt-clr-bg: #000A;
            --bt-radius: 3rem;
            --bt-pad: .7em 1.3em;
            --bt-border: 1px solid;

            opacity:0;
            pointer-events: all;
            display: grid;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            position: absolute;
            width: 100%;
            padding: var(--base-padding);
            text-align:center;

            transition: opacity .25s ease-in-out;
        }

        .rank {
            --fs: 0.75rem;
            --clr: var(--clr-bg-hl);
            --fw: 600;

            position: absolute;
            border-radius: 0.2rem;
            margin: 0.5rem;
            background: var(--clr-text);
            display: flex;
            padding: 0.2em 0.5em;
        }

        .figure {
            object-fit: cover;
            object-position: 50% 20%;
            position: absolute;
            width:100%;
            height:100%;
            top:0;
            left:0;

            transition: opacity .25s ease-in-out;
        }

        .info {
            padding: var(--pad, 1rem);
        }


        .id {
            --fs: 0.8rem;
            margin-bottom: 0.1rem;
        }
        .title {
            --fw: 600;
            --clr: var(--clr-text-hl);
            text-transform: uppercase;
            margin-bottom: 1.5rem;
        }
        .price {
            --fw: 600;
            margin-bottom: 1.5rem;
        }
    `;
}
customElements.define("stock-card", StockCard);
