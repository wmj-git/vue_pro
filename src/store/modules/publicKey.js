import { getPbk } from '@/api/user'

const state = {
  publicKey: '',
  random: ''
}

const mutations = {
  SET_PUBLICKEY: (state, key) => {
    console.log('key', key)
    state.publicKey = key.RSAPublicKey
    state.random = key.random
  }
}

const actions = {
  AddPublicKey({ commit }, key) {
    return new Promise(function(resolve, reject) {
      getPbk().then(res => {
        commit('SET_PUBLICKEY', res.data)
        resolve(res.data)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
