import { JSEncrypt } from 'jsencrypt'
import store from '@/store/index'

// 加密过程(判断publicKey)
export function encrypt(str, pubkey) {
  return new Promise(function(resolve, reject) {
    const jse = new JSEncrypt()
    pubkey = pubkey || store.state.publicKey.publicKey
    if (!pubkey) {
      store.dispatch('publicKey/AddPublicKey').then(res => {
        jse.setPublicKey(res.RSAPublicKey)
        resolve(jse.encrypt(str))
      })
    } else {
      jse.setPublicKey(pubkey)
      resolve(jse.encrypt(str))
    }
  })
}

// 加密过程(不判断publicKey)
export function Encrypt(str, pubkey) {
  return new Promise(function(resolve, reject) {
    const jse = new JSEncrypt()
    store.dispatch('publicKey/AddPublicKey').then(res => {
      jse.setPublicKey(res.RSAPublicKey)
      resolve(jse.encrypt(str))
    })
  })
}

// 解密过程
export function decrypt(str, priKey) {
  const jse = new JSEncrypt()
  jse.setPrivateKey(priKey)
  return jse.decrypt(str)
}
