import Vue from 'vue'
import App from './App.vue'
import router from './router'

// ここから追加
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faSignOutAlt,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faSignOutAlt,
  faEllipsisV
)

Vue.component('fa', FontAwesomeIcon)
// ここまで追加

// ここから追加
import { firestorePlugin } from 'vuefire'          
import firebase from 'firebase'     
import 'firebase/firestore'

Vue.use(firestorePlugin)

firebase.initializeApp({                
  apiKey: "AIzaSyBIk1PCEYse9mjd3HFb-9rkAsI_niEUuO4",
  authDomain: "twitterlikeapp-66f83.firebaseapp.com",
  databaseURL: "https://twitterlikeapp-66f83.firebaseio.com",
  projectId: "twitterlikeapp-66f83",
  storageBucket: "twitterlikeapp-66f83.appspot.com",
  messagingSenderId: "1011578434602",
  appId: "1:1011578434602:web:4e94f7aa55b6307a637f53",
  measurementId: "G-0CG9MJMTS6"
})

export const db = firebase.firestore()
export const auth = firebase.auth()
// ここまで追加

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
