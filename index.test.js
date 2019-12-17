const chai = require('chai')
const { describe, it, beforeEach } = require('mocha')
const sinon = require('sinon')
const pureMutation = require('.')

chai.use(require('sinon-chai'))
const { expect } = chai

describe('pureMutation', () => {
  let user

  beforeEach(() => {
    user = {
      name: 'Jon',
      lastname: 'Snow',
      familyName: 'Stark'
    }
  })

  it('mutates existing properties', () => {
    pureMutation(user, (data) => ({
      ...data,
      familyName: 'King of the north'
    }))

    expect(user).to.have.property('familyName', 'King of the north')
  })

  it('appends new keys', () => {
    pureMutation(user, (data) => ({
      ...data,
      king: true
    }))

    expect(user).to.have.property('king', true)
  })

  it('removes deleted keys', () => {
    pureMutation(user, ({ familyName, ...data }) => data)
    expect(user).not.to.have.property('familyName')
  })

  it('passes new ref to callback', () => {
    const stub = sinon.stub().returns({ name: 'Jon' })
    pureMutation(user, stub)

    expect(stub).to.have.been.calledWith(sinon.match((data) => data !== user))
  })
})
