<template>
  <b-modal
    id="EditFreelancer"
    cancel-variant="outline-secondary"
    ok-title="تحديث"
    cancel-title="الغاء"
    centered
    size="lg"
    title="تعديل "
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
                  placeholder="اسم التصنيف"
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
              label-for="country"
            >
              <validation-provider
                #default="{ errors }"
                name="country"
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
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      countryOptions: [],
      cityOptions: [],
      FreelancerCategories: [],
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
      const { user } = this
      user.user_id = user.id
      user.lat = 10.323
      user.lng = 21.5445
      return user
    },
  },
  watch: {
    userObj(val) {
      this.changeGov(val.country_id)
    },
  },
  created() {
    this.fetchGov()
    this.fetchFreelancerCategories()
  },
  methods: {
    update() {
      this.$refs.accountRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('freelancer/update', this.userObj).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم تعديل بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
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
  },
}
</script>

<style scoped></style>
