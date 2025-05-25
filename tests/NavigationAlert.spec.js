const {test, expect} = require("@playwright/test");
const { waitForDebugger } = require("inspector");

test("navigation test", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.co.in");
    // await page.goBack();
    // await page.goForward();
    // await page.reload();

    //verify editbox is visible
    await expect(page.locator("input#displayed-text")).toBeVisible();

    //click on hide
    await page.locator("input#hide-textbox").click();
    await expect(page.locator("input#displayed-text")).toBeHidden();

    //listen for dialog 
    page.on('dialog', dialog=> dialog.accept());
    // page.on('dialog', dialog => dialog.dismiss());

    //click on Alert button 
    await page.locator("#alertbtn").click();

    //mouse hover on the button
    await page.locator("#mousehover").hover();

    //switch to frame --> frame identifier can be any css
    const objframe = page.frameLocator("#courses-iframe");
    // const objframe = page.frameLocator("iframe[name='iframe-name']");

    await objframe.locator("li a[href='lifetime-access']:visible").click();

    const customertext = await objframe.locator("div.text h2").textContent();
    console.log(customertext);
    console.log("number of customers " + customertext.split(" ")[1]);

})

test("screenshot capture test", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //verify editbox is visible
    await expect(page.locator("input#displayed-text")).toBeVisible();

    //capture screenshot at element level
    await page.locator("input#displayed-text").screenshot({path : './tests/screenshots/visibleelement.png'})

    //click on hide
    await page.locator("input#hide-textbox").click();
    await expect(page.locator("input#displayed-text")).toBeHidden();

    //screenshot at page level
    await page.screenshot({path : './tests/screenshots/hiddenelement.png'})
})

test("visual compare test", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //verify editbox is visible
    await expect(page.locator("input#displayed-text")).toBeVisible();

    //click on hide
    await page.locator("input#hide-textbox").click();
    await expect(page.locator("input#displayed-text")).toBeHidden();

    //screenshot at page level
    expect(await page.screenshot()).toMatchSnapshot("hiddenelement.png");
})