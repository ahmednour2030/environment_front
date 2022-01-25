<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title="إضافة مكتبة"
      >
        <validation-observer ref="categoryRules">
          <b-form>
            <b-row>
              <!-- name -->
              <b-col md="8">
                <b-form-group
                  label="عنوان الكتاب"
                  label-for="name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="name"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="name"
                      :state="errors.length > 0 ? false : null"
                      placeholder="عنوان الكتاب"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="اسم الموديول"
                  label-for="name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="name"
                    rules="required"
                  >
                    <b-form-select
                      id="exam"
                      v-model="moduleId"
                      placeholder="اختار الاختبار"
                      value-field="id"
                      text-field="name"
                      :options="modules"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="رفع الملف"
                  label-for="image"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="image"
                    rules="required"
                  >
                    <b-form-file
                      id="image"
                      v-model="imageCat"
                      type="image"
                      :state="errors.length > 0 ? false : null"
                      placeholder="الملف"
                      @change="fileCategory"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- create button -->
              <b-col cols="12">
                <b-button
                  variant="primary"
                  type="submit"
                  @click.prevent="validationForm"
                >
                  <feather-icon
                    icon="PlusIcon"
                    class="mr-25"
                  />
                  إضافة ملف للمكتبة
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required } from '@/@core/utils/validations/validations'
import {
  BCard,
  BCardGroup,
  BButton,
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BFormFile,
  BFormSelect,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      name: 'اسم القسم',
      image: 'صورة القسم',
      point: 'قيمة النقط',
    },
  },
}
localize('ar', dictionary.ar)
export default {
  name: 'AddCategory',
  components: {
    ValidationProvider,
    ValidationObserver,
    BCard,
    BCardGroup,
    BButton,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BFormFile,
    BFormSelect,
  },
  data() {
    return {
      modules: [],
      category_file: null,
      moduleId: null,
      name: '',
      points: '',
      image: null,
      imageCat: null,
      required,
    }
  },
  // computed: {
  //   rows() {
  //     // return this.getCategories.length
  //     return this.items.length
  //   },
  //   getCategories() {
  //     return this.$store.state.categories.categories
  //   // },
  // },
  created() {
    this.$store.dispatch('modules/fetchNames').then(cats => {
      this.modules = cats.data.data
    })
  },
  methods: {
    validationForm() {
      const formData = new FormData()
      formData.append('title', this.name)
      formData.append('file', this.category_file)
      formData.append('module_id', this.moduleId)
      console.log(formData)
      this.$refs.categoryRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('library/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة الملف في المكتبة بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
          })
        }
      })
    },
    validationFormSub() {
      const formData = new FormData()
      formData.append('name', this.nameSub)
      formData.append('category_id', this.mainCatId)
      this.$refs.simpleRules.validate().then(success => {
        console.log(formData)
        if (success) {
          this.$store.dispatch('subCategories/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة القسم بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
          })
        }
      })
    },
    fileCategory(event) {
      // eslint-disable-next-line prefer-destructuring
      this.category_file = event.target.files[0]
    },
  },
}
</script>

<style scoped></style>
