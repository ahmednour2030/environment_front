<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title="إضافة محتوى جديد"
      >
        <validation-observer ref="categoryRules">
          <b-form>
            <b-row>
              <!-- name -->
              <b-col md="6">
                <b-form-group
                  label="عنوان المحتوى"
                  label-for="title"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="title"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="title"
                      :state="errors.length > 0 ? false : null"
                      placeholder="عنوان المحتوى"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="اخر الموديول"
                  label-for="moduleId"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="moduleId"
                    rules="required"
                  >
                    <b-form-select
                      id="moduleId"
                      v-model="moduleId"
                      placeholder="اختار الموديول"
                      value-field="id"
                      text-field="name"
                      :options="modules"
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
                  <feather-icon
                    icon="PlusIcon"
                    class="mr-25"
                  />
                  إضافة محتوى
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
import { required } from '@core/utils/validations/validations'
import {
  BCard,
  BCardGroup,
  BButton,
  BFormInput,
  BFormGroup,
  BFormSelect,
  BForm,
  BRow,
  BCol,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      title: 'عنوان المحتوى',
      moduleId: 'الموديول',
    },
  },
}
localize('ar', dictionary.ar)
export default {
  name: 'AddContent',
  components: {
    ValidationProvider,
    ValidationObserver,
    BCard,
    BCardGroup,
    BButton,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BForm,
    BRow,
    BCol,
  },
  data() {
    return {
      modules: [],
      moduleId: null,
      category_file: null,
      title: '',
      points: '',
      image: null,
      imageCat: null,
      required,
    }
  },
  created() {
    this.fetchModules()
  },
  methods: {
    validationForm() {
      const formData = new FormData()
      formData.append('module_id', this.moduleId)
      formData.append('title', this.title)
      this.$refs.categoryRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('content/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة المحتوى بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
          })
          this.$router.push('all-content')
        }
      })
    },
    fetchModules() {
      this.$store.dispatch('modules/fetchNames').then(res => {
        this.modules = res.data.data
      })
    },
    fileCategory(event) {
      // eslint-disable-next-line prefer-destructuring
      this.category_file = event.target.files[0]
    },
  },
}
</script>

<style scoped></style>
