<template>
  <div>
    <b-card
      ref="cardAction"
      title="بيانات درجات الطلاب في الامتحان"
    >
      <b-row>
        <!--        <b-button-->
        <!--          class="mb-2 ml-2  float-left"-->
        <!--          size="md"-->
        <!--          variant="primary"-->
        <!--          @click="addAdmin()"-->
        <!--        >-->
        <!--          <feather-icon icon="PlusIcon" />-->
        <!--          اضافة-->
        <!--        </b-button>-->
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
              {{ row.item.user ? row.item.user.name : '' }}
            </template>

            <template #cell(exam)="row">
              {{ row.item.exam ? row.item.exam.name : '' }}
            </template>

            <template #cell(module)="row">
              {{ row.item.exam ? row.item.exam.module ? row.item.exam.module.name : '' : '' }}
            </template>

            <template #cell(points)="row">
              {{ row.item.total_points }}
            </template>

            <!--            <template #cell(actions)="row">-->
            <!--              <b-button-->
            <!--                class="mr-1"-->
            <!--                size="sm"-->
            <!--                variant="primary"-->
            <!--                @click="showDetails(row.item)"-->
            <!--              >-->
            <!--                الامتحانات-->
            <!--              </b-button>-->
            <!--              <b-button-->
            <!--                class="mr-1"-->
            <!--                size="sm"-->
            <!--                variant="primary"-->
            <!--                @click="editStudent(row.item)"-->
            <!--              >-->
            <!--                تعديل-->
            <!--              </b-button>-->
            <!--              <b-button-->
            <!--                class=""-->
            <!--                size="sm"-->
            <!--                variant="danger"-->
            <!--                @click="confirmDelete(row.item.id)"-->
            <!--              >-->
            <!--                حذف-->
            <!--              </b-button>-->
            <!--            </template>-->
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
    <!--    <create-admin />-->
    <!--    <edit-admin :user="activeUser" />-->
    <!--    <company-details :obj="obj" />-->
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BPagination, BCard,
} from 'bootstrap-vue'
import { faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
// import CompanyDetails from './Details.vue'
// import createAdmin from './CreateStudent.vue'
// import editAdmin from './EditStudent.vue'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'AllStudents',
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    // BButton,
    BPagination,
    // CompanyDetails,
    // createAdmin,
    // editAdmin,
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
        { key: 'name', label: 'اسم الطالب' },
        { key: 'exam', label: 'اسم الامتحان' },
        { key: 'module', label: 'اسم الموديول' },
        { key: 'points', label: 'الدرجة' },
        // { key: 'actions', label: 'العمليات' },
      ],
      items: [],
    }
  },
  computed: {
    rows() {
      return this.getStudents.length
    },
    getStudents() {
      return this.$store.state.students.students
    },
  },
  created() {
    this.$store.dispatch('exam/fetchSolutionByStudent', this.$route.params.id).then(res => {
      this.items = res.data.data
    })
  },
  methods: {
    confirmDelete(id) {
      this.$swal({
        title: 'حذف الطالب',
        text: 'هل تريد حذف هذا الطالب',
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
    editStudent(obj) {
      this.activeUser = obj
      // console.log(this.Obj)
      this.$bvModal.show('editAdmin')
    },
  },
}
</script>

<style scoped></style>
