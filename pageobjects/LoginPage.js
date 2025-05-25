class LoginPage{

    constructor(page){

        this.page = page;
        this.signInbutton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
    }

    async launchShopApplication(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password){

        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {LoginPage}



