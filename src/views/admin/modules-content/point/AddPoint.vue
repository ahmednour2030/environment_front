<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title="إضافة نقطة جديد"
      >
        <validation-observer ref="simpleRules">
          <b-form
            ref="form"
            class="repeater-form"
          >
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="اختر المحتوى"
                  label-for="moduleId"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="moduleId"
                    rules="required"
                  >
                    <b-form-select
                      id="moduleId"
                      v-model="contentId"
                      placeholder="اختر المحتوى"
                      value-field="id"
                      text-field="title"
                      :options="contents"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="اختر التصنيف"
                  label-for="name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="name"
                    rules="required"
                  >
                    <b-form-select
                      id="exam"
                      v-model="categoryId"
                      placeholder="اختر التصنيف"
                      value-field="id"
                      text-field="name"
                      :options="categories"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <hr class="w-100">
              <!-- name -->
              <b-col md="6">
                <b-form-group
                  label="اسم النقطة"
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
                      placeholder="اسم النقطة"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- Points -->
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
                    <ckeditor
                      v-model="description"
                      :editor="editor"
                      :config="editorConfig"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
          <b-row>
            <!-- login button -->
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
                إضافة نقطة للموديول
              </b-button>
            </b-col>
          </b-row>
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
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BFormSelect,
  BFormInput,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// Import translations for the German language.
import '@ckeditor/ckeditor5-build-classic/build/translations/ar'

const dictionary = {
  ar: {
    names: {
      title: 'اسم النقطة',
      description: 'وصف النقطة',
      image: 'صورة القسم',
      point: 'قيمة النقط',
    },
  },
}
localize('ar', dictionary.ar)
export default {
  name: 'AddPoint',
  components: {
    ValidationProvider,
    ValidationObserver,
    BCard,
    BCardGroup,
    BButton,
    BFormGroup,
    BFormSelect,
    BFormInput,
    BForm,
    BRow,
    BCol,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p><br><br><br></p>',
      editorConfig: {
        language: 'ar',
      },
      contents: [],
      contentId: null,
      categories: [],
      categoryId: null,
      category_file: null,
      title: '',
      description: '',
      points: '',
      image: null,
      imageCat: null,
      required,
    }
  },
  created() {
    this.fetchContents()
    this.fetchCategories()
  },
  methods: {
    validationForm() {
      const formData = new FormData()
      formData.append('content_id', this.contentId)
      formData.append('category_id', this.categoryId)
      formData.append('title', this.title)
      formData.append('description', this.description)
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('point/store', formData).then(() => {
            this.$router.push('all-point')
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة نقطة بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
          })
        }
      })
    },
    fetchContents() {
      this.$store.dispatch('content/fetch').then(res => {
        this.contents = res.data.data
      })
    },
    fetchCategories() {
      this.$store.dispatch('categories/fetch').then(res => {
        this.categories = res.data.data
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
