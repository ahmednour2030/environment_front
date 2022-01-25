<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title="إضافة قسم رئيسي جديد"
      >
        <validation-observer ref="categoryRules">
          <b-form>
            <b-row>
              <!-- name -->
              <b-col md="6">
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
                      v-model="name"
                      :state="errors.length > 0 ? false : null"
                      placeholder="اسم القسم"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="صورة القسم"
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
                      placeholder="صورة القسم"
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
                  إضافة قسم
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
  },
  data() {
    return {
      category_file: null,
      name: '',
      points: '',
      image: null,
      imageCat: null,
      required,
    }
  },
  methods: {
    validationForm() {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('image', this.category_file)
      this.$refs.categoryRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('categories/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة القسم بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
          })
          this.$router.push('all-category')
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
