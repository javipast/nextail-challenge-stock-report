export class StockAppController {

    constructor(host, dataSourceURL) {
        window.stockapp = this;
        this.dataLoaded = false;
        (this.host = host).addController(this);
        this.data = [];
        this.fetchData(dataSourceURL);
    }

    async fetchData(sourceURL) {
        const response = await fetch(sourceURL);
        const data = await response.json();
        return this._onDataLoaded(data);
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
        this.dataLoaded = true;
        this.host.requestUpdate();
    }

    _sortData(sort_attr = "sales_ranking") {
        return this.data.sort((a, b) => (a[sort_attr] > b[sort_attr] ? 1 : -1));
    }

}