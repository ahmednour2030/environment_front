export default [
  // {
  //   header: 'Apps & Pages',
  // },
  {
    title: 'الصفحة الرئيسية',
    route: 'home',
    icon: 'HomeIcon',
    role: 'admin',
  },
  {
    title: 'الأقسام',
    icon: 'FolderMinusIcon',
    role: 'admin',
    children: [
      {
        title: 'إضافة قسم',
        route: 'add-category',
      },
      {
        title: 'كافة الأقسام',
        route: 'all-category',
      },
    ],
  },
  {
    title: 'الاستبيانات',
    route: 'second-page',
    icon: 'HelpCircleIcon',
    role: 'admin',
    children: [
      {
        title: 'إضافة الاستبيان',
        route: 'add-questionnaires',
      },
      {
        title: 'كل الاستبيانات',
        route: 'questionnaires',
      },
    ],
  },
  {
    title: 'الموديول',
    route: 'second-page',
    icon: 'BookIcon',
    role: 'admin',
    children: [
      {
        title: 'إضافة موديول',
        route: 'modulesCreate',
      },
      {
        title: 'إضافة محتوى الموديول',
        route: 'modulesDataCreate',
      },
      {
        title: 'كل الموديولات',
        route: 'modulesIndex',
      },
    ],
  },
  {
    title: 'الاسئة',
    route: 'second-page',
    icon: 'HelpCircleIcon',
    role: 'admin',
    children: [
      {
        title: 'إضافة سؤال',
        route: 'add-questions',
      },
      {
        title: 'اضافة اختبار',
        route: 'exams-create',
      },
      {
        title: 'الاختبارات',
        route: 'exams',
      },
    ],
  },
  {
    title: 'الملاحظات',
    icon: 'ListIcon',
    role: 'admin',
    children: [
      {
        title: 'اضافة ملاحظة',
        route: 'notes-create',
      },
      {
        title: ' الملاحظات',
        route: 'notes',
      },
    ],
  },
  {
    title: 'المكتبة',
    icon: 'BriefcaseIcon',
    role: 'admin',
    children: [
      {
        title: 'انشاء مكتبة',
        route: 'libraries-create',
      },
      {
        title: 'المكتبة',
        route: 'libraries',
      },
    ],
  },

  // {
  //   title: 'الطلاب',
  //   icon: 'UsersIcon',
  //   role: 'admin',
  //   children: [
  //     {
  //       title: 'كافة الطلاب',
  //       route: 'customers',
  //     },
  //     {
  //       title: 'أخر المسجلين',
  //       route: 'lastCustomers',
  //     },
  //   ],
  // },
  {
    title: 'الادمن',
    route: 'admins',
    icon: 'UserIcon',
    role: 'admin',
  },
  // {
  //   title: 'الرسائل',
  //   route: 'messages',
  //   icon: 'MessageCircleIcon',
  //   role: 'admin',
  // },
  // {
  //   title: 'المصانع',
  //   icon: 'SettingsIcon',
  //   role: 'admin',
  //   children: [
  //     {
  //       title: 'انشاء مصنع جديد',
  //       route: 'factoryCreate',
  //     },
  //     {
  //       title: 'مصانع جديدة',
  //       route: 'factories',
  //     },
  //     {
  //       title: 'مصانع مفعلة',
  //       route: 'factoriesActive',
  //     },
  //   ],
  // },
  // {
  //   title: 'مقيِّم ضباط الجودة',
  //   route: 'quality-evaluator',
  //   icon: 'UserIcon',
  //   role: 'admin',
  //   children: [
  //     {
  //       title: 'انشاء حساب مقيم الجودة',
  //       route: 'quality-evaluator-create',
  //     },
  //     {
  //       title: 'مقيم ضبط الجودة جديد',
  //       route: 'quality-evaluator-new',
  //     },
  //     {
  //       title: 'مقيم ضبط الجودة مفعل',
  //       route: 'quality-evaluator-active',
  //     },
  //   ],
  // },
  // {
  //   title: 'الشكوى والتقاريير',
  //   route: 'reports.all',
  //   icon: 'HelpCircleIcon',
  //   role: 'admin',
  // },
  // {
  //   title: 'سلايدر',
  //   route: 'sliders.all',
  //   icon: 'SlidersIcon',
  //   role: 'admin',
  // },
  {
    title: 'الإعدادات',
    icon: 'SettingsIcon',
    route: 'setting.all',
    role: 'admin',
  },

  /**
   *  Factory Section
   */
  // {
  //   title: 'طلبات الشركة',
  //   icon: 'UserIcon',
  //   role: 'company',
  //   children: [
  //     {
  //       title: 'الطلبات الجديدة',
  //       route: 'exam.new_order',
  //     },
  //     {
  //       title: 'الطلبات المكتملة',
  //       route: 'exam.complete_order',
  //     },
  //   ],
  // },
  // {
  //   title: 'طلبات المصنع',
  //   icon: 'UserIcon',
  //   role: 'exam',
  //   children: [
  //     {
  //       title: 'الطلبات الجديدة',
  //       route: 'exam.new_order',
  //     },
  //     {
  //       title: 'الطلبات المكتملة',
  //       route: 'exam.complete_order',
  //     },
  //   ],
  // },
  {
    title: 'تسجيل الخروج',
    route: 'login',
    icon: 'LogOutIcon',
    role: 'admin',
  },
  // {
  //   title: 'تسجيل الخروج',
  //   route: 'login',
  //   icon: 'LogOutIcon',
  //   role: 'exam',
  // },
  // {
  //   title: 'تسجيل الخروج',
  //   route: 'login',
  //   icon: 'LogOutIcon',
  //   role: 'company',
  // },
]
