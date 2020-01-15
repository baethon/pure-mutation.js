const difference = require('lodash.difference')

/**
 * @typedef MutatorOps
 * @property {Function} assign
 * @property {Function} exclude
 */

/**
 * @callback NonPureFn
 * @param {Object} inputRef
 * @return {void}
 */

/** @type {MutatorOps} */
const defaultMutatorOps = {
  assign: (inputRef, values) => {
    Object.assign(inputRef, values)
  },
  exclude: (inputRef, keys) => {
    keys.forEach((name) => {
      delete inputRef[name]
    })
  }
}

/**
 * Creates a non-pure function from given pure function
 *
 * Created function should receive an {Object} as a first argument.
 * This object will be passed to the wrapped pure function,
 * the results will be merged back to the input object.
 *
 * @param {Function} fn
 * @param {MutatorOps} [mutatorOps] - the operations used to mutate the input
 * @return {NonPureFn}
 */
function unpure (fn, mutatorOps = {}) {
  const {
    assign = defaultMutatorOps.assign,
    exclude = defaultMutatorOps.exclude
  } = mutatorOps

  return (inputRef) => {
    const newObject = fn({ ...inputRef })
    const diff = difference(Object.keys(inputRef), Object.keys(newObject))

    assign(inputRef, newObject)
    exclude(inputRef, diff)
  }
}

/**
 * Mutates received object using pure function
 *
 * @param {Object} inputRef
 * @param {Function} fn
 * @param {MutatorOps} [mutatorOps] - the operations used to mutate the input
 */
function mutate (inputRef, fn, mutatorOps = {}) {
  const updateObject = unpure(fn, mutatorOps)
  updateObject(inputRef)
}

module.exports = {
  mutate,
  unpure
}
