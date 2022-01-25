<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة العمالة الحرة"
    >
      <b-row>
        <b-button
          class="mb-2 ml-2  float-left"
          size="md"
          variant="primary"
          @click="addFreelancer()"
        >
          <feather-icon icon="PlusIcon" />
          اضافة
        </b-button>
        <b-col cols="12">
          <b-table
            id="my-table"
            :per-page="perPage"
            :current-page="currentPage"
            head-variant
            hover
            responsive
            :items="getFreelancers"
            :fields="fields"
            bordered
          >
            <template #head()="data">
              <span
                class="text-primary"
                style="font-size:18px"
              >{{
                data.label
              }}</span>
            </template>

            <template #table-busy>
              <div class="text-center text-dark my-2">
                <b-spinner class="align-middle" />
                <strong> Loading... </strong>
              </div>
            </template>

            <template #cell(id)="row">
              {{ row.item.id }}
            </template>

            <template #cell(name)="row">
              {{ row.item.user.name }}
            </template>

            <template #cell(phone)="row">
              {{ row.item.user.phone }}
            </template>

            <template #cell(admin)="row">
              {{ row.item.user.admin ? row.item.user.admin.name : 'التطبيق' }}
            </template>

            <template #cell(email)="row">
              <a :href="'mailto:' + row.item.user.email">
                {{ row.item.user.email }}
              </a>
            </template>

            <template #cell(category)="row">
              {{ row.item.category ? row.item.category.name : '' }}
            </template>
            <template #cell(rate)="row">
              <b-form-rating
                v-model="row.item.user.rate"
                dir="rtl"
                readonly
              />
            </template>
            <template #cell(actions)="row">
              <b-button
                class="mr-1 mt-1"
                size="sm"
                variant="primary"
                @click="showDetails(row.item)"
              >
                تفاصيل
              </b-button>
              <b-button
                class="mr-1 mt-1"
                size="sm"
                variant="primary"
                @click="editFreelancer(row.item.user)"
              >
                تعديل
              </b-button>
              <b-button
                class="mr-1 mt-1"
                size="sm"
                variant="success"
                @click="confirmRefuse(row.item.user.id)"
              >
                تفعيل
              </b-button>
              <b-button
                class="mt-1"
                size="sm"
                variant="danger"
                @click="confirmDelete(row.item.user.id)"
              >
                حذف
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <div class="mt-3">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          align="left"
          :per-page="perPage"
          aria-controls="my-table"
        />
      </div>
    </b-card>
    <edit-freelancer :user="activeUser" />
    <create-freelancer />
    <company-details :obj="obj" />
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BTable,
  BButton,
  BPagination,
  BCard,
  BFormRating,
} from 'bootstrap-vue'
import { faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import EditFreelancer from './EditFreelancer.vue'
import CreateFreelancer from './CreateFreelancer.vue'
import CompanyDetails from './companyDetails.vue'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'AllFreelancers',
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BPagination,
    EditFreelancer,
    CreateFreelancer,
    BFormRating,
    CompanyDetails,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      obj: {},
      add: true,
      busy: true,
      file: null,
      activeUser: {},
      fields: [
        { key: 'id', label: 'م' },
        { key: 'name', label: 'الاسم' },
        { key: 'phone', label: 'التليفون' },
        { key: 'email', label: 'الايميل' },
        { key: 'category', label: 'التصنيف' },
        { key: 'admin', label: 'بواسطة' },
        { key: 'rate', label: 'التقييم' },
        { key: 'actions', label: 'العمليات' },
      ],
    }
  },
  computed: {
    rows() {
      return this.getFreelancers.length
    },
    getFreelancers() {
      return this.$store.state.freelancer.users
    },
  },
  created() {
    this.$store.dispatch('freelancer/fetch')
  },
  methods: {
    confirmAccepted(id) {
      this.$swal({
        title: 'قبول الشخص',
        text: 'هل تريد موافق على اضافة هذا الشخص',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'موافق',
        cancelButtonText: 'الغاء',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$swal({
            icon: 'success',
            title: 'عملية القبول',
            text: 'تم الموافقة على هذا الشخص بنجاح',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          const Obj = {
            user_id: id,
            status: '1',
          }
          this.$store.dispatch('freelancer/active', Obj).then(() => {})
        }
      })
    },
    confirmDelete(id) {
      this.$swal({
        title: 'حذف الشخص',
        text: 'هل تريد حذف هذا الشخص',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'موافق',
        cancelButtonText: 'الغاء',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$swal({
            icon: 'success',
            title: 'عملية حذف',
            text: 'تم تفعيل هذا الشخص بنجاح!',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.$store.dispatch('freelancer/delete', id).then(() => {})
        }
      })
    },
    confirmRefuse(id) {
      this.$swal({
        title: 'عملية التفعيل',
        text: 'تم تفعيل هذا الشخص بنجاح',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'موافق',
        cancelButtonText: 'الغاء',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$swal({
            icon: 'warning',
            title: 'عملية  التفعيل',
            text: 'سوف تفعيل هذا المستخدم',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          const Obj = {
            user_id: id,
            status: '1',
          }
          this.$store.dispatch('freelancer/inActive', Obj).then(() => {})
        }
      })
    },
    editFreelancer(user) {
      this.activeUser = user
      // console.log(this.Obj)
      this.$bvModal.show('EditFreelancer')
    },
    addFreelancer(user) {
      this.activeUser = user
      // console.log(this.Obj)
      this.$bvModal.show('CreateFreelancer')
    },
    showDetails(obj) {
      this.obj = obj
      this.$bvModal.show('companyDetails')
    },
  },
}
</script>

<style scoped></style>
