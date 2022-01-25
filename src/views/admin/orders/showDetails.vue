<template>
  <b-modal
    id="orderDetails"
    cancel-variant="outline-secondary"
    centered
    size="lg"
    title="تفاصيل الطلب"
    ok-title="تم"
    cancel-title="الغاء"
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
                بيانات الطلب
              </h5>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight: bold;"
                >
                  اسم المنتج
                </b-col>
                <b-col>
                  <span>
                    تجربة كتابة اسم المنتج
                    <!--                    {{ obj.address }}-->
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight: bold;"
                >
                  السعر
                </b-col>
                <b-col>
                  <span>
                    250 ريال
                    <!--                    {{ obj.details }}-->
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight: bold;"
                >
                  التصنيف
                </b-col>
                <b-col>
                  <span>
                    {{ obj.category ? obj.category.name : '' }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight: bold;"
                >
                  التصنيف الفرعي
                </b-col>
                <b-col>
                  <span>
                    {{ obj.execution_time }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight: bold;"
                >
                  الكمية
                </b-col>
                <b-col>
                  <span>
                    {{ obj.notes }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight: bold;"
                >
                  التامين
                </b-col>
                <b-col>
                  <span>
                    {{ obj.owner ? obj.owner.name : '' }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight: bold;"
                >
                  طريقة الاستلام
                </b-col>
                <b-col>
                  <span>
                    {{ obj.price }} ريال
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight: bold;"
                >
                  الحالة
                </b-col>
                <b-col>
                  <span>
                    {{ obj.quantity }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight: bold;"
                >
                  متاج من تاريخ
                </b-col>
                <b-col>
                  <span>
                    {{ obj.payed === 1 ? "تم الدفع" :"لم يتم الدفع بعد " }}
                  </span>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight: bold;"
                >
                  متاح حتى تاريخ
                </b-col>
                <b-col>
                  <span>
                    {{ obj.payment_method ? mapPayment(obj.payment_method) : 'لم يتم الدفع بعد الدفع باي طريقة بعد' }}
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
  BForm,
  BRow,
  BCol,
  BModal,
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
    id: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      dataId: '',
      dataName: '',
      dataType: '',
      dataImage: '',
      dataColor: '',
      obj: {},
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
    id(val) {
      if (val !== null) {
        this.fetchData()
      }
    },
  },
  created() {
    // this.fetchData()
    // this.$store.dispatch('categories/fetch').then(res => {
    //   this.categoryOption = res.data.data
    // })
  },
  methods: {
    fetchData() {
      if (this.id !== null) {
        this.$store.dispatch('orders/showDetails', this.id).then(res => {
          this.obj = res.data.data
        })
      }
    },
    fileCategory(event) {
      // eslint-disable-next-line prefer-destructuring
      this.dataImage = event.target.files[0]
    },
    mapStatus(status) {
      const all = [
        {
          id: 1,
          name: 'طلب جديد',
        },
        {
          id: 2,
          name: 'طلب جاري',
        },
        {
          id: 3,
          name: 'طلب مكتمل',
        },
        {
          id: 4,
          name: ' طلب مرفوض',
        },
        {
          id: 5,
          name: 'تمت مراجعته ومقبول',
        },
        {
          id: 6,
          name: 'تمت مراجعته ومرفوض',
        },
      ]
      const item = all.find(x => x.id === parseFloat(status))
      return item ? item.name : ''
    },
    mapPayment(status) {
      const all = [
        {
          id: 1,
          name: 'فيزا',
        },
        {
          id: 2,
          name: 'كاش',
        },
      ]
      const item = all.find(x => x.id === parseFloat(status))
      return item ? item.name : ''
    },
  },
}
</script>

<style scoped></style>
