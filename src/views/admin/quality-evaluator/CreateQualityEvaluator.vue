<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        :title="`${qualityId ? 'تعديل مقيم جودة' : 'إضافة مقيم جودة'}`"
      >
        <validation-observer ref="simpleRules">
          <b-form>
            <b-row>
              <!-- name -->
              <b-col md="4">
                <b-form-group
                  label="اسم مقيم الخدمة"
                  label-for="name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="name"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="quality.name"
                      :state="errors.length > 0 ? false : null"
                      placeholder="اسم مقيم الخدمة"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- email -->
              <b-col md="4">
                <b-form-group
                  label="البريد الالكتروني"
                  label-for="email"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="email"
                    rules="required"
                  >
                    <b-form-input
                      id="email"
                      v-model="quality.email"
                      :state="errors.length > 0 ? false : null"
                      placeholder="اسم مقيم الخدمة"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- phone -->
              <b-col md="4">
                <b-form-group
                  label="رقم الهاتف"
                  label-for="phone"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="phone"
                    rules="required"
                  >
                    <b-form-input
                      id="phone"
                      v-model="quality.phone"
                      type="number"
                      :state="errors.length > 0 ? false : null"
                      placeholder="رقم الهاتف"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- password -->
              <b-col md="4">
                <b-form-group
                  label="كلمة المرور"
                  label-for="password"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="password"
                    :rules="qualityId ? '' : 'required'"
                  >
                    <b-form-input
                      id="password"
                      v-model="quality.password"
                      type="password"
                      :state="errors.length > 0 ? false : null"
                      placeholder="كلمة المرور"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="تاكيد كلمة المرور"
                  label-for="c-password"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Password Confirm"
                    :rules="qualityId ? '' : 'required|confirmed:password'"
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
              <b-col md="4">
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
                      v-model="quality.category_id"
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
              <b-col md="4">
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
                      v-model="quality.address"
                      placeholder="العنوان"
                      value-field="id"
                      text-field="name"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="اسم المنطقة"
                  label-for="country"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="country"
                    rules="required"
                  >
                    <b-form-select
                      id="country"
                      v-model="quality.country_id"
                      placeholder="اختار المنطقة"
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
              <b-col md="4">
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
                      v-model="quality.city_id"
                      placeholder="اختار المدينة"
                      value-field="id"
                      text-field="name"
                      :options="cityOptions"
                      :disabled="cityOptions.length === 0"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- create button -->
              <b-col cols="12">
                <b-button
                  variant="primary"
                  type="submit"
                  @click.prevent="validationForm"
                >
                  {{ qualityId ? 'تعديل' : 'إضافة' }} مقيم الخدمة
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required } from '@/@core/utils/validations/validations'
import {
  BCard,
  BCardGroup,
  BButton,
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BFormSelect,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dic = {
  ar: {
    names: {
      name: 'الاسم',
      email: 'البريد الاليكتروني',
      phone: 'رقم الهاتف',
      Password: 'كلمة السر',
      'Password Confirm': 'تاكيد كلمة المرور',
      website: 'الموقع الالكتروني',
      country: 'المنطقة',
      city: 'المدينة',
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

export default {
  name: 'AddCategory',
  components: {
    ValidationProvider,
    ValidationObserver,
    BCard,
    BCardGroup,
    BButton,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BFormSelect,
  },
  data() {
    return {
      category_file: null,
      categoryOption: [],
      quality: {
        name: '',
        email: '',
        phone: '',
        password: '',
        country_id: '',
        city_id: '',
        address: '',
        lat: '0.745',
        lng: '0.54',
        category_id: '',
      },
      countryOptions: [],
      passwordCon: '',
      cityOptions: [],
      confirmedPassword: '',
      required,
    }
  },
  computed: {
    qualityId() {
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
    if (this.qualityId) {
      this.getQuality()
      this.quality.lat = 30
      this.quality.lng = 30
    }
  },
  methods: {
    changeGov(event) {
      this.$store.dispatch('common/FETCH_CITY', event).then(res => {
        this.cityOptions = res.data.data.cities
      })
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          if (!this.qualityId) {
            this.$store.dispatch('quality/store', this.quality).then(() => {
              this.quality = {}
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'تم إضافة مقيم الجودة بنجاح',
                  icon: 'CheckCircleIcon',
                  variant: 'success',
                },
              })
            })
          } else {
            this.quality.user_id = this.qualityId
            delete this.quality.avatar
            this.$store.dispatch('quality/update', this.quality).then(() => {
              this.quality = {}
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'تم تعديل مقيم الجودة بنجاح',
                  icon: 'CheckCircleIcon',
                  variant: 'success',
                },
              })
            })
          }
        }
      })
    },
    fileCategory(event) {
      // eslint-disable-next-line prefer-destructuring
      this.category_file = event.target.files[0]
    },
    getQuality() {
      this.quality = this.$store.state.quality.editUser
      this.changeGov(this.quality.country_id)
    },
  },
}
</script>

<style scoped></style>
