export class StockAppController {

    constructor(host, dataSourceURL) {
        window.stockapp = this;
        (this.host = host).addController(this);
        this.data = [];
        this.fetchData(dataSourceURL);
    }

    hostConnected() {
        window.addEventListener('card-removed', (e) => this._onCardRemoved(e));
    }

    hostDisconnected() {
        window.removeEventListener('card-removed', (e) => this._onCardRemoved(e));
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

    _onCardRemoved(event){
        this.removeItem(event.detail?.code);
    }

    _sortData(sort_attr = "sales_ranking") {
        return this.data.sort((a, b) => (a[sort_attr] > b[sort_attr] ? 1 : -1));
    }

    
}