class APIUtils{

    constructor(apicontext, loginPayload){
        this.apicontext = apicontext;
        this.loginPayload = loginPayload;
    }

    async getToken(){

        //apicontext is to be passed here so create a constructor
        const loginResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data : this.loginPayload
            })

        //represent response body in json representation
        const loginResponsejson = await loginResponse.json();
        const token = loginResponsejson.token;
        console.log("token value is :" + token);
        return token;
    }

    async createOrder(payload){

        //create order using API

        let dictionary = {};
        dictionary.token = await this.getToken();
        const orderResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: payload,
                headers : {
                    'authorization' : String(dictionary.token),
                    'Content-Type' : 'application/json'
                },
            }
        );
        const orderResponsejson = await orderResponse.json();
        const orderID = orderResponsejson.orders[0];
        console.log("orderID is " + orderID);
        dictionary.orderID = orderID;
        return dictionary;
    }


}

module.exports = {APIUtils};