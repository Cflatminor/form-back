/**
 * @constructor RubricEntity
 * @param rubric {Object}
 * @returns {Object}
 */
class RubricEntity  {
  constructor (rubric) {
    this.title = rubric.title;
    this.products = rubric.products;
  }
}

module.exports = RubricEntity;
