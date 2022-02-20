<template>
  <b-modal
    id="EditCat"
    cancel-variant="outline-secondary"
    ok-title="تحديث"
    cancel-title="الغاء"
    centered
    size="lg"
    title="تعديل النشاط"
    @ok="update"
  >
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <b-col md="12">
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
                  v-model="dataModuleId"
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
                  v-model="dataComment"
                  :state="errors.length > 0 ? false : null"
                  placeholder="الرجاء كتابة وصف الموديول"
                  rows="5"
                  max-rows="10"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- image -->
          <b-col md="12">
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
        </b-row>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required } from '@/@core/utils/validations/validations'
import {
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BFormSelect,
  BFormTextarea,
  BFormFile,
  BModal,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      moduleId: 'اسم الموديول',
      description: 'وصف النشاط',
      image: 'صورة القسم',
    },
  },
}
localize('ar', dictionary.ar)
export default {
  name: 'EditActivity',
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BFormSelect,
    BFormFile,
    BForm,
    BFormGroup,
    BModal,
    BFormTextarea,
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
      modules: [],
      dataId: '',
      dataModuleId: '',
      dataComment: '',
      dataImage: '',
      required,
    }
  },
  watch: {
    obj() {
      const {
        id, module_id, comment, module,
      } = JSON.parse(
        JSON.stringify(this.obj),
      )
      this.dataId = id
      // eslint-disable-next-line camelcase
      this.dataModuleId = module_id
      this.dataComment = comment
      this.dataModule = module
    },
  },
  mounted() {
    console.clear()
  },
  created() {
    this.fetchModules()
  },
  methods: {
    update(e) {
      e.preventDefault()
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const Obj = new FormData()
          Obj.append('activity_id', this.dataId)
          Obj.append('comment', this.dataComment)
          if (typeof this.dataImage === 'object') {
            Obj.append('file', this.dataImage)
          }
          this.$store.dispatch('activities/update', Obj).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم تعديل النشاط بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
            this.$bvModal.hide('EditCat')
          })
        } else {
          e.preventDefault()
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
      this.dataImage = event.target.files[0]
    },
  },
}
</script>

<style scoped></style>
