const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid/v4");


exports.makepayment =  (req,res) => {  
    const {products, token} = req.body;
    console.log("PRODUCTS", products);

    let amount = 0;
        // map gives each index and product , since we only need product
        // so we are using only p in here.
        products.map(p =>{
            amount = amount + p.price;
        });
    const idempotencyKey = uuid();
    // this key is responsible for not charging the user again if there is any 
    // network error or any issue. then user in no case will be charged double.

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        // in here inside create we send information like
        // amount we want to deduct, currency we want to charge in.
        // receipt_email is for if we want to send a confirmation-email
        //  to our customer. Read documenttation for more.
        stripe.charges.create({
            amount: amount *100 , 
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description :"a test account",
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip,
                }
            }
        },{idempotencyKey})
        .then(result => res.status(200).json(result))
        //this means are sending a json resposne of all the result we will get.
        .catch(err => console.log(err));
    })
};  