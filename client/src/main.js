// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
 import ElementUI from 'element-ui'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql',
})
// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})
// Install the vue plugin
Vue.use(VueApollo)
Vue.use(ElementUI)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
 
Vue.config.productionTip = false

/*Vue.config.optionMergeStrategies.madhouse=function(parent,child,vm,key){

  console.log('*******************************************')
  console.log(parent)
  console.log(child)
  console.log(vm)
  console.log(key)
  console.log('*******************************************')
  return parent
}*/

/* const Father  = {

    template:"<div>123</div>",
    data:function(){
      return {
      }
    },
    madhouse:1
}

const Child = {
    template:"<my-component></my-component>",
    data:function(){
      return {}
    },
    components:{
      "my-component":Father
    },
    madhouse:2,
    mounted:function(){
      console.log('_)_______________________________________________________________________')
      console.log(this)
      console.log('_)_______________________________________________________________________')
    }
} */
/*const Child2 = new Vue({
    template:"<div>{{a}}</div>",
    data:function(){
      return {a:2}
    },
    extends:{
      madhouse:1,
      data:function(){
        return {
          a:1
        }
      }
    },
    madhouse:3
}).$mount("#app")*/










 /*new Vue({
  render:function(createElement){

    return createElement("child","123123")

  },
  data:function(){
    return {

    }
  },
  madhouse:{

    id:1
  },
  components:{

    child:{
      render: function (createElement) {

        return createElement("div",4444)

      },
        data:function(){
          return {

          }
        },
        madhouse:{
          id:2
        }

    }

  }
}).$mount("#app")*/










new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
 