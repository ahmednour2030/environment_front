<template>
  <div>
    <b-card
      ref="cardAction"
      title="مقيم الجودة الفعلة"
    >
      <b-row>
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
              >{{ data.label }}</span>
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
              {{ row.item.name }}
            </template>

            <template #cell(phone)="row">
              {{ row.item.phone }}
            </template>

            <template #cell(email)="row">
              {{ row.item.email }}
            </template>

            <template #cell(category)="row">
              {{ row.item.category ? row.item.category.name : '' }}
            </template>

            <template #cell(actions)="row">
              <b-button
                class="mr-1 mt-1"
                size="sm"
                variant="primary"
                link
                @click="edit(row.item)"
              > تعديل </b-button>
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
                variant="warning"
                @click="confirmRefuse(row.item.id)"
              > الغاء التفعيل </b-button>
              <b-button
                class="mt-1"
                size="sm"
                variant="danger"
                @click="confirmDelete(row.item.id)"
              > حذف </b-button>
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
    <company-details :obj="obj" />
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BButton, BPagination, BCard,
} from 'bootstrap-vue'
import { faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import CompanyDetails from '../admins/details.vue'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'ActiveFreelancers',
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BPagination,
    CompanyDetails,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      add: true,
      busy: true,
      obj: {},
      file: null,
      fields: [
        { key: 'id', label: 'م' },
        { key: 'name', label: 'الاسم' },
        { key: 'phone', label: 'التليفون' },
        { key: 'email', label: 'الايميل' },
        { key: 'category', label: 'التصنيف' },
        { key: 'actions', label: 'العمليات' },
      ],
    }
  },
  computed: {
    rows() {
      return this.getFreelancers.length
    },
    getFreelancers() { return this.$store.state.quality.usersActive },
  },
  created() {
    this.$store.dispatch('quality/fetchActive')
  },
  methods: {
    confirmRefuse(id) {
      this.$swal({
        title: 'عملية الغاء التفعيل',
        text: 'تم الغاء تفعيل هذا الشخص بنجاح',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'موافق',
        cancelButtonText: 'الغاء',
        customClass: {
          confirmButton: 'btn btn-warning',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$swal({
            icon: 'warning',
            title: 'عملية الغاء التفعيل',
            text: 'سوف يتم الغاء تفعيل هذا المستخدم',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          const Obj = {
            user_id: id,
            status: '0',
          }
          this.$store.dispatch('quality/inActive', Obj).then(() => {
          })
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
          this.$store.dispatch('quality/delete', id).then(() => {
          })
        }
      })
    },
    showDetails(obj) {
      this.obj = obj
      this.$bvModal.show('companyDetails')
    },
    edit(user) {
      this.$store.dispatch('quality/edit', user)
      this.$router.push(`/quality-evaluator/edit/${user.id}`)
    },
  },
}
</script>

<style scoped>

</style>
