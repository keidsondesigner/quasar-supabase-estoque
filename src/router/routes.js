const routes = [
  { // Rotas não Logadas
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/LoginPage.vue') },
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmationPage.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPasswordPage.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPasswordPage.vue') },
    ],
  },
  { // Rotas Logadas
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('pages/MePage.vue') },
      { path: 'list-category', name: 'list-category', component: () => import('pages/category/ListCategory.vue') },
      { path: 'form-category/:id?', name: 'form-category', component: () => import('pages/category/FormCategory.vue') },
      { path: 'list-products', name: 'list-products', component: () => import('pages/product/ListProducts.vue') },
      { path: 'form-product/:id?', name: 'form-product', component: () => import('pages/product/FormProduct.vue') },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
