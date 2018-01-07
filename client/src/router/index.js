import Vue from 'vue'
import Router from 'vue-router'
import IndexComponent from '@/components/index.vue'
import AddComponent from '@/components/add.vue'
import EditComponent from '@/components/edit.vue'
import ThemesComponent from '@/components/themes.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexComponent
    },
    {
      path: '/add',
      name: 'add',
      component: AddComponent
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditComponent
    },
    {
      path: '/themes/:id',
      name: 'themes',
      component: ThemesComponent
    }




  ]
})
