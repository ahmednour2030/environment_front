<template>
  <div>
    <b-card-group deck>
      <b-card
        header-tag="header"
        title=""
      >
        <validation-observer ref="simpleRules">
          <b-form
            ref="form"
            :style="{height: trHeight}"
            class="repeater-form"
          >
            <b-row>
              <!-- question -->
              <b-col cols="8">
                <b-form-group
                  label="اسم الامتحان"
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
                      placeholder="الرجاء كتابة اسم الامتحان"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="اسم الموديول"
                  label-for="type"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="module"
                    rules="required"
                  >
                    <b-form-select
                      id="country"
                      v-model="moduleId"
                      placeholder="اختار الموديول"
                      value-field="id"
                      text-field="name"
                      :options="modules"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <hr class="w-100">
            </b-row>
          </b-form>
          <b-row>
            <!-- login button -->
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
                إضافة امتحان جديد
              </b-button>
            </b-col>
          </b-row>
        </validation-observer>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { numeric, required } from '@/@core/utils/validations/validations'
// import { required } from '@validations'
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
import { heightTransition } from '@core/mixins/ui/transition'

const dictionary = {
  ar: {
    names: {
      title: 'اسم الامتحان',
      module: 'اسم الموديول',
    },
  },
}
localize('ar', dictionary.ar)

export default {
  name: 'AddQuestion',
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
  mixins: [heightTransition],
  data() {
    return {
      modules: [],
      moduleId: null,
      inputs: [{
        answer: '',
        points: '',
      }],
      title: '',
      options: [],
      required,
      numeric,
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    this.fetchExams()
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    fetchExams() {
      this.$store.dispatch('modules/fetchNames').then(res => {
        this.modules = res.data.data
      })
    },
    add() {
      this.inputs.push({
        answer: '',
        points: '',
      })
      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    remove(index) {
      this.inputs.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('module_id', this.moduleId)
          formData.append('name', this.title)

          this.$store.dispatch('exam/store', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم إضافة الامتحان بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
            this.$router.push('/exams')
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .repeater-form {
    overflow: hidden;
    transition: .35s height;
  }
</style>
