## @baethon/pure-mutation

Use pure functions to mutate an object.

## Installation

```
yarn add @baethon/pure-mutation
```

## Example usage

```js
const { mutate } = require('@baethon/pure-mutation')
const R = require('ramda')

const incrementAge = R.evolve({    
  age: R.inc
})

const user = {    
  name: 'Jon',    
  age: 22
}

mutate(user, incrementAge)
console.log(user)
```

## But... why?

I feel like making a non-pure function from a pure function is a step backward (which probably is). There's a reason for this.

Some libraries require that a given callback mutates the input data. Now, imagine that you'd like to use one of your sweet pure functions. It's not possible! You need to either make them dirty or write a second implementation which will be non-pure. Absolutely barbaric.

`@baethon/pure-mutation` is an attempt to solve this type of problem. You can create your pure function and, when required, use it as a non-pure mutating function.

### Example use case

[Mongoose middleware](https://mongoosejs.com/docs/middleware.html) can be used to ie. modify the data which will be returned from the database. To do this, one needs to add a _pre init_ hook. Unfortunately, this hook has to mutate the input object.

```js
schema.pre('init', (doc) => {    
  delete doc.password
})
```

If a hook returns some data it won't be considered.

```js
schema.pre('init', R.omit(['password']))
```

The solution? Make it unpure!

```js
const { unpure } = require('@baethon/pure-mutation')
schema.pre('init', unpure(R.omit(['password'])))
```

## How it works

Both `mutate` and `unpure` methods will create a wrapper around the pure function. When called, it will pass a shallow copy to the wrapped function. The returned value will be mixed-in back to the input object.

The wrapper makes a diff of the keys. If the returned value has some keys missing they will be removed from the input object.

## Custom mutators

It is possible to define custom mutators for selected operations:

- `assign` to assign new values to the input object

- `exclude` to remove the properties that are no longer present in the result of the applied function

This can be used to set values in a non-plain objects (eg. Mongoose models).

```js
const { mutate } = require('@baethon/pure-mutation')
const User = require('./model/user')

const pluckName = ({ name }) => ({ name })
const user = new User({ name: 'Jon', lastname: 'Snow' })

mutate(user, pluckName, {
    assign: (inputRef, values) => inputRef.set(values),
    exclude: (inputRef, keys) => keys.forEach(name => {
        inputRef.set(name, undefined)
    })
})
```

## Testing

```
yarn test
yarn lint
```
