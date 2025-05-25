// const {test, expect} = require("@playwright/test");
import {test, expect} from '@playwright/test'

    test("get by locators", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");

    //find locator using placeholder attribute
    await page.getByPlaceholder("Password").fill("test123123123");

    //click on submit button using role
    await page.getByRole("button",{name:'Submit'}).click();

    //verify success message
    console.log(await page.getByText("Success! The Form has been submitted successfully!").isVisible());

    //click on shop link
    await page.getByRole("link", {name: 'Shop'}).click();

    //Select product by name
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

})

test('calendar check', async ({page})=>{

    const day = "15";
    const month = "06";
    const year = "2027";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator("button.react-calendar__navigation__label").click();
    await page.locator("button.react-calendar__navigation__label").click();

    //select year
    await page.locator("button.react-calendar__decade-view__years__year").filter({hasText : year}).click();

    //select month 
    await page.locator("button.react-calendar__year-view__months__month").nth(Number(month)-1).click();

    //select day
    await page.locator("button.react-calendar__month-view__days__day").filter({hasText : day}).click();

    //assert the date selected
    expect(await page.locator("div.react-date-picker__inputGroup input[name='date']").getAttribute("value")).toEqual(year + "-" + month + "-" + day );

})