const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrderSummaryPage} = require('./OrderSummaryPage');


class PageObjectManager{

    constructor(page){

        this.page = page;
        this.LoginPage = new LoginPage(this.page);
        this.DashboardPage = new DashboardPage(this.page);
        this.CartPage = new CartPage(this.page);
        this.CheckoutPage = new CheckoutPage(this.page);
        this.OrderSummaryPage = new OrderSummaryPage(this.page);
    }

    getLoginPage(){
        return this.LoginPage;
    }

    getDashboardPage(){
        return this.DashboardPage;
    }

    getCartPage(){
        return this.CartPage;
    }

    getCheckoutPage(){
        return this.CheckoutPage;
    }

    getOrderSummaryPage(){
        return this.OrderSummaryPage;
    }

}

module.exports = {PageObjectManager};