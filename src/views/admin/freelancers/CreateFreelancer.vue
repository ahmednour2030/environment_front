<template>
  <b-modal
    id="CreateFreelancer"
    cancel-variant="outline-secondary"
    ok-title="اضافة اعمال حرة"
    cancel-title="الغاء"
    centered
    size="lg"
    title="اضافة اعمال  حرة"
    @ok.prevent="update"
  >
    <validation-observer ref="accountRules">
      <b-form>
        <b-row>
          <!-- name -->
          <b-col md="6">
            <b-form-group
              label="الاسم"
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="name"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="userObj.name"
                  :state="errors.length > 0 ? false : null"
                  placeholder="الاسم"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="التليفون"
              label-for="phone"
            >
              <validation-provider
                #default="{ errors }"
                name="phone"
                rules="required"
              >
                <b-form-input
                  id="phone"
                  v-model="userObj.phone"
                  :state="errors.length > 0 ? false : null"
                  placeholder="التليفون"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="الإيميل"
              label-for="email"
            >
              <validation-provider
                #default="{ errors }"
                name="email"
                rules="required"
              >
                <b-form-input
                  id="email"
                  v-model="userObj.email"
                  :state="errors.length > 0 ? false : null"
                  placeholder="الايميل"
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
                  v-model="userObj.address"
                  :state="errors.length > 0 ? false : null"
                  placeholder="العنوان"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="كلمة السر"
              label-for="password"
            >
              <validation-provider
                #default="{ errors }"
                name="password"
                rules="required"
              >
                <b-form-input
                  id="password"
                  v-model="userObj.password"
                  type="password"
                  :state="errors.length > 0 ? false : null"
                  placeholder="كلمة السر"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="تليفون الموظف"
              label-for="employer_phone"
            >
              <validation-provider
                #default="{ errors }"
                name="employer_phone"
                rules="required"
              >
                <b-form-input
                  id="employer_phone"
                  v-model="userObj.employer_phone"
                  :state="errors.length > 0 ? false : null"
                  placeholder="تليفون الموظف"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="اسم الموظف"
              label-for="employer_name"
            >
              <validation-provider
                #default="{ errors }"
                name="employer_name"
                rules="required"
              >
                <b-form-input
                  id="employer_name"
                  v-model="userObj.employer_name"
                  :state="errors.length > 0 ? false : null"
                  placeholder="اسم الموظف"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="صورة شهادة التخصص"
              label-for="factory_register_image"
            >
              <validation-provider
                #default="{ errors }"
                name="factory_register_image"
                rules="required"
              >
                <b-form-file
                  id="factory_register_image"
                  v-model="image"
                  type="image"
                  :state="errors.length > 0 ? false : null"
                  placeholder="صورة شهادة التخصص"
                  @change="fileFactory"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="الموقع"
              label-for="website"
            >
              <validation-provider
                #default="{ errors }"
                name="website"
                rules="required"
              >
                <b-form-input
                  id="website"
                  v-model="userObj.website"
                  :state="errors.length > 0 ? false : null"
                  placeholder="الموقع"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="المنطقة"
              label-for="type"
            >
              <validation-provider
                #default="{ errors }"
                name="type"
                rules="required"
              >
                <b-form-select
                  id="country"
                  v-model="userObj.country_id"
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
          <b-col md="6">
            <b-form-group
              label="المدينه"
              label-for="city"
            >
              <validation-provider
                #default="{ errors }"
                name="city"
                rules="required"
              >
                <b-form-select
                  id="city"
                  v-model="userObj.city_id"
                  placeholder="اختار المدينه"
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
          <b-col md="6">
            <b-form-group
              label="التصنيف"
              label-for="category"
            >
              <validation-provider
                #default="{ errors }"
                name="category"
                rules="required"
              >
                <b-form-select
                  id="category"
                  v-model="userObj.category_id"
                  value-field="id"
                  text-field="name"
                  placeholder="اختار التصنيف"
                  :options="FreelancerCategories"
                  :state="errors.length > 0 ? false : null"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="حالة العمل"
              label-for="work_status"
            >
              <validation-provider
                #default="{ errors }"
                name="status"
                rules="required"
              >
                <b-form-select
                  id="work_status"
                  v-model="userObj.work_status"
                  value-field="id"
                  text-field="name"
                  placeholder="اختار حالة العمل"
                  :options="workStatus"
                  :state="errors.length > 0 ? false : null"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required } from '@/@core/utils/validations/validations'
import {
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BFormSelect,
  BModal,
  BFormFile,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      name: 'الاسم',
      type: 'ألنوع',
      image: 'صورة التصنيف',
      phone: 'الهاتف',
      email: 'البريد الالكتروني',
      address: 'العنوان',
      password: 'كلمة السر',
      employer_phone: 'تليفون الموظف',
      employer_name: 'اسم الموظف',
      website: 'الموقع',
      country: 'المنطقة',
      city: 'المدينة',
      work_status: 'حالة العمل',
      factory_register_image: 'صورة شهادة التخصص',
      category: 'التصنيف',
      status: 'الحالة',
    },
  },
}
localize('ar', dictionary.ar)
export default {
  name: 'EditCategory',
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BFormSelect,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    BFormFile,
  },
  data() {
    return {
      countryOptions: [],
      FreelancerCategories: [],
      cityOptions: [],
      image: null,
      factory_file: null,
      workStatus: [
        {
          name: 'دوام كلي',
          id: 'full_time',
        },
        {
          name: 'عمل',
          id: 'work',
        },
      ],
      required,
    }
  },
  computed: {
    userObj() {
      const user = {}
      user.lat = 10.323
      user.lng = 21.5445
      return user
    },
  },
  created() {
    this.fetchFreelancerCategories()
    this.fetchGov()
  },
  methods: {
    update() {
      this.$refs.accountRules.validate().then(success => {
        if (success) {
          const formData = new FormData()
          Object.keys(this.userObj).forEach(key => formData.append(key, this.userObj[key]))
          formData.append('specialty_certificate', this.factory_file)
          this.$store.dispatch('freelancer/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم الإضافة بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
            this.$bvModal.hide('CreateFreelancer')
          })
        } else {
          return false
        }
        return true
      })
    },
    fileCategory(event) {
      // eslint-disable-next-line prefer-destructuring
      this.dataImage = event.target.files[0]
    },
    fetchGov() {
      this.$store.dispatch('common/FETCH_GOV').then(res => {
        this.countryOptions = res.data.data.governorates
      })
    },
    changeGov(event) {
      this.$store.dispatch('common/FETCH_CITY', event).then(res => {
        this.cityOptions = res.data.data.cities
      })
    },
    fetchFreelancerCategories() {
      this.$store.dispatch('common/fetchFreelancerCategories').then(res => {
        this.FreelancerCategories = res.data.data.categories
      })
    },
    fileFactory(event) {
      // eslint-disable-next-line prefer-destructuring
      this.factory_file = event.target.files[0]
    },
  },
}
</script>

<style scoped></style>
