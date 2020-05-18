/**
 * @constructor CatalogModel
 * @param data {Object}
 * @returns {Object}
 */
class CatalogModel {
  constructor(data) {
    this.products = data.products;
    this.pagesCount = data.pagesCount;
    this.currentPage = data.currentPage;
  }
}

module.exports = CatalogModel;
