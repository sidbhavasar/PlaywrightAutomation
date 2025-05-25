class CheckoutPage{

    constructor(page){

        this.paymentMethods = page.locator("div.payment__type");
        this.email = page.locator("label[style*='color: lightgray']");
        this.country = page.locator("input[placeholder='Select Country']");
        this.countrysuggestionlist = page.locator("section.ta-results.list-group");
        this.eachCountrySuggestion = page.locator("section.ta-results.list-group button.list-group-item")
        this.placeOrder = page.locator("a.action__submit");
        this.page = page;

    }

    async selectCountry(countryName){

        await this.country.pressSequentially("ind");
        await this.countrysuggestionlist.waitFor();
        
        const countries = await this.eachCountrySuggestion.count();
        for(let i=0; i<countries;i++){
            if(await this.eachCountrySuggestion.nth(i).textContent() === countryName){
                await this.eachCountrySuggestion.nth(i).click();
                break;
            }
        }
    }

    async clickPlaceOrder(){
        await this.placeOrder.click();
    }

}

module.exports = {CheckoutPage};