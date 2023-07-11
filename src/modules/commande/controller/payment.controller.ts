
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// Process stripe payments   =>   /payment/process
export const processPayment = async (req :any , res: any, next: any) => {

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: req.body.amount,
            quantity: 1,
          },
        ],
        mode: 'payment',
        
      });
    

    res.status(200).json({
        success: true,
        info: session
    })

};

// Send stripe API Key   =>   /stripeapi
export const sendStripApi = (req :any , res: any, next: any) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

};
