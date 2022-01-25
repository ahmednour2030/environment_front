<template>
  <b-modal
    id="EditCat"
    cancel-variant="outline-secondary"
    :ok-title="finalObject.id === 'add' ? 'إضافة' : 'تحديث'"
    cancel-title="الغاء"
    centered
    size="sm"
    title="تعديل الاعدادات"
    @ok="update"
  >
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <!-- name -->
          <b-col md="12">
            <b-form-group
              v-if="finalObject.id === 'add'"
              label="الرمز"
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="name"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="finalObject.key"
                  :state="errors.length > 0 ? false : null"
                  placeholder="الرمز"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group
              label="القيمة"
              label-for="value"
            >
              <validation-provider
                #default="{ errors }"
                name="value"
                rules="required"
              >
                <b-form-textarea
                  id="value"
                  v-model="finalObject.value"
                  style="height: 100px;"
                  :state="errors.length > 0 ? false : null"
                  placeholder="القيمة"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group
              label="النوع"
              label-for="type"
            >
              <validation-provider
                #default="{ errors }"
                name="type"
                rules="required"
              >
                <b-form-select
                  id="type"
                  v-model="finalObject.type"
                  value-field="id"
                  text-field="name"
                  :options="typeOptions"
                  :state="errors.length > 0 ? false : null"
                  placeholder="النوع"
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
  BFormTextarea,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BModal,
  BFormSelect,
  BFormInput,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      name: 'الرمز',
      value: 'القيمة',
      type: 'النوع',
      image: 'صورة التصنيف',
    },
  },
}
localize('ar', dictionary.ar)
export default {
  name: 'EditSetting',
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormTextarea,
    BModal,
    BFormInput,
    BFormSelect,
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
      dataImage: '',
      dataColor: '',
      finalObject: this.obj,
      typeOptions: [
        {
          id: 1,
          name: '',
        },
        {
          id: 2,
          name: 'client',
        },
        {
          id: 3,
          name: 'company',
        },
        {
          id: 4,
          name: 'freelancer',
        },
        {
          id: 5,
          name: 'assessor',
        },
      ],
      category_file: null,
      required,
    }
  },
  watch: {
    obj(val) {
      this.finalObject = val
    },
  },
  methods: {
    update() {
      if (this.obj.id === 'add') {
        const data = {
          value: this.finalObject.value,
          key: this.finalObject.id,
          type: this.finalObject.type,
        }
        this.$store.dispatch('setting/store', data).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'تم إضافة الاعداد بنجاح',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        })
      } else {
        const data = {
          value: this.finalObject.value,
          key_id: this.finalObject.id,
        }
        this.$store.dispatch('setting/edit', data).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'تم تعديل الاعداد بنجاح',
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
