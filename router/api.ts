const router = require('express').Router();
const shopify = require('./api.shopify');

router.use('/shopify', shopify);

router.get('/', async (req: any, res: any) => {
  await res.status(200);
});

module.exports = router;