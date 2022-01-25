<template>
  <b-modal
    id="EditModule"
    cancel-variant="outline-secondary"
    ok-title="تحديث"
    cancel-title="الغاء"
    centered
    size="lg"
    title="تعديل الموديول"
    @ok="update"
  >
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <!-- name -->
          <b-col md="12">
            <b-form-group
              label="اسم الموديول"
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="name"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="dataName"
                  :state="errors.length > 0 ? false : null"
                  placeholder="اسم الموديول"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- name -->

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
                  v-model="dataDescription"
                  :state="errors.length > 0 ? false : null"
                  placeholder="الرجاء كتابة وصف الموديول"
                  rows="5"
                  max-rows="10"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group
              label="صورة الموديول"
              label-for="image"
            >
              <validation-provider
                #default="{ errors }"
                name="image"
              >
                <b-form-file
                  id="image"
                  v-model="image"
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
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BFormTextarea,
  BFormFile,
  BModal,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      name: 'اسم الموديول',
      description: 'وصف الموديول',
      image: 'صورة الموديول',
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
    BFormTextarea,
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
      dataId: '',
      dataName: '',
      dataDescription: '',
      dataImage: '',
      image: null,
      required,
    }
  },
  watch: {
    obj() {
      const {
        id, name, description,
      } = JSON.parse(
        JSON.stringify(this.obj),
      )
      this.dataId = id
      this.dataName = name
      this.dataDescription = description
      this.dataImage = ''
    },
  },
  mounted() {
    console.log(this.obj)
  },
  methods: {
    update(e) {
      e.preventDefault()
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          console.log(typeof this.dataImage)
          const Obj = new FormData()
          Obj.append('module_id', this.dataId)
          Obj.append('name', this.dataName)
          Obj.append('description', this.dataDescription)
          if (typeof this.dataImage === 'object') {
            Obj.append('image', this.dataImage)
          }
          this.$store.dispatch('modules/update', Obj).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم تعديل التصنيف بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
            this.$bvModal.hide('EditModule')
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
