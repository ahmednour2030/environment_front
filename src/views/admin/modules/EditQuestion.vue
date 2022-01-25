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
              <b-col cols="6">
                <b-form-group
                  label="السؤال"
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
                      placeholder="الرجاء كتابة السؤال"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="اخر الاختبار"
                  label-for="name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="name"
                    rules="required"
                  >
                    <b-form-select
                      id="exam"
                      v-model="examId"
                      placeholder="اختار الاختبار"
                      value-field="id"
                      text-field="name"
                      :options="exams"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="2">
                <b-button
                  class="mt-2"
                  variant="primary"
                  @click="add()"
                >
                  <feather-icon
                    icon="PlusIcon"
                    class="mr-25"
                  />                  إضافة حقل اجابة
                </b-button>
              </b-col>
              <!-- add button -->

              <b-col
                v-for="(input,k) in inputs"
                :key="k"
                ref="row"
                cols="12"
              >
                <hr class="w-100">
                <b-row>
                  <!-- username -->
                  <b-col cols="md-8">
                    <b-form-group
                      label="إجابة السؤال"
                      label-for="answer"
                    >
                      <validation-provider
                        #default="{ errors }"
                        :name="'answer' + k"
                        rules="required"
                      >
                        <b-form-input
                          id="answer"
                          v-model="input.answer"
                          :name="'answer' + k"
                          :state="errors.length > 0 ? false : null"
                          placeholder="إجابة السؤال"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <!-- username -->
                  <b-col cols="md-2">
                    <b-form-group
                      label="درجة الاجابة"
                      label-for="points"
                    >
                      <validation-provider
                        #default="{ errors }"
                        :name="'points' + k"
                        rules="required"
                      >
                        <b-form-input
                          id="points"
                          v-model="input.points"
                          type="number"
                          :name="'points' + k"
                          :state="errors.length > 0 ? false : null"
                          placeholder="درجة الاجابة"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>

                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <b-col cols="2">
                    <b-button
                      v-show="k || ( !k && inputs.length > 1)"
                      id="k"
                      class="mt-2 btn-sm"
                      variant="outline-danger"
                      @click.stop="remove(k)"
                    >
                      <feather-icon
                        icon="XIcon"
                        class="mr-25"
                      />                      حذف
                    </b-button>
                  </b-col>
                </b-row>
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
                  icon="EditIcon"
                  class="mr-25"
                />
                تعديل سؤال للنموج
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
import {
  BCard,
  BCardGroup,
  BButton,
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BFormSelect,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { heightTransition } from '@core/mixins/ui/transition'

const dictionary = {
  ar: {
    names: {
      title: 'السؤال',
      answer: 'إجابة السؤال',
      points: 'درجة السؤال',
      name: 'اسم الاختبار',
    },
  },
}
localize('ar', dictionary.ar)

export default {
  name: 'EditQuestion',
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
      exams: [],
      question: [],
      examId: null,
      inputs: [],
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
    this.getQuestion()
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    fetchExams() {
      this.$store.dispatch('exam/fetchName').then(res => {
        this.exams = res.data.data
      })
    },
    getQuestion() {
      this.$store.dispatch('question/show', this.$route.params.id).then(res => {
        this.obj = res.data.data
        this.title = this.obj.title
        this.examId = this.obj.exam_id
        this.obj.options.forEach(item => {
          this.inputs.push({
            answer: item.title,
            points: item.points,
          })
          this.$nextTick(() => {
            this.trAddHeight(this.$refs.row[0].offsetHeight)
          })
        })
      })
    },
    add() {
      this.inputs.push({
        title: '',
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
          formData.append('question_id', this.$route.params.id)
          formData.append('exam_id', this.examId)
          formData.append('title', this.title)
          this.inputs.forEach((input, index) => {
            formData.append(`options[${index}][option]`, input.answer)
            formData.append(`options[${index}][point]`, input.points)
          })

          this.$store.dispatch('question/edit', formData).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'تم تعديل السؤال للنموذج بنجاح',
                icon: 'CheckCircleIcon',
                variant: 'success',
              },
            })
            this.$router.push(`/questions/${this.examId}`)
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
