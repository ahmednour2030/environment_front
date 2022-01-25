<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title="إضافة ملاحظة جديد"
      >
        <validation-observer ref="categoryRules">
          <b-form>
            <b-row>
              <!-- name -->
              <b-col md="6">
                <b-form-group
                  label="عنوان الملاحظة"
                  label-for="title"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="title"
                    rules="required"
                  >
                    <b-form-input
                      id="title"
                      v-model="title"
                      :state="errors.length > 0 ? false : null"
                      placeholder="عنوان الملاحظة"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group
                  label="صورة للملاحظة"
                  label-for="image"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="image"
                    rules="required"
                  >
                    <b-form-file
                      id="image"
                      v-model="image"
                      type="image"
                      :state="errors.length > 0 ? false : null"
                      placeholder="صورة الملاحظة"
                      @change="fileCategory"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Points -->
              <b-col md="12">
                <b-form-group
                  label="ملاحظات"
                  label-for="description"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="description"
                    rules="required"
                  >
                    <b-form-textarea
                      id="description"
                      v-model="description"
                      :state="errors.length > 0 ? false : null"
                      placeholder="الرجاء كتابة الملاحظة"
                      rows="5"
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
                  إضافة ملاحظة
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
  BFormTextarea,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dictionary = {
  ar: {
    names: {
      title: 'عنوان الملاحظة',
      description: 'الوصف',
      image: 'صورة الملاحظة',
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
    BFormTextarea,
  },
  data() {
    return {
      category_file: null,
      title: '',
      description: '',
      image: null,
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
    // this.$store.dispatch('categories/fetch').then(cats => {
    //   this.main = cats.data.data
    // })
  },
  methods: {
    validationForm() {
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('image', this.category_file)
      formData.append('description', this.description)
      console.log(formData)
      this.$refs.categoryRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('notes/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة الملاحظة بنجاح',
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
