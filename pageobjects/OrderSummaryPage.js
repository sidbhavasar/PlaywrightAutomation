class OrderSummaryPage{

    constructor(page){

        this.thankYouText = page.locator("h1.hero-primary");
        this.orderNumber = page.locator("label.ng-star-inserted");
    }

}

module.exports = {OrderSummaryPage}