const difference = require('lodash.difference')

/**
 * @callback NonPureFn
 * @param {Object} object
 * @return {void}
 */

/**
 * Creates a non-pure function from given pure function
 *
 * Created function should receive an {Object} as a first argument.
 * This object will be passed to the wrapped pure function,
 * the results will be merged back to the input object.
 *
 * @param {Function} fn
 * @return {NonPureFn}
 */
function unpure (fn) {
  return (input) => {
    const newObject = fn({ ...input })
    const diff = difference(Object.keys(input), Object.keys(newObject))

    Object.assign(input, newObject)

    diff.forEach(keyName => {
      delete input[keyName]
    })
  }
}

/**
 * Mutates received object using pure function
 *
 * @param {Object} input
 * @param {Function} fn
 */
function mutate (input, fn) {
  const updateObject = unpure(fn)
  updateObject(input)
}

module.exports = {
  mutate,
  unpure
}
