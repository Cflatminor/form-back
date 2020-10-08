/**
 * @constructor BaseModel
 * @param model {Object}
 * @returns {Object}
 */
class BaseModel {
  constructor(model) {
    this.title = model.title || "";
    this.breadcrumbs = model.breadcrumbs || [];
  }
}

module.exports = BaseModel;
