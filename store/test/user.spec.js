import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import clonedeep from 'lodash.clonedeep'
import axios from 'axios'
import * as user from '@/store/user'

const localVue = createLocalVue()
localVue.use(Vuex)

let mockAxiosGetResult
jest.mock('axios', () => ({
  $post: jest.fn(() => Promise.resolve(mockAxiosGetResult))
}))

describe('store/user.js', () => {
  let user1
  let store
  beforeEach(() => {
    user1 = {
      userId: 1,
      email: 'test@test.com',
      password: '123456'
    }
    store = new Store(clonedeep(user))
  })
  describe('actions', () => {
    beforeEach(() => {
      store.$axios = axios
    })
    describe('signUp', () => {
      test('リクエストしたuser情報が格納されるか', async (done) => {
        mockAxiosGetResult = {
          userId: user1.userId,
          email: user1.email,
          password: user1.password
        }
        const res = await store.dispatch('signUp')
        expect(res).toEqual(user1)
        done()
      })
    })
  })
})
