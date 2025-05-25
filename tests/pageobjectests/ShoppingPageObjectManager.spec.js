const {test, expect} = require('@playwright/test');

const {PageObjectManager} = require('../../pageobjects/PageObjectManager')

//convert json > string > js object
const dataset = JSON.parse(JSON.stringify(require('../../utils/testdata/ShoppingTestData.json')));


test(" ecommerce application Page Object Manager", async ({page}) => {

    const pageObjectManager = new PageObjectManager(page);
    //create object of the login page
    const loginPage = pageObjectManager.getLoginPage();
    
    //Launch application
    await loginPage.launchShopApplication();

    //login to the application
    await loginPage.validLogin(dataset.username, dataset.password);
    
    //create dashboard page object
    const dashboardPage = pageObjectManager.getDashboardPage();

    //const productselect = "ADIDAS ORIGINAL";
    //add to cart the product
    await dashboardPage.selectProduct(dataset.productname);

    //go to cart
    await dashboardPage.gotoCart();
    //await dashboardPage.cart.click();

    const cartPage = pageObjectManager.getCartPage();

    //verify item on cart page - Playwright will not wait for isvisible
    await cartPage.VerifyCartItemExists(dataset.productname)

    //click on Checkout
    await cartPage.CheckoutCart();

    const checkoutPage = pageObjectManager.getCheckoutPage();

    //wait for checkout page
    await checkoutPage.paymentMethods.first().waitFor();
    await expect(checkoutPage.email).toHaveText(dataset.username);
    
    //select country
    await checkoutPage.selectCountry(dataset.country);

    //click on place order 
    await checkoutPage.clickPlaceOrder();

    const orderSummaryPage = pageObjectManager.getOrderSummaryPage();
    //verify success message
    await orderSummaryPage.thankYouText.waitFor();
    await expect(orderSummaryPage.thankYouText).toHaveText(" Thankyou for the order. ");
    const orderID = await orderSummaryPage.orderNumber.textContent();
    console.log(orderID.split("| ")[1].split(" |")[0]);

})

