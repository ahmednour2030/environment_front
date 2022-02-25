<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title="إضافة هدف او ملخص"
      >
        <validation-observer ref="simpleRules">
          <b-form
            ref="form"
            class="repeater-form"
          >
            <b-row>
              <b-col md="4">
                <b-form-group
                  label="اختر الموديول"
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
                      placeholder="اختر الموديول"
                      value-field="id"
                      text-field="name"
                      :options="modules"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="اخر التصنيف"
                  label-for="category"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="category"
                    rules="required"
                  >
                    <b-form-select
                      id="category"
                      v-model="categoryId"
                      placeholder="اختار التصنيف"
                      value-field="id"
                      text-field="name"
                      :options="categories"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="اخر النوع"
                  label-for="type"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="type"
                    rules="required"
                  >
                    <b-form-select
                      id="type"
                      v-model="typeId"
                      placeholder="اختار النوع"
                      value-field="id"
                      text-field="name"
                      :options="types"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <hr class="w-100">
              <b-col md="8">
                <b-form-group
                  label="عنوان"
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
                      placeholder="عنوان"
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
                إضافة للموديول
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
import { numeric, required } from '@/@core/utils/validations/validations'
// import { required } from '@validations'
import {
  BCard,
  BCardGroup,
  BButton,
  BFormGroup,
  BFormInput,
  BForm,
  BRow,
  BCol,
  BFormSelect,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// Import translations for the German language.
import '@ckeditor/ckeditor5-build-classic/build/translations/ar'

// import Image from '@ckeditor/ckeditor5-image/src/image'
// import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting'
// import ImageResizeHandles from '@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles'

const dictionary = {
  ar: {
    names: {
      moduleId: 'الموديول',
      category: 'التصنيف',
      type: 'النوع',
      description: ' الوصف',
    },
  },
}
localize('ar', dictionary.ar)

export default {
  name: 'AddModuleData',
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
      types: [
        {
          id: 1,
          name: 'الاهداف',
        },
        {
          id: 2,
          name: 'الملخص',
        },
      ],
      typeId: null,
      modules: [],
      moduleId: null,
      categories: [],
      categoryId: null,
      title: '',
      description: '',
      required,
      numeric,
    }
  },
  created() {
    this.fetchModules()
    this.fetchCategories()
  },
  methods: {
    fetchModules() {
      this.$store.dispatch('modules/fetchNames').then(res => {
        this.modules = res.data.data
      })
    },
    fetchCategories() {
      this.$store.dispatch('categories/fetch').then(res => {
        this.categories = res.data.data
      })
    },
    add() {
      this.inputs.push({
        answer: '',
        points: '',
      })
      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    remove(index) {
      this.inputs.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('title', this.title)
          formData.append('description', this.description)
          formData.append('module_id', this.moduleId)
          formData.append('category_id', this.categoryId)
          formData.append('type', this.typeId)

          this.$store.dispatch('modulesData/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة المحتوى للموديول بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
            // this.$router.push(`/questions/${this.examId}`)
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
