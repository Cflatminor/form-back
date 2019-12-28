/**
 * @constructor BaseModel
 * @param model {Object}
 * @returns {Object}
 */
class BaseModel {
  constructor(model) {
    this.title = model.title;
    this.breadcrumbs = [];
  }
}

module.exports = BaseModel;
