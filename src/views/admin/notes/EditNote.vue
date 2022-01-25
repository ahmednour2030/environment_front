<template>
  <b-modal
    id="EditNote"
    cancel-variant="outline-secondary"
    ok-title="تحديث"
    cancel-title="الغاء"
    centered
    size="sm"
    title="تعديل الملاحظة"
    @ok="update"
  >
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <!-- name -->
          <b-col md="12">
            <b-form-group
              label="عنوان الملاحظة"
              label-for="title"
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
                  placeholder="اكتب عنوان للملاحظة"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- name -->

          <b-col md="12">
            <b-form-group
              label="صورة الملاحظة"
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
                  placeholder="صورة الملاحظة"
                  @change="fileCategory"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- description -->
          <b-col md="12">
            <b-form-group
              label="وصف الملاحظة"
              label-for="description"
            >
              <validation-provider
                #default="{ errors }"
                name="description"
                rules="required"
              >
                <b-form-textarea
                  id="points"
                  v-model="dataDescription"
                  :state="errors.length > 0 ? false : null"
                  placeholder="وصف الملاحظة"
                  rows="5"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- description -->
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
  BFormTextarea,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      title: 'اسم القسم',
      description: 'النقاط',
      image: 'صورة القسم',
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
    // BFormSelect,
    BFormFile,
    BForm,
    BFormGroup,
    BFormInput,
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
      dataId: '',
      dataTitle: '',
      dataDescription: '',
      dataImage: null,
      required,
    }
  },
  watch: {
    obj() {
      const {
        id, title, description,
      } = JSON.parse(
        JSON.stringify(this.obj),
      )
      this.dataId = id
      this.dataTitle = title
      this.dataDescription = description
    },
  },
  mounted() {
    console.clear()
  },
  methods: {
    update(e) {
      e.preventDefault()
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const Obj = new FormData()
          Obj.append('note_id', this.dataId)
          Obj.append('title', this.dataTitle)
          Obj.append('description', this.dataDescription)
          // if (typeof this.dataImage !== 'object') {
          Obj.append('image', this.dataImage)
          // }
          this.$store.dispatch('notes/edit', Obj).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم تعديل التصنيف بنجاح',
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
