import Vue from 'vue'
import Router from 'vue-router'
import Page1 from '@/components/Page1'
import Page2 from '@/components/Page2'
import Page3 from '@/components/Page3'
import Page4 from '@/components/Page4'
import Page5 from '@/components/Page5'
import Page6 from '@/components/Page6'
import test from '@/components/test'
import GoogleMap from '@/components/GoogleMap'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // Page1画面のパス（URL）を設定
      name: 'GoogleMap', // Page1コンポーネントの名前を設定
      component: GoogleMap // Page1コンポーネントを設定
    },
    {
      path: '/page2', // Page2画面のパス（URL）を設定
      name: 'Page2', // Page2コンポーネントの名前を設定
      component: Page2 // Page2コンポーネントを設定
    },
    {
      path: '/page3', // Page3画面のパス（URL）を設定
      name: 'Page3', // Page3コンポーネントの名前を設定
      component: Page3 // Page3コンポーネントを設定
    },
    {
      path: '/page4', // Page4画面のパス（URL）を設定
      name: 'Page4', // Page4コンポーネントの名前を設定
      component: Page4 // Page4コンポーネントを設定
    },
    {
      path: '/page5', // Page5画面のパス（URL）を設定
      name: 'Page5', // Page5コンポーネントの名前を設定
      component: Page5 // Page5コンポーネントを設定
    },
    {
      path: '/page6', // Page6画面のパス（URL）を設定
      name: 'Page6', // Page6コンポーネントの名前を設定
      component: Page6 // Page6コンポーネントを設定
    },
    {
      path: '/test', // Page6画面のパス（URL）を設定
      name: 'test', // Page6コンポーネントの名前を設定
      component: test // Page6コンポーネントを設定
    }
  ]
})
