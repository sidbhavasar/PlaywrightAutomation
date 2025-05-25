const {Given, When, Then} = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const {expect, test} = require('@playwright/test');
const {LoginPage} = require('../../pageobjects/LoginPage');
const {DashboardPage} = require('../../pageobjects/DashboardPage');
const {CartPage} = require('../../pageobjects/CartPage');
const {CheckoutPage} = require('../../pageobjects/CheckoutPage');
const {OrderSummaryPage} = require('../../pageobjects/OrderSummaryPage');

const { Page } = require("playwright");

Given('valid login credentials {string} and {string} are provided to login', {headless: false}, async function (username, password) {
           // Write code here that turns the phrase above into concrete actions
        //create object of the login page
        const browser = await playwright.chromium.launch();

        let page = await browser.newContext();
        const loginPage = new LoginPage(page);
        
        //Launch application
        await loginPage.launchShopApplication();

        //login to the application
        await loginPage.validLogin(username, password);
    });

When('product {string} is added to cart', async function (productName) {
           // Write code here that turns the phrase above into concrete actions
        //create dashboard page object
        const dashboardPage = new DashboardPage(page);

        const productselect = productName;
        //add to cart the product
        await dashboardPage.selectProduct(productselect);
    });


Then('Cart Page should have product {string} present', async function (productName) {
           // Write code here that turns the phrase above into concrete actions
               //go to cart
        await dashboardPage.gotoCart();
        //await dashboardPage.cart.click();

        const cartPage = new CartPage(page);

        //verify item on cart page - Playwright will not wait for isvisible
        await cartPage.VerifyCartItemExists(productName)
    });
/*
Then('email id {string} is present in email field on Checkout page', async function (email) {
           // Write code here that turns the phrase above into concrete actions
        //click on Checkout
        await cartPage.CheckoutCart();

        const checkoutPage = new CheckoutPage(this.page);

        //wait for checkout page
        await checkoutPage.paymentMethods.first().waitFor();
        await expect(checkoutPage.email).toHaveText(email);
    });

When('country {string} is selected in country', async function (countryName) {
            //select country
            await checkoutPage.selectCountry(countryName);
    });

Then('text {string} is displayed on confirmation page', async function (message) {

        //click on place order 
        await checkoutPage.clickPlaceOrder();

        const orderSummaryPage = new OrderSummaryPage(this.page);
        //verify success message
        await orderSummaryPage.thankYouText.waitFor();
        await expect(orderSummaryPage.thankYouText).toHaveText(message);
        const orderID = await orderSummaryPage.orderNumber.textContent();
        console.log(orderID.split("| ")[1].split(" |")[0]);
    });*/

