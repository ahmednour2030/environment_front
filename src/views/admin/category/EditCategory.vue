<template>
  <b-modal
    id="EditCat"
    cancel-variant="outline-secondary"
    ok-title="تحديث"
    cancel-title="الغاء"
    centered
    size="sm"
    title="تعديل القسم"
    @ok="update"
  >
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <!-- name -->
          <b-col md="12">
            <b-form-group
              label="اسم القسم"
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
                  placeholder="اسم القسم"
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
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  // BFormSelect,
  BFormFile,
  BModal,
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
      dataPoints: '',
      dataImage: null,
      required,
    }
  },
  watch: {
    obj() {
      const {
        id, name, points,
      } = JSON.parse(
        JSON.stringify(this.obj),
      )
      this.dataId = id
      this.dataName = name
      this.dataPoints = points
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
          Obj.append('category_id', this.dataId)
          Obj.append('name', this.dataName)
          // Obj.append('points', this.dataPoints)
          if (typeof this.dataImage === 'object') {
            Obj.append('image', this.dataImage)
          }
          this.$store.dispatch('categories/edit', Obj).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم تعديل التصنيف بنجاح',
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
    fileCategory(event) {
      // eslint-disable-next-line prefer-destructuring
      this.dataImage = event.target.files[0]
    },
  },
}
</script>

<style scoped></style>
