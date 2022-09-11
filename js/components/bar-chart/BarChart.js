import { LitElement, html, css } from "../../vendor/lit-core.min.js";

export class BarChart extends LitElement {
    static properties = {
        data: { type: Object, state: true },
    };

    constructor() {
        super();
    }

    render() {
        const bars = this.getBarsData();
        const highestValue = this.highestDataValue();

        return html`
            <div class="bar-chart">
                <div class="bar-chart__values">
                    ${this.getChartScaleValues(highestValue).map((value) => {
                        return html` <span>${value}</span> `;
                    })}
                </div>
                <div class="bar-chart__chart">
                    <div class="ruler ${highestValue % 2 === 0 ? "even" : "odd"}"></div>
                    <div class="bars">
                        ${bars.map((bar) => {
                            return html`<div class="bar" style="--height:${this.getBarHeight(bar.value, highestValue)}%"></div>`;
                        })}
                    </div>
                    <div class="legend">
                        ${bars.map((bar) => {
                            return html`<span class="label">${bar.label}</span>`;
                        })}
                    </div>
                </div>
            </div>
        `;
    }

    getBarsData(){
        let bars = [];
        for (const [key, value] of Object.entries(this.data)) {
            let bar = new Object();
            bar.label = key;
            bar.value = value;
            bars.push(bar);
        }
        // console.log(bars);
        return bars;
    }

    getBarHeight(value, highestValue){
        return parseInt(value * 100 / highestValue);
    }

    getChartScaleValues(highestValue = 0) {
        let values = [];
        highestValue % 2 == 0 ? (values = [0, highestValue / 2, highestValue]) : (values = [0, highestValue]);

        return values;
    }

    get chartElementLabels() {
        let labels = ``;
        for (const [key, value] of Object.entries(this.data)) {
            labels += html`<span class="label">${key}</span>`;
        }
        return html`${labels}`;
    }

    highestDataValue() {
        let val = 0;
        for (const [key, value] of Object.entries(this.data)) {
            if (value > val) val = value;
        }
        return val + 1;
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
