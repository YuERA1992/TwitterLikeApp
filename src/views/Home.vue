<template>
  <div class="home">
    <div class="list">
      <Item 
        v-for="whisper in orderBy(TwitterLikeApp,'date',-1)"
        :key="whisper.id"
        :id="whisper.id"
        :uid="whisper.userId" 
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Item from '@/components/Item' 


import { db } from '../main' 

import Vue2Filters from 'vue2-filters' 

export default {
  name: 'home',
  
  // ここから追加
  data () {
    return {
      TwitterLikeApp: []
    }
  },
  firestore () {
    return {
      TwitterLikeApp: db.collection('TwitterLikeApp')
    }
  },
  // ここから追加
  components: {
    Item
  },
  // ここまで追加
 
  // ここを追加
  mixins: [Vue2Filters.mixin] 
  //ここまで追加
}
</script>

<style lang="stylus" scoped>
/* ここから追加 */
.item
  list-style none
  border-top 1px solid #eee
  padding 5px 15px
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  position relative
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
  .user-box
    margin 10px 10px 10px 0
    .avatar
      height 50px
      width 50px
      border-radius 50%
      border 1px solid #eee
      background-size cover
    .user-name
      margin 5px 0 0 0
      text-align center
      font-size .7rem
      line-height .7rem
      width 50px
  .content
    padding 10px
/* ここまで追加 */
</style>
