const routes = [
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/setting",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/SettingPage.vue") }],
  },
  {
    path: "/signin",
    component: () => import("pages/SignInPage.vue"),
  },

  {
    path: "/account",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AccountPage.vue") }],
  },
  {
    path: "/transfer",
    component: () => import("pages/TransferPage.vue"),
  },
  {
    path: "/confirm",
    component: () => import("pages/ConfirmPage.vue"),
  },
  {
    path: "/slip",
    component: () => import("pages/SlipPage.vue"),
  },
  {
    path: "/qrcode",
    component: () => import("pages/QrCode.vue"),
  },
  {
    path: "/myqrcode",
    component: () => import("pages/MyQRCode.vue"),
  },
  {
    path: "/paybill",
    component: () => import("pages/PayBillPage.vue"),
  },
  {
    path: "/",
    component: () => import("pages/LogoPage.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
