const chai = require('chai')
const { describe, it, beforeEach } = require('mocha')
const sinon = require('sinon')
const { mutate, unpure } = require('.')

chai.use(require('sinon-chai'))
const { expect } = chai

const pluckName = ({ name }) => ({ name })

describe('@baethon/pure-mutation', () => {
  let user

  beforeEach(() => {
    user = {
      name: 'Jon',
      lastname: 'Snow',
      familyName: 'Stark'
    }
  })

  describe('mutate()', () => {
    it('mutates existing properties', () => {
      mutate(user, (data) => ({
        ...data,
        familyName: 'King of the north'
      }))

      expect(user).to.have.property('familyName', 'King of the north')
    })

    it('appends new keys', () => {
      mutate(user, (data) => ({
        ...data,
        king: true
      }))

      expect(user).to.have.property('king', true)
    })

    it('removes deleted keys', () => {
      mutate(user, ({ familyName, ...data }) => data)
      expect(user).not.to.have.property('familyName')
    })

    it('passes new ref to callback', () => {
      const stub = sinon.stub().returns({ name: 'Jon' })
      mutate(user, stub)

      expect(stub).to.have.been.calledWith(sinon.match((data) => data !== user))
    })

    describe('mutatorOps', () => {
      it('allows to pass assign fn', () => {
        mutate(user, pluckName, {
          assign: (inputRef, values) => {
            inputRef.values = values
          }
        })

        expect(user.values).to.eql({ name: 'Jon' })
      })

      it('allows to pass exclude fn', () => {
        mutate(user, pluckName, {
          exclude: (inputRef, keys) => {
            inputRef.values = keys
          }
        })

        expect(user.values).to.eql(['lastname', 'familyName'])
      })
    })
  })

  describe('unpure()', () => {
    it('converts pure function to non-pure function', () => {
      const fn = unpure(pluckName)

      fn(user)

      expect(user).to.eql({
        name: 'Jon'
      })
    })

    describe('mutatorOps', () => {
      it('allows to pass assign fn', () => {
        const fn = unpure(pluckName, {
          assign: (inputRef, values) => {
            inputRef.values = values
          }
        })

        fn(user)

        expect(user.values).to.eql({ name: 'Jon' })
      })

      it('allows to pass exclude fn', () => {
        const fn = unpure(pluckName, {
          exclude: (inputRef, keys) => {
            inputRef.values = keys
          }
        })

        fn(user)

        expect(user.values).to.eql(['lastname', 'familyName'])
      })
    })
  })
})
