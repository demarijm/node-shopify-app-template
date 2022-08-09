const router = require('express').Router();
const shopify = require('./api.shopify');

router.use('/shopify', shopify);

router.get('/', async (req, res) => {
  await res.status(200);
});

module.exports = router;