<template>
 <header>
    <router-link to="/">
      <h1>whisp.</h1>
    </router-link>
    <div class="btns">
      <!-- ここから追加 -->
      <div v-if="currentUser" class="btns">
        <button :style="'background-image: url('+currentUser.photoURL+')'"></button>
        <button>
          
          <fa icon="sign-out-alt" @click="signOut" />

        </button>
      </div>
      <div v-else class="btns">
        <button>
          <fa icon="user" @click="signIn" />
        </button>
      </div>
      <!-- ここまで追加 -->
    </div>
  </header>
</template>

<script>
import firebase from 'firebase'

import { auth } from '../main' // mainからauthをインポートする

import { db } from '../main' // ここを追加

export default {
  // ここから追加
  data () {
    return {
      currentUser: {}    
    }
  },
  created () {
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
  // ここまで追加
  
  // ここから追加
  methods: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
      .then((result) => {

        this.$router.push('/user/'+result.user.userId) // ここを追加
        
        alert('こんにちは、'+result.user.displayName+'さん！')
      })
    },
    createUser (user) {
      db.collection('users').doc(user.userId).set({
        'name': user.displayName,
        'photoURL': user.photoURL,
        'email':user.email
      }, { merge: true })
    },
    signOut () {
      if (window.confirm('まじでログアウトするん?')) {
        auth.signOut()
        .then(() => {
          alert('ログアウトできたやで')
          this.$router.push('/'),
          location.reload()
        })
      }
    }
  }
  // ここまで追加
}

</script>


<style lang="stylus" scoped>
header
  position fixed
  top 0
  width 100%
  text-align center
  padding 10px
  h1
    width fit-content
    margin 0 auto
    font-size 1.4rem
  .btns
    position absolute
    top 10px
    right 30px
    cursor pointer
    img
      width 100%
</style>