import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import clonedeep from 'lodash.clonedeep'
import axios from 'axios'
import * as food from '@/store/food'

const localVue = createLocalVue()
localVue.use(Vuex)

let mockAxiosGetResult
jest.mock('axios', () => ({
  $post: jest.fn(() => Promise.resolve(mockAxiosGetResult))
}))

describe('store/user.js', () => {
  let food1
  let store
  beforeEach(() => {
    food1 = {
      name: '玉ねぎ',
      value: '100',
      amount: '300',
      yield: 100,
      unit: 'g',
      comment: 'test',
      image: '~/assets/pasta.jpg'
    }
    store = new Store(clonedeep(food))
  })
  describe('actions', () => {
    beforeEach(() => {
      // store.replaceState({
      //   foods: [food1]
      // })
      store.$axios = axios
      mockAxiosGetResult = {
        name: '玉ねぎ',
        value: '100',
        amount: '300',
        yield: 100,
        unit: 'g',
        comment: 'test',
        image: '~/assets/pasta.jpg'
      }
    })
    describe('registerFood', () => {
      test('リクエストした食材情報が格納されるか', async (done) => {
        const res = await store.dispatch('registerFood')
        expect(res).toEqual(food1)
        done()
      })
      test('getters.foodsに値が反映されるか ', async (done) => {
        expect(store.getters.foods).not.toContainEqual(food1)
        await store.dispatch('registerFood')
        expect(store.getters.foods).toContainEqual(food1)
        done()
      })
    })
  })
})
