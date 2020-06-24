<template>
  <div id="user">
    <div class="user-title">
      <div class="avatar" :style="'background-image: url('+user.photoURL+')'"></div>
      <div class="texts">
        <h1>{{user.name}}</h1>
        <!-- ここから追加 -->
        <p v-if="myWhispers.length > 1">{{myWhispers.length}} whispers</p>
        <p v-else>{{myWhispers.length}} whisper</p>
        <!-- ここまで追加 -->
 
      </div>
      <!-- ここから追加 -->
      <div class="list">
        <Editor :currentUser="currentUser"/> 

        <Item 
          v-for="whisper in orderBy(myWhispers,'date',-1)"
          :key="whisper.id" 
          :id="whisper.id"
          :uid="whisper.uid" 
        />
    </div>
    <!-- ここまで追加 -->
 
    </div>
  </div>
</template>

<script>
import { db } from '../main'

// import firebase from 'firebase' 

// ここを追加
import { auth } from '../main'

// ここを追加
import Item from '@/components/Item' 
  
// ここを追加
import Vue2Filters from 'vue2-filters' 

// ここを追加
import Editor from '@/components/Editor'

export default {
  // ここから追加
  components: {
    Item,
    Editor // ここを追加
  },
  // ここまで追加
  data () {
    return {
      user: {},
      myWhispers: [], // ここを追加
      currentUser: {} // ここを追加
    }
  },
  firestore () {
    return {
      user: db.collection('users').doc(this.$route.params.userId),
      myWhispers: db.collection('whispers').where('uid','==',this.$route.params.uid) // ここを追加

    }
  },
  // ここから追加
  created () {
    auth.onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
  // ここまで追加
  
  mixins: [Vue2Filters.mixin] // ここを追加


}
</script>

<style lang="stylus" scoped>
.user-title
  display flex
  flex-wrap nowrap
  justify-content flex-start
  margin 10px 0
  .avatar
    width 50px
    height 50px
    border-radius 5px
    background-size cover
  .texts
    margin-left 10px
    h1
      font-size 1.5rem
      margin 0
    p
      font-size .8rem
      margin 0
</style>