import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/middleware/index'

Vue.use(VueRouter)

/**
 *
 * @type {VueRouter}
 */
const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    /**
     * Admin section
     */
    {
      path: '/',
      name: 'home',
      role: 'admin',
      component: () => import('@/views/Home.vue'),
      meta: {
        authRequired: true,
        pageTitle: 'الصحفة الرئيسية',
        breadcrumb: [
          {
            text: 'الصفحة الرئيسية',
            active: true,
          },
        ],
      },
    },
    {
      path: '/add-category',
      name: 'add-category',
      component: () => import('@/views/admin/category/AddCategory'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'إضافة التصنيفات',
        breadcrumb: [
          {
            text: 'إضافة التصنيفات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/all-category',
      name: 'all-category',
      component: () => import('@/views/admin/category/AllCategory'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'التصنيفات',
        breadcrumb: [
          {
            text: 'التصنيفات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/all-adds',
      name: 'all-adds',
      component: () => import('@/views/admin/adds/receivedAdds'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الاعلانات',
        breadcrumb: [
          {
            text: 'الاعلانات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/add-questionnaires',
      name: 'add-questionnaires',
      component: () => import('@/views/admin/questionnaires/AddQuestionnaire'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'التصنيفات',
        breadcrumb: [
          {
            text: 'التصنيفات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/edit-questionnaires/:id',
      name: 'edit-questionnaires',
      component: () => import('@/views/admin/questionnaires/EditQuestionnaire'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'التصنيفات',
        breadcrumb: [
          {
            text: 'التصنيفات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/questionnaires',
      name: 'questionnaires',
      component: () => import('@/views/admin/questionnaires/AllQuestionnaire'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'التصنيفات',
        breadcrumb: [
          {
            text: 'التصنيفات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/add-questions',
      name: 'add-questions',
      component: () => import('@/views/admin/question/AddQuestion'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'التصنيفات',
        breadcrumb: [
          {
            text: 'التصنيفات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/edit-questions/:id',
      name: 'edit-questions',
      component: () => import('@/views/admin/question/EditQuestion'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'التصنيفات',
        breadcrumb: [
          {
            text: 'التصنيفات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/questions/:id',
      name: 'questions',
      component: () => import('@/views/admin/question/AllQuestions'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'كافة الاسئلة',
        breadcrumb: [
          {
            text: 'التصنيفات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/exams/create',
      name: 'exams-create',
      component: () => import('@/views/admin/exams/AddExam'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'انشاء امتحان',
        breadcrumb: [
          {
            text: 'إنشاء امتحان',
            active: true,
          },
        ],
      },
    },
    {
      path: '/exams',
      name: 'exams',
      component: () => import('@/views/admin/exams/AllExams'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'كافة الامتحانات',
        breadcrumb: [
          {
            text: 'كافة الامتحانات',
            active: true,
          },
        ],
      },
    },

    {
      path: '/notes/create',
      name: 'notes-create',
      component: () => import('@/views/admin/notes/AddNote'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'انشاء امتحان',
        breadcrumb: [
          {
            text: 'إنشاء امتحان',
            active: true,
          },
        ],
      },
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('@/views/admin/notes/AllNote'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'كافة الملاحظات',
        breadcrumb: [
          {
            text: 'كافة الملاحظات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/libraries/create',
      name: 'libraries-create',
      component: () => import('@/views/admin/libraries/AddLibrary'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'انشاء امتحان',
        breadcrumb: [
          {
            text: 'إنشاء امتحان',
            active: true,
          },
        ],
      },
    },
    {
      path: '/libraries',
      name: 'libraries',
      component: () => import('@/views/admin/libraries/AllLibrary'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'كافة الامتحانات',
        breadcrumb: [
          {
            text: 'كافة الامتحانات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/received_adds',
      name: 'receivedAdds',
      component: () => import('@/views/admin/adds/receivedAdds'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الاعلانات المستلمه',
        breadcrumb: [
          {
            text: 'الاعلانات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/accepted_orders',
      name: 'acceptedAdds',
      component: () => import('@/views/admin/adds/acceptedAdds'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الاعلانات تمت المراجعه',
        breadcrumb: [
          {
            text: 'الاعلانات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/accepted-orders',
      name: 'acceptedOrders',
      component: () => import('@/views/admin/orders/AcceptedOrders'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الطلبات',
        breadcrumb: [
          {
            text: 'الطلبات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/waiting-orders',
      name: 'waitingOrders',
      component: () => import('@/views/admin/orders/WaitingOrders'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الطلبات',
        breadcrumb: [
          {
            text: 'الطلبات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/freelancers',
      name: 'freelancers',
      component: () => import('@/views/admin/freelancers/AllFreelancers'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'العماله الحرة',
        breadcrumb: [
          {
            text: 'العماله الحرة',
            active: true,
          },
        ],
      },
    },
    {
      path: '/freelancers/active',
      name: 'freelancersActive',
      component: () => import('@/views/admin/freelancers/ActiveFreelancers'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'العماله الحرة',
        breadcrumb: [
          {
            text: 'العماله الحرة',
            active: true,
          },
        ],
      },
    },
    {
      path: '/companies',
      name: 'companies',
      component: () => import('@/views/admin/companies/AllCompanies'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الشركات',
        breadcrumb: [
          {
            text: 'الشركات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/companies/add',
      name: 'createCompany',
      component: () => import('@/views/admin/companies/CreateCompany'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'إضافة شركة',
        breadcrumb: [
          {
            text: 'إضافة شركة',
            active: true,
          },
        ],
      },
    },
    {
      path: '/companies/edit/:id',
      name: 'editCompany',
      component: () => import('@/views/admin/companies/CreateCompany'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'تعديل شركة',
        breadcrumb: [
          {
            text: 'تعديل شركة',
            active: true,
          },
        ],
      },
    },
    {
      path: '/companies/active',
      name: 'companiesActive',
      component: () => import('@/views/admin/companies/ActiveCompanies'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الشركات',
        breadcrumb: [
          {
            text: 'الشركات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import('@/views/admin/customers/AllCustomers'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'العملاء',
        breadcrumb: [
          {
            text: 'العملاء',
            active: true,
          },
        ],
      },
    },
    {
      path: '/last-customers',
      name: 'lastCustomers',
      component: () => import('@/views/admin/customers/LastCustomers'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'العملاء',
        breadcrumb: [
          {
            text: 'العملاء',
            active: true,
          },
        ],
      },
    },
    {
      path: '/admins',
      name: 'admins',
      component: () => import('@/views/admin/admins/AllAdmins'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الادمن',
        breadcrumb: [
          {
            text: 'الادمن',
            active: true,
          },
        ],
      },
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/views/admin/messages/Messages'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الرسائل',
        breadcrumb: [
          {
            text: 'الادمن',
            active: true,
          },
        ],
      },
    },
    {
      path: '/wedding/create',
      name: 'wedding',
      component: () => import('@/views/admin/wedding/CreateWedding'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'قاعة افراح جديدة',
        breadcrumb: [
          {
            text: 'قاعات الافراح',
            active: true,
          },
        ],
      },
    },
    {
      path: '/wedding/edit/:id',
      name: 'weddingُEdit',
      component: () => import('@/views/admin/wedding/CreateWedding'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'تعديل قاعة افراح ',
        breadcrumb: [
          {
            text: 'قاعات الافراح',
            active: true,
          },
        ],
      },
    },
    {
      path: '/wedding',
      name: 'weddingAll',
      component: () => import('@/views/admin/wedding/AllWedding'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'قاعات الافراح',
        breadcrumb: [
          {
            text: 'قاعات الافراح',
            active: true,
          },
        ],
      },
    },
    {
      path: '/wedding/active',
      name: 'ActiveWedding',
      component: () => import('@/views/admin/wedding/ActiveWedding'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'قاعات الافراح',
        breadcrumb: [
          {
            text: 'قاعات الافراح',
            active: true,
          },
        ],
      },
    },
    {
      path: '/exam/create',
      name: 'factoryCreate',
      component: () => import('@/views/admin/factories/CreateFactory'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'إضافة امتحان',
        breadcrumb: [
          {
            text: 'اضافة امتحان',
            active: true,
          },
        ],
      },
    },
    {
      path: '/exam/edit/:id',
      name: 'factoryEdit',
      component: () => import('@/views/admin/factories/CreateFactory'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'تعديل الامتحان',
        breadcrumb: [
          {
            text: 'تعديل الامتحان',
            active: true,
          },
        ],
      },
    },
    {
      path: '/modules/create',
      name: 'modulesCreate',
      component: () => import('@/views/admin/modules/AddModule'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'تعديل الامتحان',
        breadcrumb: [
          {
            text: 'تعديل الامتحان',
            active: true,
          },
        ],
      },
    },
    {
      path: '/modules',
      name: 'modulesIndex',
      component: () => import('@/views/admin/modules/AllModule'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'تعديل الامتحان',
        breadcrumb: [
          {
            text: 'تعديل الامتحان',
            active: true,
          },
        ],
      },
    },
    {
      path: '/modules/data/create',
      name: 'modulesDataCreate',
      component: () => import('@/views/admin/modules/AddModuleData'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'تعديل الامتحان',
        breadcrumb: [
          {
            text: 'تعديل الامتحان',
            active: true,
          },
        ],
      },
    },
    {
      path: '/modules/data/update:id',
      name: 'modulesDataEdit',
      component: () => import('@/views/admin/factories/CreateFactory'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'تعديل الامتحان',
        breadcrumb: [
          {
            text: 'تعديل الامتحان',
            active: true,
          },
        ],
      },
    },

    {
      path: '/quality-evaluator/create',
      name: 'quality-evaluator-create',
      component: () => import('@/views/admin/quality-evaluator/CreateQualityEvaluator'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'انشاء حساب مقيم الجودة',
        breadcrumb: [
          {
            text: 'انشاء حساب مقيم الجودة الجودة',
            active: true,
          },
        ],
      },
    },
    {
      path: '/quality-evaluator/edit/:id',
      name: 'quality-evaluator-edit',
      component: () => import('@/views/admin/quality-evaluator/CreateQualityEvaluator'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'تعديل حساب مقيم الجودة',
        breadcrumb: [
          {
            text: 'تعديل حساب مقيم الجودة الجودة',
            active: true,
          },
        ],
      },
    },
    {
      path: '/setting/all-settings',
      name: 'setting.all',
      component: () => import('@/views/admin/setting/AllSettings'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الإعدادات',
        breadcrumb: [
          {
            text: 'الإعدادات',
            active: true,
          },
        ],
      },
    },
    {
      path: '/reports/all-reports',
      name: 'reports.all',
      component: () => import('@/views/admin/reports/AllReports'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'التقارير',
        breadcrumb: [
          {
            text: 'التقارير',
            active: true,
          },
        ],
      },
    },
    {
      path: '/slider/all-sliders',
      name: 'sliders.all',
      component: () => import('@/views/admin/slider/AllSliders'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'المنزلق',
        breadcrumb: [
          {
            text: 'المنزلق',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        authRequired: false,
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/admin/error/Error404.vue'),
      meta: {
        authRequired: false,
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    if (!auth.isAuthenticated()) {
      // return next()
      return router.push({ path: 'login', query: { to: to.path } })
    }
    // if (to.meta.role !== auth.role()) {
    //   console.log(auth.role())
    //   return router.push({ path: '/' })
    // }
  }
  if (to.meta.login) {
    if (auth.isAuthenticated()) {
      // return next()
      return router.push({ path: '/' })
    }
  }
  return next()
})
export default router
