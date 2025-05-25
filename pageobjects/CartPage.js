const {expect} = require('@playwright/test');

class CartPage{

    constructor(page){
        
        this.CartItems = page.locator("div.cart li");
        this.CheckoutButton = page.locator("button:has-text('Checkout')");
        this.page = page;
    }

    async CheckoutCart(){
        await this.CheckoutButton.click();
    }

    async VerifyCartItemExists(productName){

        await this.CartItems.first().waitFor();
        const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        expect(bool).toBeTruthy();

    }

}

module.exports = {CartPage};