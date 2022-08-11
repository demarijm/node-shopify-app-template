export {}
const router = require("express").Router();
const ShopifyRest = require("../services/shopify");

/*
 * Get a customer from shopify
 * @param {string} - customer_id
 * @return {json} - customer tags
 * @throws {error} - if error in request or response
 */
router.get("/customer/:id", async (req: {params: { id: string }}, res: { status: (arg0: number) => { json: { (arg0: { status: string; data: any; }): any } }}) => {
  try {
    const customer_id = req.params.id;
    const shopify = new ShopifyRest(
      process.env.SHOPIFY_STORE,
      process.env.SHOPIFY_API_KEY,
      process.env.SHOPIFY_ACCESS_TOKEN
    );

    const customerData = await shopify.getCustomer(customer_id);
    res.status(200).json({
      status: "success",
      data: customerData,
    });
  } catch (err) {
    res.status(401).json({ status: "error", data: err });
  }
});

module.exports = router;
