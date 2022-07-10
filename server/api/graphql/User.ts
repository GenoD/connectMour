import { extendType, objectType } from 'nexus'
// import operations from '../operations'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id', {
      description: 'User ID',
    })
    t.string('email', {
      description: 'User email',
    })
    t.string('firstName', {
      description: 'First Name',
    })
    t.string('lastName', {
      description: 'Last Name',
    })
  }
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('getUsers', {
      type: 'User',
      resolve() {
        // const users = await operations.getUsers()
        // return users
        console.log('resolving!!!')
        return [{ id: 1, firstName: 'Geno ', lastName: 'Diaz', email: 'email@email.com' }]
      }
    })
  }
})