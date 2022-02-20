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
    title: 'الانشطة',
    icon: 'FolderMinusIcon',
    role: 'admin',
    children: [
      {
        title: 'إضافة نشاط',
        route: 'add-activities',
      },
      {
        title: 'كافة الانشطة',
        route: 'all-activities',
      },
    ],
  },
  {
    title: 'محتوى',
    icon: 'FolderMinusIcon',
    role: 'admin',
    children: [
      {
        title: 'إضافة محتوى',
        route: 'add-content',
      },
      {
        title: 'كافة المحتويات',
        route: 'all-content',
      },
    ],
  },
  {
    title: 'النقاط',
    icon: 'FolderMinusIcon',
    role: 'admin',
    children: [
      {
        title: 'إضافة نقطة',
        route: 'add-point',
      },
      {
        title: 'كافة النقاط',
        route: 'all-point',
      },
    ],
  },
  {
    title: 'الروابط',
    icon: 'FolderMinusIcon',
    role: 'admin',
    children: [
      {
        title: 'إضافة رابط',
        route: 'add-link',
      },
      {
        title: 'كافة الروابط',
        route: 'all-link',
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
        title: 'إضافة كتاب جديد',
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
    title: 'الطلاب',
    route: 'students',
    icon: 'UserIcon',
    role: 'admin',
  },
  // {
  //   title: 'الادمن',
  //   route: 'admins',
  //   icon: 'UserIcon',
  //   role: 'admin',
  // },

  // {
  //   title: 'الإعدادات',
  //   icon: 'SettingsIcon',
  //   route: 'setting.all',
  //   role: 'admin',
  // },

  {
    title: 'تسجيل الخروج',
    route: 'login',
    icon: 'LogOutIcon',
    role: 'admin',
  },
]
