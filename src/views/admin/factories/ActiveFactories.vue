<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة المصانع المغعلة"
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
            :items="getFactories"
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

            <template #cell(email)="row">
              <a :href="'mailto:' + row.item.user.email">
                {{ row.item.user.email }}
              </a>
            </template>

            <template #cell(admin)="row">
              {{ row.item.user.admin ? row.item.user.admin.name : 'التطبيق' }}
            </template>

            <template #cell(category)="row">
              {{ row.item.category.name }}
            </template>

            <template #cell(actions)="row">
              <b-button
                class="mr-1 mt-1"
                size="sm"
                variant="primary"
                link
                :to="`/factory/edit/${row.item.user.id}`"
              >
                تعديل
              </b-button>
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
                @click="confirmRefuse(row.item.user.id)"
              >
                الغاء التفعيل
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
    <company-details :obj="obj" />
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BButton, BPagination, BCard,
} from 'bootstrap-vue'
import { faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import CompanyDetails from './companyDetails.vue'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'ActiveFactories',
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
        { key: 'admin', label: 'بواسطة' },
        { key: 'actions', label: 'العمليات' },
      ],
    }
  },
  computed: {
    rows() {
      return this.getFactories.length
    },
    getFactories() {
      return this.$store.state.factory.usersActive
    },
  },
  created() {
    this.$store.dispatch('factory/fetchActive')
  },
  methods: {
    confirmRefuse(id) {
      this.$swal({
        title: 'الغاء تفعيل المصنع',
        text: 'هل تريد موافق على الفاء تفعيل هذا المصنع',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'موافق',
        cancelButtonText: 'الغاء',
        customClass: {
          confirmButton: 'btn btn-warning',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$swal({
            icon: 'success',
            title: 'عملية القبول',
            text: 'تم الغاء التفعيل على هذا المصنع بنجاح',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          const Obj = {
            user_id: id,
            status: '0',
          }
          this.$store.dispatch('factory/inActive', Obj).then(() => {})
        }
      })
    },
    confirmDelete(id) {
      this.$swal({
        title: 'حذف المصنع',
        text: 'هل تريد حذف هذا المصنع',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'موافق',
        cancelButtonText: 'الغاء',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$swal({
            icon: 'success',
            title: 'عملية القبول',
            text: 'تم حذف على هذا المصنع بنجاح',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.$store.dispatch('factory/deleteActive', id).then(() => {})
        }
      })
    },
    showDetails(obj) {
      this.obj = obj
      this.$bvModal.show('companyDetails')
    },
  },
}
</script>

<style scoped></style>
