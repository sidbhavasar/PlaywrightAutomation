class DashboardPage{

    constructor(page){

        this.products = page.locator("div.card-body");
        this.cart = page.locator("button[routerlink*='cart']");
        this.page = page;

    }

    async selectProduct(productName){

        //const product = page.this.products;
        const allproducts = await this.products.locator("h5 b").allTextContents();
        console.log(allproducts);
        const productCount = await this.products.count();
        console.log("total number of products: " + productCount);

        for(let i=0; i<productCount;i++){
            if(await this.products.nth(i).locator("h5 b").textContent() === productName){
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

    }

    async gotoCart(){

        await this.cart.click();
    }

}

module.exports = {DashboardPage};