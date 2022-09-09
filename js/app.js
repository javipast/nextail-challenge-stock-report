import StockoutInfo from './components/stockout-info/StockoutInfo.js';


class StockApp{
    constructor (dataURL) {
        this.data = null;
        this.fetchData(dataURL);
    }

    fetchData(sourceURL){
        return fetch(sourceURL)
            .then(response => response.json())
            .then(data => this.onDataLoaded(data))
    }

    onDataLoaded(data){
        this.data = data;
        this.init();
    }

    init(){
        console.log(this.data);
    }
}

window.stockapp = new StockApp('../data/products.json');