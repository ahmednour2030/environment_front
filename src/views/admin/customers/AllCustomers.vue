<template>
  <div>
    <b-card
      ref="cardAction"
      title="العملاء"
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
            :items="getUsers"
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
              {{ row.item.fullname }}
            </template>

            <template #cell(name)="row">
              {{ row.item.phone_number }}
            </template>

            <template #cell(name)="row">
              {{ row.item.created_at }}
            </template>

            <template #cell(actions)="row">
              <!--              <b-button-->
              <!--                class="mr-1"-->
              <!--                size="sm"-->
              <!--                variant="primary"-->
              <!--                @click="showDetails(row.item)"-->
              <!--              >-->
              <!--                تفاصيل-->
              <!--              </b-button>-->
              <b-button
                class=""
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
import CompanyDetails from './details.vue'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'AllCustomers',
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
        { key: 'fullname', label: 'الاسم' },
        { key: 'phone_number', label: 'التليفون' },
        { key: 'email', label: 'الايميل' },
        { key: 'ads', label: 'الاعلانات' },
        { key: 'order', label: 'الطلبات' },
        { key: 'message', label: 'الرسائل' },
        { key: 'created_at', label: 'تاريخ التسجيل' },
        { key: 'actions', label: 'العمليات' },
      ],
      items: [
        {
          id: 1, name: 'محمد احمد ', phone: '0123456789', email: 'eamil@test.com', category: 'تصنيف تجريبي',
        },
        {
          id: 2, name: 'محمد احمد ', phone: '0123456789', email: 'eamil@test.com', category: 'تصنيف تجريبي',
        },
        {
          id: 3, name: 'محمد احمد ', phone: '0123456789', email: 'eamil@test.com', category: 'تصنيف تجريبي',
        },
        {
          id: 4, name: 'محمد احمد ', phone: '0123456789', email: 'eamil@test.com', category: 'تصنيف تجريبي',
        },
        {
          id: 5, name: 'محمد احمد ', phone: '0123456789', email: 'eamil@test.com', category: 'تصنيف تجريبي',
        },
        {
          id: 6, name: 'محمد احمد ', phone: '0123456789', email: 'eamil@test.com', category: 'تصنيف تجريبي',
        },
        {
          id: 7, name: 'محمد احمد ', phone: '0123456789', email: 'eamil@test.com', category: 'تصنيف تجريبي',
        },
        {
          id: 8, name: 'محمد احمد ', phone: '0123456789', email: 'eamil@test.com', category: 'تصنيف تجريبي',
        },
        {
          id: 9, name: 'محمد احمد ', phone: '0123456789', email: 'eamil@test.com', category: 'تصنيف تجريبي',
        },
        {
          id: 10, name: 'محمد احمد ', phone: '0123456789', email: 'eamil@test.com', category: 'تصنيف تجريبي',
        },
      ],
    }
  },
  computed: {
    rows() {
      return this.getUsers.length
    },
    getUsers() { return this.$store.state.users.users },
  },
  created() {
    this.$store.dispatch('users/fetch').then(() => {
      console.log(this.getUsers)
    })
  },
  methods: {
    confirmDelete(id) {
      this.$swal({
        title: 'حذف العميل',
        text: 'هل تريد حذف هذا العميل',
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
            text: 'تم حذف على هذا العميل بنجاح',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.$store.dispatch('users/delete', id).then(() => {
          })
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

<style scoped>

</style>
