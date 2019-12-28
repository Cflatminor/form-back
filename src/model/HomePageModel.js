const path = require('path');
const BaseModel = require(path.resolve('src/model/BaseModel.js'));
const model = {
  title: 'Home Page',
};

/**
 * @constructor HomePageModel
 * @param data {Object}
 * @returns {Object}
 */
class HomePageModel extends BaseModel {
  constructor(data) {
    super(model);
    this.products = data;
  }
}

module.exports = HomePageModel;
