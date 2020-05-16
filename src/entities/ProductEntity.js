/**
 * @constructor ProductEntity
 * @param product {Object}
 * @returns {Object}
 */
class ProductEntity  {
  constructor (product) {
    this.brand = product.brand;
    this.title = product.title;
    this.price = product.price;
    this.rating = product.rating;
    this.isAvailable = product.isAvailable;
  }

  getTitle () {
    return this.title;
  }
}

module.exports = ProductEntity;
