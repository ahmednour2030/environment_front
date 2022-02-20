import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/middleware/index'

Vue.use(VueRouter)

/**
 *
 * @type {VueRouter}
 */
const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
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
      path: '/add-activities',
      name: 'add-activities',
      component: () => import('@/views/admin/activities/AddActivity'),
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
      path: '/all-activities',
      name: 'all-activities',
      component: () => import('@/views/admin/activities/AllActivity'),
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
      path: '/add-content',
      name: 'add-content',
      component: () => import('@/views/admin/modules-content/content/AddContent'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'إضافة محتوى',
        breadcrumb: [
          {
            text: 'إضافة المحتوى',
            active: true,
          },
        ],
      },
    },
    {
      path: '/all-content',
      name: 'all-content',
      component: () => import('@/views/admin/modules-content/content/AllContent'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'المحتوى',
        breadcrumb: [
          {
            text: 'المحتوى',
            active: true,
          },
        ],
      },
    },
    {
      path: '/add-point',
      name: 'add-point',
      component: () => import('@/views/admin/modules-content/point/AddPoint'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'إضافة نقطة',
        breadcrumb: [
          {
            text: 'إضافة نقطة',
            active: true,
          },
        ],
      },
    },
    {
      path: '/all-point',
      name: 'all-point',
      component: () => import('@/views/admin/modules-content/point/AllPoint'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'النقاط',
        breadcrumb: [
          {
            text: 'النقاط',
            active: true,
          },
        ],
      },
    },
    {
      path: '/add-link',
      name: 'add-link',
      component: () => import('@/views/admin/modules-content/link/AddLink'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'إضافة رابط',
        breadcrumb: [
          {
            text: 'إضافة رابط',
            active: true,
          },
        ],
      },
    },
    {
      path: '/all-link',
      name: 'all-link',
      component: () => import('@/views/admin/modules-content/link/AllLink'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الروابط',
        breadcrumb: [
          {
            text: 'الروابط',
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
      path: '/students',
      name: 'students',
      component: () => import('@/views/admin/students/AllStudents'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الطلاب',
        breadcrumb: [
          {
            text: 'الطلاب',
            active: true,
          },
        ],
      },
    },
    {
      path: '/students/exams/:id',
      name: 'students-exams',
      component: () => import('@/views/admin/students/ExamsStudent'),
      meta: {
        authRequired: true,
        role: 'admin',
        pageTitle: 'الطلاب',
        breadcrumb: [
          {
            text: 'الطلاب',
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
