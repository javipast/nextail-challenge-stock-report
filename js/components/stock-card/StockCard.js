import { LitElement, html, css } from "../../vendor/lit-core.min.js";
import { StockoutInfo } from "../stockout-info/StockoutInfo.js";
// import { StockCardController } from "./StockCardController.js"

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
    }

    render() {
        return html`
            <div class="rank">${this.rank}</div>
            <img @click=${this._removeSelf} src="${this.assetsPath + this.code + this.imageExt}" class="figure" />
            <div class="info">
                <div class="id">${this.code}</div>
                <div class="title clr-hl">${this.title}</div>
                <div class="price">${this.price.toFixed(2)}€</div>
                <!-- Chart -->

                <stockout-info .rate="${this.rate}" .coverage="${this.coverage}" />
            </div>
        `;
    }

    _removeSelf() {
        console.log('dispatching!');
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

        .info {
            padding: var(--pad, 1rem);
        }

        .figure {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            object-fit: cover;
            height: auto;
            object-position: 50% 20%;
            aspect-ratio: 1 / 1.3;
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
