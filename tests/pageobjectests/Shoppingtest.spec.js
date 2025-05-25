const {test, expect} = require('@playwright/test');;
const {LoginPage} = require('../../pageobjects/LoginPage');
const {DashboardPage} = require('../../pageobjects/DashboardPage');
const {CartPage} = require('../../pageobjects/CartPage');
const {CheckoutPage} = require('../../pageobjects/CheckoutPage');
const {OrderSummaryPage} = require('../../pageobjects/OrderSummaryPage');

test("@framework ecommerce application create order framework", async ({page}) => {

    //create object of the login page
    const loginPage = new LoginPage(page);
    
    //Launch application
    await loginPage.launchShopApplication();

    //login to the application
    await loginPage.validLogin("testersign@gmail.com", "Test123123@");
    
    //create dashboard page object
    const dashboardPage = new DashboardPage(page);

    const productselect = "ADIDAS ORIGINAL";
    //add to cart the product
    await dashboardPage.selectProduct(productselect);

    //go to cart
    await dashboardPage.gotoCart();
    //await dashboardPage.cart.click();

    const cartPage = new CartPage(page);

    //verify item on cart page - Playwright will not wait for isvisible
    await cartPage.VerifyCartItemExists("ADIDAS ORIGINAL")

    //click on Checkout
    await cartPage.CheckoutCart();

    const checkoutPage = new CheckoutPage(page);

    //wait for checkout page
    await checkoutPage.paymentMethods.first().waitFor();
    await expect(checkoutPage.email).toHaveText('testersign@gmail.com');
    
    //select country
    await checkoutPage.selectCountry(" India");

    //click on place order 
    await checkoutPage.clickPlaceOrder();

    const orderSummaryPage = new OrderSummaryPage(page);
    //verify success message
    await orderSummaryPage.thankYouText.waitFor();
    await expect(orderSummaryPage.thankYouText).toHaveText(" Thankyou for the order. ");
    const orderID = await orderSummaryPage.orderNumber.textContent();
    console.log(orderID.split("| ")[1].split(" |")[0]);

})

