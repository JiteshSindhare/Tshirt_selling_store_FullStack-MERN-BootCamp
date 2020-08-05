var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // took all this merchatId, pbulickey and private key from braintree API .
    merchantId: "njndbybzg46dv72b",
    publicKey: "z3w3cb4k288hqv76",
    privateKey: "e19f2c10c2b87ee6d15600453ce3c14c"
});

exports.getToken =(req,res) =>{
    // copied things from https://developers.braintreepayments.com/start/hello-server/node
    // and have edited it from the "generate a client token " part.
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            // res.status(500).send(err); is not getting properly formatted
            // and that is giving some bugs , so using send(), its giving 
            // in thr docs.
            res.status(500).send(err);
        }else{
            res.send(response);
        }
      });
}

exports.processPayment = (req,res) => {
    // this is being suggested by the documentation.
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;
    // copied things from https://developers.braintreepayments.com/start/hello-server/node
    // and have edited it from the "Create a transaction " part.
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).json(err);
          }else{
              res.json(result);
          }
      });
}