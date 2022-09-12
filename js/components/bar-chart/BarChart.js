import { LitElement, html, css } from "../../vendor/lit-core.min.js";

export class BarChart extends LitElement {
    static properties = {
        data: { type: Object, state: true },
        bars: { type: Array, state: true },
    };

    constructor() {
        super();
    }

    render() {
        this.bars = this._getBarsData();
        const highestValue = this._highestDataValue();

        return html`
            <div class="bar-chart">
                ${this.valuesRulerTemplate}
                <div class="bar-chart__chart">
                    <div class="ruler ${highestValue % 2 === 0 ? "even" : "odd"}"></div>
                    ${this.barsTemplate}
                    ${this.legendTemplate}
                </div>
            </div>
        `;
    }

    get barsTemplate() {
        return html`
            <div class="bars">
                ${this.bars.map((bar) => {
                    return html`<div class="bar" style="--height:${this._getBarHeight(bar.value, this._highestDataValue())}%"></div>`;
                })}
            </div>
        `;
    }

    get legendTemplate() {
        return html`
            <div class="legend">
                ${this.bars.map((bar) => {
                    return html`<span class="label">${bar.label}</span>`;
                })}
            </div>
        `;
    }

    get valuesRulerTemplate() {
        return html`
            <div class="bar-chart__values">
                ${this._getChartScaleValues(this._highestDataValue()).map((value) => {
                    return html` <span>${value}</span> `;
                })}
            </div>
        `;
    }

    _getBarsData() {
        let bars = [];
        for (const [key, value] of Object.entries(this.data)) {
            let bar = new Object();
            bar.label = key;
            bar.value = value;
            bars.push(bar);
        }
        return bars;
    }

    _highestDataValue() {
        let val = 0;
        for (const [key, value] of Object.entries(this.data)) {
            if (value > val) val = value;
        }
        return val + 1;
    }

    _getBarHeight(value, highestValue) {
        return parseInt((value * 100) / highestValue);
    }

    _getChartScaleValues(highestValue = 0) {
        let values = [];
        highestValue % 2 == 0 ? (values = [0, highestValue / 2, highestValue]) : (values = [0, highestValue]);

        return values;
    }

    static styles = css`
        :host {
        }

        .bar-chart {
            display: flex;
            width: 100%;
        }

        .bar-chart__values {
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
            justify-content: space-between;
            width: fit-content;
            height: calc(var(--chart-height, 5rem) + var(--fs));
            margin-top: calc(-1 * var(--fs) / 2);
            padding-inline: 0.8em;
        }

        .bar-chart__chart {
            flex: 1;
            color: var(--clr);
            font-size: var(--fs, 1rem);
            position: relative;
        }

        .ruler,
        .bars,
        .legend {
            position: absolute;
            top: 0;
            left: 0;
            height: var(--chart-height, 5rem);
            width: 100%;
            box-sizing: border-box;
        }

        .ruler {
            border-block: 1px solid var(--clr-dim);
            height: 5rem;
            display: grid;
            align-items: center;
        }
        .ruler.even:after {
            content: "";
            border-top: 1px solid var(--clr-dim);
        }

        .bars,
        .legend {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
        }

        .bars {
            position: relative;
            align-items: end;
        }

        .bar {
            width: var(--bar-width, 55%);
            background: var(--bar-clr);
            justify-self: center;
            height: var(--height);
        }

        .legend {
            position: relative;
            height: auto;
        }
        .legend::after {
            width: 100%;
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 0.5rem;
            border-inline: 1px solid var(--clr-dim);
            box-sizing: border-box;
        }

        .legend .label {
            text-align: center;
            padding-block: 0.5em;
            position: relative;
        }

        .label + .label::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 0.5rem;
            border-left: 1px solid var(--clr-dim);
        }
    `;
}
customElements.define("bar-chart", BarChart);
