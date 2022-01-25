<template>
  <b-modal
    id="EditSlider"
    cancel-variant="outline-secondary"
    ok-title="حفظ"
    cancel-title="الغاء"
    centered
    size="sm"
    :title="obj.id === 'add' ? 'إضافة سلايدر' : 'تعديل سلايدر'"
    @ok="update"
  >
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <b-col md="12">
            <b-form-group
              label="صورة السلايدر"
              label-for="factory_register_image"
            >
              <validation-provider
                #default="{ errors }"
                name="image"
                rules="required"
              >
                <b-form-file
                  id="image"
                  v-model="dataImage"
                  type="image"
                  :state="errors.length > 0 ? false : null"
                  placeholder="صورة السلايدر"
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
  BFormGroup, BForm, BRow, BCol, BFormFile, BModal,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      name: 'اسم السلايدر',
      type: 'نوع السلايدر',
      image: 'صورة السلايدر',
    },
  },
}
localize('ar', dictionary.ar)
export default {
  name: 'EditSlider',
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BFormFile,
    BForm,
    BFormGroup,
    BModal,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  props: {
    obj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dataId: '',
      dataName: '',
      dataType: '',
      dataImage: null,
      dataColor: '',
      typeOptions: [
        {
          id: 1,
          name: 'تطبيق',
        },
        {
          id: 1,
          name: 'لوحة تحكم',
        },
      ],
      category_file: null,
      required,
    }
  },
  watch: {
    obj() {
      const {
        id, name, type, color,
      } = JSON.parse(JSON.stringify(this.obj))
      this.dataId = id
      this.dataName = name
      this.dataType = type
      this.dataColor = color
    },
  },
  methods: {
    update() {
      const Obj = new FormData()
      if (this.dataImage.type !== String) {
        Obj.append('image', this.dataImage)
      }
      if (this.obj.id === 'add') {
        this.$store.dispatch('slider/store', Obj).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'تم إضافة السلايدر بنجاح',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        })
      } else {
        Obj.append('id', this.obj.id)
        this.$store.dispatch('slider/edit', Obj).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'تم تعديل السلايدر بنجاح',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        })
      }
    },
    fileCategory(event) {
      // eslint-disable-next-line prefer-destructuring
      this.dataImage = event.target.files[0]
    },
  },
}
</script>

<style scoped></style>
