/**
 * @constructor CatalogModel
 * @param data {Object}
 * @returns {Object}
 */
class CatalogModel {
  constructor(data) {
    this.products = data.products;
    this.currentPage = data.currentPage;
    this.totalCount = data.totalCount;
  }
}

module.exports = CatalogModel;
