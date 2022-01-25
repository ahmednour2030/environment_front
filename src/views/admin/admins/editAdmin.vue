<template>
  <b-modal
    id="editAdmin"
    cancel-variant="outline-secondary"
    ok-title="تعديل ادمن"
    cancel-title="الغاء"
    centered
    size="lg"
    title="تعديل ادمن"
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
  BModal,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      name: 'الاسم',
      password: 'كلمة المرور',
      phone: 'الهاتف',
      city: 'المدينة',
      country: 'المنطقة',
      email: 'الايميل',
      birth_date: 'تاريخ الميلاد',
      gender: 'النوع',
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
      FreelancerCategories: [],
      cityOptions: [],
      image: null,
      factory_file: null,
      workStatus: [
        {
          name: 'ذكر',
          id: '1',
        },
        {
          name: 'أنثى',
          id: '2',
        },
      ],
      required,
    }
  },
  computed: {
    userObj() {
      const { user } = this
      user.user_id = user.id
      return user
    },
  },
  watch: {
    userObj(val) {
      this.changeGov(val.country_id)
      this.userObj.birth_date = '2021-09-08'
      if (val.gender === 'male') {
        this.userObj.gender = 1
      } else if (val.gender === 'female') {
        this.userObj.gender = 2
      }
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
          const keys = [
            'name',
            'phone',
            'city_id',
            'country_id',
            'email',
            'birth_date',
            'gender',
            'user_id',
          ]
          keys.forEach(key => formData.append(key, this.userObj[key]))
          this.$store.dispatch('admins/update', formData).then(res => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم التعديل بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
                i: res,
              },
            })
            this.$bvModal.hide('editAdmin')
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
