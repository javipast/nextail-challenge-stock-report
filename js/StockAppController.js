export class StockAppController {

    constructor(host, dataSourceURL) {
        (this.host = host).addController(this);
        this.data = [];
        this.fetchData(dataSourceURL);
    }

    fetchData(sourceURL) {
        return fetch(sourceURL)
            .then((response) => response.json())
            .then((data) => this._onDataLoaded(data));
    }

    removeItem(code) {
        this.data = this.data.filter((item) => {
            return item.code != code;
        });
        this.host.requestUpdate();
    }

    _onDataLoaded(data) {
        this.data = data;
        this._sortData('sales_ranking');
        this.host.requestUpdate();
    }

    _sortData(sort_attr = "sales_ranking") {
        return this.data.sort((a, b) => (a[sort_attr] > b[sort_attr] ? 1 : -1));
    }

    hostConnected() {
        // window.addEventListener('mousemove', this._onMouseMove);
    }

    hostDisconnected() {
        // window.removeEventListener('mousemove', this._onMouseMove);
    }
}

// window.stockapp = new StockApp(document.querySelector("#StockCards .cards"));
// window.stockapp.fetchData("../data/products.json");
