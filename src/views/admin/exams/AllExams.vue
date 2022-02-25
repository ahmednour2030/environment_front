<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة الاختبارات"
    >
      <template>
        <b-col cols="12">
          <b-table
            id="my-table"
            :per-page="perPage"
            :current-page="currentPage"
            head-variant
            hover
            responsive
            :items="getCoupons"
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

            <template #cell(title)="row">
              {{ row.item.title }}
            </template>

            <template #cell(module)="row">
              {{ row.item.module ? row.item.module.name : '' }}
            </template>

            <template #cell(actions)="row">
              <b-button
                class="mr-1"
                size="sm"
                variant="primary"
                @click="editPage(row.item.id)"
              > الاسئلة </b-button>
              <b-button
                class="mr-1"
                size="sm"
                variant="primary"
                @click="editPage(row.item.id)"
              > تعديل </b-button>
              <b-button
                class=""
                size="sm"
                variant="danger"
                @click="confirmDelete(row.item.id)"
              > حذف </b-button>
            </template>
          </b-table>
        </b-col>
        <div class="mt-3">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            align="left"
            :per-page="perPage"
            aria-controls="my-table"
          />
        </div>
        <edit-coupon :obj="Obj" />
      </template></b-card>
  </div>
</template>

<script>
import EditCoupon from '@/views/admin/questionnaires/EditQuestionnaire-old.vue'
import {
  BCol, BTable, BButton, BPagination, BCard, BSpinner,
} from 'bootstrap-vue'
import { faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'AllExams',
  components: {
    EditCoupon,
    BCard,
    BCol,
    BTable,
    BButton,
    BSpinner,
    BPagination,
  },
  data() {
    return {
      Obj: {},
      perPage: 10,
      currentPage: 1,
      add: true,
      busy: true,
      file: null,
      fields: [
        { key: 'id', label: 'م' },
        { key: 'name', label: 'اسم الاختبار' },
        { key: 'module', label: 'اسم الموديول' },
        { key: 'actions', label: 'العمليات' },
      ],
      items: [],
    }
  },
  computed: {
    rows() {
      return this.items.length
    },
    getCoupons() { return this.$store.state.exam.exams },
  },
  created() {
    this.$store.dispatch('exam/fetch').then(res => {
      this.items = res.data.data
    })
  },
  methods: {
    edit(data) {
      this.Obj = data
      // console.log(this.Obj)
      this.$bvModal.show('EditCat')
    },
    editPage(id) {
      this.$router.push(`/questions/${id}`)
    },
    confirmDelete(id) {
      this.$swal({
        title: 'حذف الاختبار',
        text: 'هل تريد حذف الاختبار',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'تاكيد الحذف !',
        cancelButtonText: 'الغاء',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('exam/delete', id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'عملية الحذف',
              text: 'تم حذف الاختبار بنجاح',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          })
        }
      })
    },
  },
}
</script>

<style scoped>

</style>
