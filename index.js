const difference = require('lodash.difference')
const curry = require('lodash.curry')

/**
 * Mutates received object using pure function
 *
 * @param {Object} object
 * @param {Function} fn
 */
function pureMutation (object, fn) {
  const newObject = fn({ ...object })
  const diff = difference(Object.keys(object), Object.keys(newObject))

  Object.assign(object, newObject)

  diff.forEach(keyName => {
    delete object[keyName]
  })
}

module.exports = curry(pureMutation)
