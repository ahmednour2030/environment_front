<template>
  <b-modal
    id="companyDetails"
    cancel-variant="outline-secondary"
    centered
    size="l"
    title="تفاصيل"
  >
    <validation-observer ref="simpleRules">
      <fieldset disabled>
        <b-form>
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                بيانات الشخص
              </h5>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col md="6">
                  الطلبات المكتملة:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ counts.completed }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col md="6">
                  الطلبات الحالية:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ counts.current }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col md="6">
                  الطلبات الجديدة:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ counts.new }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col md="6">
                  الطلبات المرفوضة:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ counts.rejected }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col md="6">
                  الطلبات:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ counts.total }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-form>
      </fieldset>
    </validation-observer>
  </b-modal>
</template>

<script>
import { ValidationObserver, localize } from 'vee-validate'
import { required } from '@/@core/utils/validations/validations'
import {
  BForm, BRow, BCol, BModal,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      name: 'اسم التصنيف',
      type: 'نوع التصنيف',
      image: 'صورة التصنيف',
    },
  },
}
localize('ar', dictionary.ar)
export default {
  name: 'CompanyDetails',
  components: {
    ValidationObserver,
    BRow,
    BCol,
    BForm,
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
      dataImage: '',
      counts: {},
      dataColor: '',
      dataStatus: '',
      statuses: [
        {
          id: 1,
          name: 'أعمال حره',
        },
        {
          id: 2,
          name: 'شركة',
        },
        {
          id: 3,
          name: 'الكل',
        },
      ],
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
      countryOptions: [],
      categoryOption: [],
      category_file: null,
      required,
    }
  },
  watch: {
    // obj() {
    //   this.fetchData()
    // },
  },
  created() {
    // this.$store.dispatch('common/FETCH_GOV').then(res => {
    //   this.countryOptions = res.data.data.governorates
    // })
    // this.$store.dispatch('categories/fetch').then(res => {
    //   this.categoryOption = res.data.data
    // })
  },
  methods: {
    fetchData() {
      this.$store.dispatch('company/showDetails', this.obj.id).then(res => {
        this.counts = res.data.data
      })
    },
    update() {
      const Obj = new FormData()
      Obj.append('id', this.dataId)
      Obj.append('category_id', this.dataId)
      Obj.append('name', this.dataName)
      Obj.append('status', this.dataStatus)
      Obj.append('type', this.dataType)
      if (this.dataImage.type !== String) {
        Obj.append('image', this.dataImage)
      }
      Obj.append('color', this.dataColor)

      this.$store.dispatch('categories/edit', Obj).then(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'تم تعديل التصنيف بنجاح',
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })
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
