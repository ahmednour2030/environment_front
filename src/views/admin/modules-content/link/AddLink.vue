<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title="إضافة لينك جديد"
      >
        <validation-observer ref="categoryRules">
          <b-form>
            <b-row>
              <!-- name -->
              <b-col md="6">
                <b-form-group
                  label="اسم الرابط"
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
                      placeholder="اسم الرابط"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- name -->
              <b-col md="6">
                <b-form-group
                  label="وصف الرابط"
                  label-for="description"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="description"
                    rules="required"
                  >
                    <b-form-input
                      id="description"
                      v-model="description"
                      :state="errors.length > 0 ? false : null"
                      placeholder="وصف الرابط"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <!-- name -->
              <b-col md="6">
                <b-form-group
                  label="الرابط"
                  label-for="url"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="url"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="url"
                      :state="errors.length > 0 ? false : null"
                      placeholder="الرابط"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="اخر التصنيف"
                  label-for="point"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="name"
                    rules="required"
                  >
                    <b-form-select
                      id="exam"
                      v-model="pointId"
                      placeholder="اختار التصنيف"
                      value-field="id"
                      text-field="title"
                      :options="points"
                      :state="errors.length > 0 ? false : null"
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
                  إضافة رابط
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
import { required } from '@core/utils/validations/validations'
import {
  BCard,
  BCardGroup,
  BButton,
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol, BFormSelect,
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
  name: 'AddLink',
  components: {
    ValidationProvider,
    ValidationObserver,
    BCard,
    BCardGroup,
    BButton,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BForm,
    BRow,
    BCol,
  },
  data() {
    return {
      points: [],
      pointId: null,
      category_file: null,
      title: '',
      description: '',
      url: '',
      image: null,
      imageCat: null,
      required,
    }
  },
  created() {
    this.fetchPoints()
  },
  methods: {
    validationForm() {
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('url', this.url)
      formData.append('point_id', this.pointId)
      this.$refs.categoryRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('link/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة الرابط بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
          })
          this.$router.push('all-link')
        }
      })
    },
    fetchPoints() {
      this.$store.dispatch('point/fetch').then(res => {
        this.points = res.data.data
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
