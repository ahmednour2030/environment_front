<template>
  <b-modal
    id="EditCat"
    cancel-variant="outline-secondary"
    ok-title="تحديث"
    cancel-title="الغاء"
    centered
    size="sm"
    title="تعديل الملف للمكتبة"
    @ok="update"
  >
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <!-- name -->
          <b-col md="12">
            <b-form-group
              label="اسم الملف"
              label-for="title"
            >
              <validation-provider
                #default="{ errors }"
                name="title"
                rules="required"
              >
                <b-form-input
                  id="title"
                  v-model="dataTitle"
                  :state="errors.length > 0 ? false : null"
                  placeholder="اسم الملف"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- name -->

          <b-col md="12">
            <b-form-group
              label="اسم الموديول"
              label-for="module_id"
            >
              <validation-provider
                #default="{ errors }"
                name="module_id"
                rules="required"
              >
                <b-form-select
                  id="exam"
                  v-model="moduleId"
                  placeholder="اختار الاختبار"
                  value-field="id"
                  text-field="name"
                  :options="modules"
                  :state="errors.length > 0 ? false : null"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group
              label="اخر الملف"
              label-for="image"
            >
              <validation-provider
                #default="{ errors }"
                name="file"
              >
                <b-form-file
                  id="file"
                  v-model="dataImage"
                  type="file"
                  :state="errors.length > 0 ? false : null"
                  placeholder="تحميل ملف للمكتبة"
                  @change="fileCategory"
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
  // BFormSelect,
  BFormFile,
  BModal,
  BFormSelect,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

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
  name: 'EditLibrary',
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    // BFormSelect,
    BFormFile,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    BFormSelect,
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
      dataId: '',
      dataTitle: '',
      dataPoints: '',
      dataImage: null,
      moduleId: null,
      modules: null,
      required,
    }
  },
  watch: {
    obj() {
      const {
        id, title, module_id,
      } = JSON.parse(
        JSON.stringify(this.obj),
      )
      this.dataId = id
      this.dataTitle = title
      // eslint-disable-next-line camelcase
      this.moduleId = module_id
    },
  },
  mounted() {
    console.clear()
  },
  created() {
    this.$store.dispatch('modules/fetchNames').then(cats => {
      this.modules = cats.data.data
    })
  },
  methods: {
    update(e) {
      e.preventDefault()
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const Obj = new FormData()
          Obj.append('library_id', this.dataId)
          Obj.append('title', this.dataTitle)
          Obj.append('module_id', this.moduleId)
          // if (typeof this.dataImage !== 'object') {
          Obj.append('file', this.dataImage)
          // }
          this.$store.dispatch('library/edit', Obj).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم تعديل الملف بنجاح',
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
    fileCategory(event) {
      // eslint-disable-next-line prefer-destructuring
      this.dataImage = event.target.files[0]
    },
  },
}
</script>

<style scoped></style>
