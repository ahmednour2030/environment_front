<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title=""
      >
        <validation-observer ref="simpleRules">
          <b-form
            ref="form"
            class="repeater-form"
          >
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
                  label="اخر التصنيف"
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
              <hr class="w-100">
              <!-- Points -->
              <b-col md="12">
                <b-form-group
                  label="الاهداف"
                  label-for="description"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="description"
                    rules="required"
                  >
                    <ckeditor
                      v-model="objectives"
                      :editor="editor"
                      :config="editorConfig"
                    />

                    <!--                    <b-form-textarea-->
                    <!--                      id="objectives"-->
                    <!--                      v-model="objectives"-->
                    <!--                      :state="errors.length > 0 ? false : null"-->
                    <!--                      placeholder="الرجاء كتابة الاهداف"-->
                    <!--                      rows="5"-->
                    <!--                    />-->
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- Points -->
              <b-col md="12">
                <b-form-group
                  label="المحتوى"
                  label-for="description"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="content"
                    rules="required"
                  >
                    <ckeditor
                      v-model="content"
                      :editor="editor"
                      :config="editorConfig"
                    />
                    <!--                    <b-form-textarea-->
                    <!--                      id="content"-->
                    <!--                      v-model="content"-->
                    <!--                      :state="errors.length > 0 ? false : null"-->
                    <!--                      placeholder="الرجاء كتابة المحتوى"-->
                    <!--                      rows="5"-->
                    <!--                    />-->
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- Points -->
              <b-col md="12">
                <b-form-group
                  label="الملخص"
                  label-for="description"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="summary"
                    rules="required"
                  >
                    <ckeditor
                      v-model="summary"
                      :editor="editor"
                      :config="editorConfig"
                    />
                    <!--                    <b-form-textarea-->
                    <!--                      id="summary"-->
                    <!--                      v-model="summary"-->
                    <!--                      :state="errors.length > 0 ? false : null"-->
                    <!--                      placeholder="الرجاء كتابة الملاحظة"-->
                    <!--                      rows="5"-->
                    <!--                    />-->
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
                إضافة محتوى للموديول
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
  BForm,
  BRow,
  BCol, BFormSelect,
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
      title: 'السؤال',
      answer: 'إجابة السؤال',
      points: 'درجة السؤال',
      name: 'اسم الاختبار',
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
      modules: [],
      moduleId: null,
      categories: [],
      categoryId: null,
      inputs: [{
        answer: '',
        points: '',
      }],
      objectives: '',
      content: '',
      summary: '',
      options: [],
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
          formData.append('module_id', this.moduleId)
          formData.append('category_id', this.categoryId)
          formData.append('objectives', this.objectives)
          formData.append('content', this.content)
          formData.append('summary', this.summary)

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
