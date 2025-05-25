const {test, expect} = require('@playwright/test');

test("browser context fixture", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/locatorspractice/");
})

test("page fixture", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/locatorspractice/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Rahul Shetty Academy - Login page");

})

test("locator fixture", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator('#username').fill('test@user.com');
    await page.locator('input#password').fill('learning');
    await page.locator('#signInBtn').click();

    //print invalid username error message
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');

    //clear existing text
    await page.locator('#username').fill('');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('input#password').fill('learning');
    await page.locator('#signInBtn').click();

    //wait till network is idle i.e. page is loaded completely
    //await page.waitForLoadState('networkidle'); //sometimes fails
    await page.locator("div.card-body h4.card-title a").last().waitFor();

    //print first product 
    //console.log(await page.locator("div.card-body h4.card-title a").nth(0).textContent());
    //following also works
    //console.log(await page.locator("div.card-body h4.card-title a").first().textContent());

    //print text of all products - list of texts
    //following call will return empty list as Playwright will not wait until alltextcontents is returned so we should wait till backend network
    //calls are completed and network becomes idle.

    //returns array of text
    console.log(await page.locator("div.card-body h4.card-title a").allTextContents());

})

test("ui controls", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator('#username').fill('test@user.com');
    await page.locator('input#password').fill('learning');

    //select dropdown using value , label/
    await page.locator("select.form-control").selectOption("consult");
    //await page.locator("select.form-control").selectOption("Teacher");
    // Multiple selected items
    //await page.getByLabel('Choose multiple colors').selectOption(['red', 'green', 'blue']);

    //select radio button
    await page.locator('span.radiotextsty').last().click();

    //works only on input tag
    //await page.locator('span.radiotextsty').check();

    await page.locator("#okayBtn").click();

    //verify radio button 
    await expect(page.locator('span.radiotextsty').last()).toBeChecked();
    console.log(await page.locator('span.radiotextsty').last().isChecked());

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    //uncheck using 
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    //check blinking text
        await expect(page.locator("a[href*='documents-request']")).toHaveAttribute("class", "blinkingText");
    console.log(await page.locator("a[href*='documents-request']").getAttribute("class"));

    //await page.pause();
    await page.locator('#signInBtn').click();

})

test("child windows tutorial", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //listen to new page before link is clicked. Promises return pending, rejected or fulfilled status
    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("a[href*='documents-request']").click()
    ])

    //get text of the red link
    const text = await newpage.locator(".red").textContent();
    console.log(text);
    const email = text.split("at")[1].split(" ")[1];
    await newpage.close();

    //enter email on first page username field
    await page.locator("#username").fill(email);

    //await page.pause();

})

test("ecommerce application create order", async ({page}) => {

    const product = page.locator("div.card-body");
    const productselect = "ADIDAS ORIGINAL";
    
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("testersign@gmail.com");
    await page.locator("#userPassword").fill("Test123123@");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    const allproducts = await product.locator("h5 b").allTextContents();
    console.log(allproducts);
    const productCount = await product.count();
    console.log("total number of products: " + productCount);

    for(let i=0; i<productCount;i++){
        if(await product.nth(i).locator("h5 b").textContent() === productselect){
            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    //go to cart
    await page.locator("button[routerlink*='cart']").click();

    //verify item on cart page - Playwright will not wait for isvisible

    await page.locator("div.cart li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();

    //click on Checkout
    await page.locator("button:has-text('Checkout')").click();

    //wait for checkout page
    await page.locator("div.payment__type").first().waitFor();
    await expect(page.locator("label[style*='color: lightgray']")).toHaveText('testersign@gmail.com');
    
    await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
    await page.locator("section.ta-results.list-group").waitFor();
    
    const countries = await page.locator("section.ta-results.list-group button.list-group-item").count();
    for(let i=0; i<countries;i++){
        if(await page.locator("section.ta-results.list-group button.list-group-item").nth(i).textContent() === " India"){
            await page.locator("section.ta-results.list-group button.list-group-item").nth(i).click();
            break;
        }
    }

    //click on place order 
    await page.locator("a.action__submit").click();

    //verify success message
    await page.locator("h1.hero-primary").waitFor();
    await expect(page.locator("h1.hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator("label.ng-star-inserted").textContent();
    console.log(orderID.split("| ")[1].split(" |")[0]);


})