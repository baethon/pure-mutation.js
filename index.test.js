const chai = require('chai')
const { describe, it, beforeEach } = require('mocha')
const sinon = require('sinon')
const { mutate } = require('.')

chai.use(require('sinon-chai'))
const { expect } = chai

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
  })
})
