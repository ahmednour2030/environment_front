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
                  label="عنوان الملف"
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
                      placeholder="عنوان الملف"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="اخر الهدف او الملخص"
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
                      placeholder="اختار الهدف او الملخص"
                      value-field="id"
                      text-field="title"
                      :options="modules"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="اختر الملف"
                  label-for="file"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="file"
                    rules="required"
                  >
                    <b-form-file
                      id="image"
                      v-model="file"
                      type="image"
                      :state="errors.length > 0 ? false : null"
                      placeholder="اختر الملف"
                      @change="fileCategory"
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
                    v-show="!load"
                    icon="PlusIcon"
                    class="mr-25"
                  />
                  <b-spinner
                    v-show="load"
                    small
                  />
                  {{ load ? 'جاري تحميل الملف ...' : 'إضافة الملف' }}
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
  BFormFile,
  BSpinner,
  BForm,
  BRow,
  BCol,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      title: 'عنوان الملف',
      moduleId: 'الهدف او المحتوي',
      file: 'الملف',
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
    BFormFile,
    BSpinner,
    BForm,
    BRow,
    BCol,
  },
  data() {
    return {
      load: false,
      modules: [],
      moduleId: null,
      category_file: null,
      title: '',
      points: '',
      image: null,
      imageCat: null,
      file: null,
      required,
    }
  },
  created() {
    this.fetchModules()
  },
  methods: {
    validationForm() {
      const formData = new FormData()
      formData.append('data_id', this.moduleId)
      formData.append('title', this.title)
      formData.append('file', this.category_file)
      this.$refs.categoryRules.validate().then(success => {
        if (success) {
          this.load = true
          this.$store.dispatch('files/store', formData).then(res => {
            this.load = false
            if (res.status === 200) {
              this.$router.push('all-files')
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'تم إضافة الملف بنجاح',
                  icon: 'CheckCircleIcon',
                  variant: 'success',
                },
              })
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'خطا في حفظ الملف',
                  icon: 'CheckCircleIcon',
                  variant: 'warning',
                },
              })
            }
          }).catch(() => {
            this.load = false
          })
        }
      })
    },
    fetchModules() {
      this.$store.dispatch('modulesData/fetchNames').then(res => {
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
