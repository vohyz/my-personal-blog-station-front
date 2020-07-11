import Vue from 'vue'
import VueRouter from 'vue-router'
import {checkToken} from "../network/user";
import {Authentication} from "../models/response_model";

const Register = () => import('../views/register/register');
const Login = () => import('../views/login/login');

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  //登录界面
  {
    path: '/login',
    component: Login,
    meta: {
      title: '博客-登录',
    }
  },

  //注册界面
  {
    path: '/register',
    component: Register,
    meta: {
      title: '博客-注册'
    }
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

// 全局前置守卫
router.beforeEach((to, from, next) => {

  // 项目标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 需要权限的路由跳转
  if (to.meta.requireAuth) {
    checkToken().then(() => {
      next();
    }).catch(() => {
      // 转向登录页要求用户登录 并带上强制跳转的 query
      next({path: '/login?type=force'});
      Authentication.removeToken();
    });
  } else {
    next();
  }

});

export default router