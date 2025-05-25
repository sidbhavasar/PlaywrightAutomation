const {test, expect, request} = require("@playwright/test");
const { waitForDebugger } = require("inspector");
const {APIUtils} = require("../utils/APIUtils");

const loginPayload = {"userEmail":"testersign@gmail.com","userPassword":"Test123123@"};
const orderPayload = {orders: [{country: "British Indian Ocean Territory", productOrderedId: "67a8df56c0d3e6622a297ccd"}]};
// let token;
//let orderID;
let dictionary;

test.beforeAll(async ()=>{

    const apicontext = await request.newContext();
    const apiUtils = new APIUtils(apicontext, loginPayload);
    dictionary = await apiUtils.createOrder(orderPayload);
})



test("ecommerce application create order", async ({page}) => {

    
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, dictionary.token);

    //commented below lines as we are going to use token for login
    await page.goto("https://rahulshettyacademy.com/client");

    //go to order page
    await page.locator("button[routerlink='/dashboard/myorders']").click();

    //wait for page to load
    await page.locator("table.table tr.ng-star-inserted").last().waitFor();

    //await page.pause();
    expect(page.locator("table.table tr.ng-star-inserted").filter({hasText : dictionary.orderID})).toBeVisible();

})


