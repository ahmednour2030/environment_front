<template>
  <div>
    <b-card
      ref="cardAction"
      title="الادمن"
    >
      <b-row>
        <b-button
          class="mb-2 ml-2  float-left"
          size="md"
          variant="primary"
          @click="addAdmin()"
        >
          <feather-icon icon="PlusIcon" />
          اضافة
        </b-button>
        <b-col cols="12">
          <!--:items="getAdmins"-->
          <b-table
            id="my-table"
            :per-page="perPage"
            :current-page="currentPage"
            head-variant
            hover
            responsive
            :items="items"
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
              {{ row.item.name }}
            </template>

            <template #cell(phone)="row">
              {{ row.item.phone }}
            </template>

            <template #cell(email)="row">
              {{ row.item.email }}
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
                class="mr-1"
                size="sm"
                variant="primary"
                @click="editAdmin(row.item)"
              >
                تعديل
              </b-button>
              <b-button
                class=""
                size="sm"
                variant="danger"
                @click="confirmDelete(row.item.id)"
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
    <create-admin />
    <edit-admin :user="activeUser" />
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
import createAdmin from './createAdmin.vue'
import editAdmin from './editAdmin.vue'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'AllAdmins',
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BPagination,
    CompanyDetails,
    createAdmin,
    editAdmin,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      add: true,
      busy: true,
      obj: {},
      activeUser: {},
      file: null,
      fields: [
        { key: 'id', label: 'م' },
        { key: 'name', label: 'الاسم' },
        { key: 'phone', label: 'التليفون' },
        { key: 'email', label: 'الايميل' },
        { key: 'actions', label: 'العمليات' },
      ],
      items: [
        {
          id: 1,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 2,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 3,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 4,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 5,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 6,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 7,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 8,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 9,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 10,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 11,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 12,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 13,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 14,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 15,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
        {
          id: 16,
          name: 'ادمن تجريبي',
          phone: '0123456789',
          email: 'admin@test.com',
        },
      ],
    }
  },
  computed: {
    rows() {
      return this.items.length
    },
    // getAdmins() {
    //   return this.$store.state.admins.admins
    // },
  },
  created() {
    // this.$store.dispatch('admins/fetch').then(() => {})
  },
  methods: {
    confirmDelete(id) {
      this.$swal({
        title: 'حذف الادمن',
        text: 'هل تريد حذف هذا الادمن',
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
            text: 'تم حذف على هذا الادمن بنجاح',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          console.log(id)
          // this.$store.dispatch('admins/delete', id).then(() => {})
        }
      })
    },
    showDetails(obj) {
      this.obj = obj
      this.$bvModal.show('companyDetails')
    },
    addAdmin() {
      // console.log(this.Obj)
      this.$bvModal.show('CreateFreelancer')
    },
    editAdmin(obj) {
      this.activeUser = obj
      // console.log(this.Obj)
      this.$bvModal.show('editAdmin')
    },
  },
}
</script>

<style scoped></style>
