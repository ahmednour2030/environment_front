<template>
  <b-modal
    id="EditPoint"
    cancel-variant="outline-secondary"
    ok-title="تحديث"
    cancel-title="الغاء"
    centered
    size="lg"
    title="تعديل النقطة"
    @ok="update"
  >
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <!-- name -->
          <b-col md="6">
            <b-form-group
              label="اسم النقطة"
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="name"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="dataTitle"
                  :state="errors.length > 0 ? false : null"
                  placeholder="اسم القسم"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
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
                  v-model="dataContentId"
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
                  v-model="dataCategoryId"
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
          <!-- image -->
          <b-col md="6">
            <b-form-group
              label="صورة القسم"
              label-for="image"
            >
              <validation-provider
                #default="{ errors }"
                name="image"
              >
                <b-form-file
                  id="image"
                  v-model="dataImage"
                  type="image"
                  :state="errors.length > 0 ? false : null"
                  placeholder="صورة التصنيف"
                  @change="fileCategory"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Description -->
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
                  v-model="dataDescription"
                  :editor="editor"
                  :config="editorConfig"
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
import { required } from '@core/utils/validations/validations'
import {
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BFormSelect,
  BFormFile,
  BModal,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import '@ckeditor/ckeditor5-build-classic/build/translations/ar'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const dictionary = {
  ar: {
    names: {
      name: 'اسم القسم',
      points: 'النقاط',
      image: 'صورة القسم',
    },
  },
}
localize('ar', dictionary.ar)
export default {
  name: 'EditPoint',
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BFormSelect,
    BFormFile,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  props: {
    obj: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p><br><br><br></p>',
      editorConfig: {
        language: 'ar',
      },
      dataId: '',
      dataTitle: '',
      dataContentId: '',
      dataCategoryId: '',
      dataDescription: '',
      dataImage: '',
      contents: [],
      categories: [],
      required,
    }
  },
  watch: {
    obj() {
      const {
        id, title, description, category_id, content_id,
      } = JSON.parse(
        JSON.stringify(this.obj),
      )
      this.dataId = id
      this.dataTitle = title
      this.dataDescription = description
      // eslint-disable-next-line camelcase
      this.dataContentId = content_id
      // eslint-disable-next-line camelcase
      this.dataCategoryId = category_id
    },
  },
  mounted() {
    // console.clear()
  },
  created() {
    this.fetchContents()
    this.fetchCategories()
  },
  methods: {
    update(e) {
      e.preventDefault()
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const Obj = new FormData()
          Obj.append('point_id', this.dataId)
          Obj.append('title', this.dataTitle)
          Obj.append('description', this.dataDescription)
          Obj.append('category_id', this.dataCategoryId)
          Obj.append('content_id', this.dataContentId)
          // Obj.append('points', this.dataPoints)
          if (typeof this.dataImage === 'object') {
            Obj.append('image', this.dataImage)
          }
          this.$store.dispatch('point/edit', Obj).then(() => {
            this.$bvModal.hide('EditPoint')
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم تعديل النقطة بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
          })
        } else {
          e.preventDefault()
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
      this.dataImage = event.target.files[0]
    },
  },
}
</script>

<style scoped></style>
