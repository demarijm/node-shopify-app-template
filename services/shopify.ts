const axios = require("axios");

interface ShopifyConstructor {
  shopName: string;
  accessToken: string;
  apiKey: string;
}

/*
 * Class for making calls to the Shopify API
 * @param {string} shop - The shop name of the store
 * @param {string} api_key - The API key of the store
 * @param {string} access_token - The password of the store
 * @param {string} [apiVersion=2021-10] - The API version of the store
 */
module.exports = class ShopifyRest {
  transport: any;
  shopifyUrl: string;
  constructor(shop: string, api_key: string, access_token: string) {
    this.transport = axios.create({
      withCredentials: true,
      headers: {
        "X-Shopify-Access-Token": access_token,
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
    });
    this.shopifyUrl = `https://${api_key}:${access_token}@${shop}`;
  }

  /*
   * Get a customer from shopify
   * @param {string} - customer_id
   * @return {json} - customer data
   * @throws {error} - if error in request or response
   */
  getCustomer(customer_id: number) {
    const url = `${this.shopifyUrl}/admin/api/${process.env.SHOPIFY_API_VER}/customers/${customer_id}.json`;
    return new Promise((resolve, reject) => {
      this.transport
        .get(url)
        .then((response: { data: unknown }) => {
          return resolve(response.data);
        })
        .catch((err: any) => {
          return reject(err);
        });
    });
  }

  /*
   * Create a Discount in Shopify
   * @param {string} - price_rule_id, and payload
   * @return {json} - discount data
   * @throws {error} - if error in request or response
   */
  async createDiscount(price_rule_id: number, payload: any) {
    const url = `${this.shopifyUrl}/admin/api/${process.env.SHOPIFY_API_VER}/price_rules/${price_rule_id}/discount_codes.json`;
    return new Promise((resolve, reject) => {
      this.transport
        .post(url, payload)
        .then((response: { data: unknown }) => {
          return resolve(response.data);
        })
        .catch((err: any) => {
          return reject(err);
        });
    });
  }
};
