import { LitElement, html, css } from "./vendor/lit-core.min.js";
import { StockAppController } from "./StockAppController.js";
import { StockCard } from "./components/stock-card/StockCard.js"

export class StockApp extends LitElement {
    controller = new StockAppController(this, "../data/products.json");

    render() {
        return this.templateCards;
    }

    get templateCards() {
        return html`
            <div class="cards">
                ${this.controller.data.map((card) => {
                    return html`
                    <stock-card 
                        .code=${card.code}
                        .title=${card.name}
                        .rank=${card.sales_ranking}
                        .price=${card.price}
                        .rate=${parseFloat(card.stockout_rate) * 100}
                        .coverage=${parseFloat(card.wh_coverage) * 100}
                    />`
                })}
            </div>
        `;
    }

    get templateLoading() {
        return html` <div class="text-center clr-dim" style="padding-top: 30vh;">Fetching data...</div> `;
    }

    get templateEmpty() {
        return html` <div class="text-center clr-dim" style="padding-top: 30vh;">There are no cards at the moment. Yeah!</div> `;
    }

    static styles = css`
        :host{
            position: relative;
            display: grid;
        }

        .cards{
            display:grid;
            gap: var(--base-padding);
            grid-template-columns: repeat(auto-fill, minmax(var(--stock-card-min-w), 1fr));
            padding: var(--base-padding, 1rem);
        }
    `
}
customElements.define("stock-app", StockApp);
