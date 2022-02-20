<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title="إضافة نشاط للموديول"
      >
        <validation-observer ref="categoryRules">
          <b-form>
            <b-row>
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
              <b-col md="6">
                <b-form-group
                  label="إدارج صورة للنشاط"
                  label-for="image"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="image"
                    rules=""
                  >
                    <b-form-file
                      id="image"
                      v-model="imageCat"
                      type="image"
                      :state="errors.length > 0 ? false : null"
                      placeholder="صورة لللنشاط"
                      @change="fileCategory"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- description -->
              <b-col md="12">
                <b-form-group
                  label="الوصف"
                  label-for="description"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="description"
                    rules="required"
                  >
                    <b-form-textarea
                      id="summary"
                      v-model="comment"
                      :state="errors.length > 0 ? false : null"
                      placeholder="الرجاء كتابة وصف الموديول"
                      rows="5"
                      max-rows="10"
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
                  إضافة نشاط
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
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BFormFile,
  BFormSelect,
  BFormTextarea,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      moduleId: 'اسم الموديول',
      image: 'صورة النشاط',
      comment: 'وصف النشاط',
    },
  },
}
localize('ar', dictionary.ar)
export default {
  name: 'AddCategory',
  components: {
    ValidationProvider,
    ValidationObserver,
    BCard,
    BCardGroup,
    BButton,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BFormFile,
    BFormSelect,
    BFormTextarea,
  },
  data() {
    return {
      modules: [],
      moduleId: null,
      category_file: null,
      comment: '',
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
      formData.append('comment', this.comment)
      formData.append('file', this.category_file)
      this.$refs.categoryRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('activities/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة النشاط بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
          })
          this.$router.push('all-activities')
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
