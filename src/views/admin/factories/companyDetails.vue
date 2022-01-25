<template>
  <b-modal
    id="companyDetails"
    cancel-variant="outline-secondary"
    centered
    size="lg"
    title="تفاصيل"
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
                بيانات المصنع
              </h5>
            </b-col>
            <b-col
              class="mt-2"
              md="6"
            >
              <b-row>
                <b-col
                  md="6"
                  style="font-weight:bold;"
                >
                  الموقع الالكتروني:
                </b-col>
                <b-col>
                  <a
                    :href="obj.website"
                    target="_blank"
                  >{{ obj.website }}</a>
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
                  style="font-weight:bold;"
                >
                  التصنيف:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ obj.category ? obj.category.name: '' }}
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
                  style="font-weight:bold;"
                >
                  المنطقة:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ obj.user ? obj.user.governorate.name : '' }}
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
                  style="font-weight:bold;"
                >
                  المدينة:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ obj.user ? obj.user.city.name : '' }}
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
                  style="font-weight:bold;"
                >
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
                <b-col
                  md="6"
                  style="font-weight:bold;"
                >
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
                <b-col
                  md="6"
                  style="font-weight:bold;"
                >
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
                <b-col
                  md="6"
                  style="font-weight:bold;"
                >
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
                <b-col
                  md="6"
                  style="font-weight:bold;"
                >
                  الطلبات:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ counts.total }}
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
                  style="font-weight:bold;"
                >
                  رقم الهاتف المباشر:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ obj.landline_number }}
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
                  style="font-weight:bold;"
                >
                  الموظف المباشر:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ obj.direct_employee_name }}
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
                  style="font-weight:bold;"
                >
                  رقم هاتف الموظف المباشر:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ obj.direct_employee_phone }}
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
                  style="font-weight:bold;"
                >
                  سجل المصنع:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ obj.factory_register }}
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
                  style="font-weight:bold;"
                >
                  العنوان:
                </b-col>
                <b-col>
                  <span class="font-weight-bold">
                    {{ obj.address }}
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
                  style="font-weight:bold;"
                >
                  صورة سجل المصنع:
                </b-col>
                <b-col>
                  <b-img
                    :src="obj.factory_register_image"
                    style="max-height: 200px; cursor: pointer;"
                    alt="Responsive image"
                    @click="$bvModal.show('factory_register_image')"
                  />
                  <b-modal
                    id="factory_register_image"
                    size="m"
                    :hide-footer="true"
                  >
                    <b-img
                      :src="obj.factory_register_image"
                      fluid
                      alt="Responsive image"
                    />
                  </b-modal>
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
                  style="font-weight:bold;"
                >
                  صورة خطاب المصنع:
                </b-col>
                <b-col>
                  <b-img
                    :src="obj.letter_image"
                    style="max-height: 200px; cursor: pointer;"
                    alt="Responsive image"
                    @click="$bvModal.show('letter_image')"
                  />
                  <b-modal
                    id="letter_image"
                    size="m"
                    :hide-footer="true"
                  >
                    <b-img
                      :src="obj.letter_image"
                      fluid
                      alt="Responsive image"
                    />
                  </b-modal>
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
  BImg,
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
    BImg,
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
          name: 'مصنع',
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
    obj() {
      this.fetchData()
    },
  },
  created() {
    this.$store.dispatch('common/FETCH_GOV').then(res => {
      this.countryOptions = res.data.data.governorates
    })
    this.$store.dispatch('categories/fetch').then(res => {
      this.categoryOption = res.data.data
    })
  },
  methods: {
    fetchData() {
      this.$store.dispatch('company/showDetails', this.obj.user.id).then(res => {
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
