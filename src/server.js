const app = require("./app");
const http = require("http");

const stripe = require('stripe')('sk_test_Zho9joks2ij7FUWFC9sIta5w00K7elvnrW');

(async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: 'Premium Upgrade',
      description: 'Upgrade to Premium Account',
      images: [],
      amount: 1500,
      currency: 'usd',
      quantity: 1,
    }],
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });
})();


const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);


server.listen(port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

server.on("listening", () => {
  console.log(`server is listening for requests on port ${server.address().port}`);
});
