<template>
  <div>
    <b-card
      ref="cardAction"
      title="انشاء المصانع"
    >
      <form-wizard
        color="#F8CF01"
        :title="null"
        :subtitle="null"
        shape="square"
        finish-button-text="ارسال"
        next-button-text="التالي"
        back-button-text="السابق"
        class="mb-3"
        @on-complete="formSubmitted"
      >
        <!-- accoint details tab -->
        <tab-content
          title="تفاصيل المصنع"
          :before-change="validationForm"
        >
          <validation-observer
            ref="accountRules"
            tag="form"
          >
            <b-row>
              <b-col
                cols="12"
                class="mb-2"
              >
                <h5 class="mb-0">
                  بيانات صاحب المصنع
                </h5>
                <small class="text-muted">
                  من فضلك قم بادخال بيانات المصنع.
                </small>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="الاسم"
                  label-for="name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="الاسم"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="factory.name"
                      :state="errors.length > 0 ? false : null"
                      placeholder="اكتب الاسم"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="البريد الالكتروني"
                  label-for="email"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="email"
                    rules="required|email"
                  >
                    <b-form-input
                      id="email"
                      v-model="factory.email"
                      type="email"
                      :state="errors.length > 0 ? false : null"
                      placeholder="البريد الالكتروني"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="الهاتف"
                  label-for="phone"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="phone"
                    rules="required"
                  >
                    <b-form-input
                      id="phone"
                      v-model="factory.phone"
                      :state="errors.length > 0 ? false : null"
                      placeholder="رقم الهاتف"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="كلمة المرور"
                  label-for="password"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Password"
                    vid="Password"
                    :rules="factoryId ? '' : 'required'"
                  >
                    <b-form-input
                      id="password"
                      v-model="factory.password"
                      type="password"
                      :state="errors.length > 0 ? false : null"
                      placeholder="كلمة المرور"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="تاكيد كلمة المرور"
                  label-for="c-password"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Password Confirm"
                    :rules="factoryId ? '' : 'required|confirmed:Password'"
                  >
                    <b-form-input
                      id="c-password"
                      v-model="passwordCon"
                      type="password"
                      :state="errors.length > 0 ? false : null"
                      placeholder="تاكيد كلمة المرور"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </validation-observer>
        </tab-content>

        <!-- personal details tab -->
        <tab-content
          title="بيانات المصنع"
          :before-change="validationFormInfo"
        >
          <validation-observer
            ref="infoRules"
            tag="form"
          >
            <b-row>
              <b-col
                cols="12"
                class="mb-2"
              >
                <h5 class="mb-0">
                  بيانات المصنع
                </h5>
                <small
                  class="text-muted"
                >استكمال البيانات وكتابة بيانات المصنع.</small>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="الموقع االالكتروني"
                  label-for="website"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="website"
                    rules="required"
                  >
                    <b-form-input
                      id="website"
                      v-model="factory.website"
                      placeholder="الموقع الالكتروني"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group
                  label="اسم التصنيف"
                  label-for="category"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="category"
                    rules="required"
                  >
                    <b-form-select
                      id="category"
                      v-model="factory.category_id"
                      placeholder="اختار التصنيف"
                      value-field="id"
                      text-field="name"
                      :options="categoryOption"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group
                  label="اسم المحافظة"
                  label-for="country"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="country"
                    rules="required"
                  >
                    <b-form-select
                      id="country"
                      v-model="factory.country_id"
                      placeholder="اختار المحافظة"
                      value-field="id"
                      text-field="name"
                      :options="countryOptions"
                      :state="errors.length > 0 ? false : null"
                      @change="changeGov"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group
                  label="اسم المدينة"
                  label-for="city"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="city"
                    rules="required"
                  >
                    <b-form-select
                      id="city"
                      v-model="factory.city_id"
                      placeholder="اختار المدينة"
                      value-field="id"
                      text-field="name"
                      :options="cityOptions"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="رقم الهاتف المباشر"
                  label-for="landline_number"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="landline_number"
                    rules="required"
                  >
                    <b-form-input
                      id="landline_number"
                      v-model="factory.landline_number"
                      :state="errors.length > 0 ? false : null"
                      placeholder="رقم الهاتف المباشر"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="اسم الموظف المباشر"
                  label-for="direct_employee_name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="direct_employee_name"
                    :rules="factoryId ? '' : 'required'"
                  >
                    <b-form-input
                      id="direct_employee_name"
                      v-model="factory.direct_employee_name"
                      placeholder="اسم الموظف المباشر"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="رقم هاتف الموظف المباشر"
                  label-for="direct_employee_phone"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="direct_employee_phone"
                    rules="required"
                  >
                    <b-form-input
                      id="direct_employee_phone"
                      v-model="factory.direct_employee_number"
                      placeholder="رقم هاتف الموظف المباشر"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="سجل المصنع"
                  label-for="factory_register"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="factory_register"
                    rules="required"
                  >
                    <b-form-input
                      id="factory_register"
                      v-model="factory.factory_register"
                      :state="errors.length > 0 ? false : null"
                      placeholder="سجل المصنع"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="صورة سجل المصنع"
                  label-for="factory_register_image"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="factory_register_image"
                    rules="required"
                  >
                    <b-form-file
                      id="factory_register_image"
                      v-model="factory.factory_register_image"
                      type="image"
                      :state="errors.length > 0 ? false : null"
                      placeholder="صورة سجل المصنع"
                      @change="fileFactory"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="صورة سجل المصنع"
                  label-for="letter_image"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="letter_image"
                    rules="required"
                  >
                    <b-form-file
                      id="letter_image"
                      v-model="factory.letter_image"
                      :state="errors.length > 0 ? false : null"
                      placeholder="صورة خطاب المصنع"
                      @change="fileLetter"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="العنوان"
                  label-for="address"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="address"
                    rules="required"
                  >
                    <b-form-input
                      id="address"
                      v-model="factory.address"
                      :state="errors.length > 0 ? false : null"
                      placeholder="العنوان"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </validation-observer>
        </tab-content>
      </form-wizard>
    </b-card>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BFormSelect,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BCard,
  BFormFile,
} from 'bootstrap-vue'
import { required, email } from '@validations'
// import ar from 'vee-validate/dist/locale/ar.json'
// Install English and Arabic locales.
// localize({
//   dic,
// })
const dic = {
  ar: {
    names: {
      email: 'البريد الاليكتروني',
      phone: 'رقم الهاتف',
      Password: 'كلمة السر',
      'Password Confirm': 'تاكيد كلمة المرور',
      website: 'الموقع الالكتروني',
      country: 'المحافظة',
      landline_number: 'الرقم المباشر',
      direct_employee_name: 'اسم الموظف المباشر',
      direct_employee_phone: 'رقم هاتف الموظف المباشر',
      factory_register: 'سجل المصنع',
      factory_register_image: 'صورة سجل المصنع',
      letter_image: 'صورة الخطاب',
      address: 'العنوان',
      category: 'التصنيف',
    },
  },
}
localize('ar', dic.ar)
/* eslint guard-for-in: 0 */
/* eslint no-restricted-syntax: 0 */
export default {
  name: 'CreateFactory',
  components: {
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    BCard,
    BFormFile,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      factory_file: null,
      letter_file: null,
      countryOptions: [],
      cityOptions: [],
      categoryOption: [],
      passwordCon: '',
      factory: {
        name: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        category_id: '1',
        password: '',
        lat: '0.745',
        lng: '0.54',
        website: '',
        landline_number: '',
        direct_employee_name: '',
        direct_employee_number: '',
        factory_register: '',
        factory_register_image: null,
        letter_image: null,
        address: '',
      },
      required,
      email,
      // ? Default locale for VeeValidate is 'en'
      locale: 'ar',
    }
  },
  computed: {
    factoryId() {
      return this.$route.params.id ? this.$route.params.id : null
    },
  },
  created() {
    this.$store.dispatch('common/FETCH_GOV').then(res => {
      this.countryOptions = res.data.data.governorates
    })
    this.$store.dispatch('categories/fetch').then(res => {
      this.categoryOption = res.data.data
    })
    if (this.factoryId) {
      this.getFactory()
    }
  },
  methods: {
    fileFactory(event) {
      // eslint-disable-next-line prefer-destructuring
      this.factory_file = event.target.files[0]
    },
    fileLetter(event) {
      // eslint-disable-next-line prefer-destructuring
      this.letter_file = event.target.files[0]
    },
    changeGov(event) {
      this.$store.dispatch('common/FETCH_CITY', event).then(res => {
        this.cityOptions = res.data.data.cities
      })
    },
    formSubmitted() {
      const formData = new FormData()
      Object.keys(this.factory).forEach(key => formData.append(key, this.factory[key]))
      if (this.factoryId) {
        formData.append('user_id', this.factory.user.id)
        this.$store.dispatch('factory/update', formData).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'تم تعديل المصنع بنجاح',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
        })
      } else {
        this.$store.dispatch('factory/store', formData).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'تم إضافة المصنع بنجاح',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
        })
      }
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.infoRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    getFactory() {
      this.$store.dispatch('factory/fetchByID', this.factoryId).then(res => {
        this.factory = res.data.data
        const { factory } = res.data.data
        for (const prop in factory) {
          this.factory[prop] = factory[prop]
        }
        this.$store
          .dispatch('common/FETCH_CITY', res.data.data.governorate.id)
          .then(res2 => {
            this.cityOptions = res2.data.data.cities
          })
      })
    },
  },
}
</script>
<style scoped></style>
