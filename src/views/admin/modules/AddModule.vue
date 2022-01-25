<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title="إضافة موديول"
      >
        <validation-observer ref="categoryRules">
          <b-form>
            <b-row>
              <!-- name -->
              <b-col md="6">
                <b-form-group
                  label="اسم الموديول"
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
                      placeholder="اسم الموديول"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="صورة الموديول"
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
                      placeholder="صورة الموديول"
                      @change="fileCategory"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- description -->
              <b-col md="12">
                <b-form-group
                  label="الوصف"
                  label-for="description"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="description"
                    rules="required"
                  >
                    <b-form-textarea
                      id="summary"
                      v-model="description"
                      :state="errors.length > 0 ? false : null"
                      placeholder="الرجاء كتابة وصف الموديول"
                      rows="5"
                      max-rows="10"
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
                  إضافة موديول
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
      name: 'اسم الموديول',
      description: 'وصف الموديول',
      image: 'صورة الموديول',
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
      imageCat: null,
      name: '',
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
      formData.append('name', this.name)
      formData.append('image', this.category_file)
      formData.append('description', this.description)
      this.$refs.categoryRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('modules/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة الموديول بنجاح',
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
