import { LitElement, html, css } from "./vendor/lit-core.min.js";
import { StockAppController } from "./StockAppController.js";
import { StockCard } from "./components/stock-card/StockCard.js"

export class StockApp extends LitElement {
    controller = new StockAppController(this, "../data/products.json");

    constructor(){
        super();
        this.addEventListener('card-removed', 
            (e) => this.controller.removeItem(e.detail?.code));
    }

    render() {
        return html`
            <div class="stock-app">
                ${this.currentStateTemplate}
            </div>
        `
    }

    get currentStateTemplate(){
        if(!this.controller.dataLoaded){
            return this.templateLoading;
        }else{
            return this.controller.data.length 
                ? this.templateCards
                : this.templateEmpty
        }
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
                        .sizeStock=${card.size_stock}
                    />`
                })}
            </div>
        `;
    }

    get templateLoading() {
        return html` <div class="centered-content">Fetching data...</div> `;
    }

    get templateEmpty() {
        return html` <div class="centered-content">There are no cards at the moment. Yeah!</div> `;
    }

    static styles = css`

        .stock-app{
            position: relative;
            display: grid;
            min-height: calc(100vh - var(--nav-height));
            padding: var(--base-padding);
            box-sizing:border-box;
        }

        .centered-content{
            display: grid;
            align-items:center;
            justify-content: center;
        }

        .cards{
            display:grid;
            gap: var(--base-padding);
            grid-template-columns: repeat(auto-fill, minmax(var(--stock-card-min-w), 1fr));
            padding: var(--base-padding, 1rem);
            height: fit-content;
        }
    `
}
customElements.define("stock-app", StockApp);
