/* eslint-disable camelcase */
<template>
  <b-modal
    id="EditCat"
    cancel-variant="outline-secondary"
    ok-title="تحديث"
    cancel-title="الغاء"
    centered
    size="sm"
    title="تعديل الكوبون"
    @ok="update"
  >
    <validation-observer ref="simpleRules">
      <b-form>
        <b-form-group>
          <b-form-group
            label=" الاسم"
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
                placeholder="الاسم"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="نسبة الخصم"
            label-for="percent"
          >
            <validation-provider
              #default="{ errors }"
              name="percent"
              rules="required"
            >
              <span>{{ dataDiscount }}%</span>
              <b-form-input
                id="percent"
                v-model="dataDiscount"
                min="0"
                max="100"
                type="range"
                :state="errors.length > 0 ? false : null"
                placeholder="نسبة الخصم"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="تاريخ البدء"
            label-for="start"
          >
            <validation-provider
              #default="{ errors }"
              name="start"
              rules="required"
            >
              <b-form-input
                id="start"
                v-model="startData"
                type="date"
                :state="errors.length > 0 ? false : null"
                placeholder="تاريخ البدء"
                no-flip
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="تاريخ الانتهاء"
            label-for="end"
          >
            <validation-provider
              #default="{ errors }"
              name="end"
              rules="required"
            >
              <b-form-input
                id="end"
                v-model="endData"
                type="date"
                :state="errors.length > 0 ? false : null"
                placeholder="تاريخ الانتهاء"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="الكود"
            label-for="code"
          >
            <validation-provider
              #default="{ errors }"
              name="code"
              rules="required"
            >
              <b-form-input
                id="code"
                v-model="dataCode"
                :state="errors.length > 0 ? false : null"
                placeholder="الكود"
              />
              <b-button
                variant="secondary"
                class="mt-2"
                @click="generateCode()"
              >
                إنشاء كود
              </b-button>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-form-group>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required } from '@/@core/utils/validations/validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import {
  BForm, BFormGroup, BFormInput, BModal, BButton,
} from 'bootstrap-vue'

const dictionary = {
  ar: {
    names: {
      name: 'الاسم',
      type: 'نوع التصنيف',
      image: 'صورة التصنيف',
      color: 'اللون',
      code: 'الكود',
      discount: 'نسبة الخصم',
    },
  },
}
localize('ar', dictionary.ar)

export default {
  name: 'EditCoupon',
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    ValidationProvider,
    ValidationObserver,
    BButton,
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
      dataDiscount: '',
      dataCode: '',
      required,
      startData: '',
      endData: '',
    }
  },
  watch: {
    obj() {
      const {
        id, name, rate, code, startdate, enddate,
      } = JSON.parse(
        JSON.stringify(this.obj),
      )
      this.dataId = id
      this.dataName = name
      this.dataDiscount = rate
      this.dataCode = code
      // eslint-disable-next-line camelcase
      this.startData = startdate
      // eslint-disable-next-line camelcase
      this.endData = enddate
    },
  },
  methods: {
    update(e) {
      e.preventDefault()
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const obj = {
            id: this.dataId,
            name: this.dataName,
            code: this.dataCode,
            rate: parseFloat(this.dataDiscount),
            startdate: this.startData,
            enddate: this.endData,
          }
          this.$store.dispatch('coupon/edit', obj).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم تعديل الكوبون بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
            this.$bvModal.hide('EditCat')
          })
        }
      })
    },
    generateCode() {
      let result = ''
      let resultNum = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const numbers = '0123456789'
      const charactersLength = characters.length
      const numbersLength = numbers.length
      for (let i = 0; i < 2; i += 1) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        )
      }
      for (let i = 0; i < 4; i += 1) {
        resultNum += numbers.charAt(Math.floor(Math.random() * numbersLength))
      }
      this.dataCode = `${result}-${resultNum}`
    },
  },
}
</script>

<style scoped></style>
