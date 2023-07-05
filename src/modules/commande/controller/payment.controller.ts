
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// Process stripe payments   =>   /payment/process
export const processPayment = async (req :any , res: any, next: any) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'EUR',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

};

// Send stripe API Key   =>   /stripeapi
export const sendStripApi = (req :any , res: any, next: any) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

};
