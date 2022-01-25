<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة التقارير"
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
            :items="getReports"
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

            <template #cell(image)="row">
              <b-avatar
                size="4rem"
                class="mr-1"
                :src="row.item.image"
              />
            </template>

            <template #cell(name)="row">
              {{ row.item.message }}
            </template>

            <template #cell(status)="row">
              {{ row.item.status == 1 ? 'جوال' : 'لوحة تحكم' }}
            </template>

            <template #cell(actions)="row">
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
  BAvatar,
} from 'bootstrap-vue'
import { faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'AllCategory',
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BAvatar,
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
        { key: 'message', label: 'رسالة' },
        { key: 'status', label: 'الحاله' },
        { key: 'actions', label: 'العمليات' },
      ],
      items: [
        {
          id: 1, message: 'نص تجربة الاعداد', status: '0',
        },
        {
          id: 2, message: 'نص تجربة الاعداد', status: '0',
        },
        {
          id: 3, message: 'نص تجربة الاعداد', status: '0',
        },
        {
          id: 4, message: 'نص تجربة الاعداد', status: '0',
        },
        {
          id: 5, message: 'نص تجربة الاعداد', status: '0',
        },
      ],
    }
  },
  computed: {
    rows() {
      return this.getReports.length
    },
    getReports() {
      /* eslint-disable no-param-reassign */
      return this.$store.state.reports.reports

      // return this.$store.state.reports.reports.map(element => {
      //   element.status = this.mapStatus(element.status)
      //   return element
      // })
    },
  },
  created() {
    this.$store.dispatch('reports/fetch').then(() => {})
  },
  methods: {
    edit(data) {
      this.Obj = data
      // console.log(this.Obj)
      this.$bvModal.show('EditCat')
    },
    confirmDelete(id) {
      this.$swal({
        title: 'حذف التقرير او الشكوى',
        text: 'هل تريد حذف التقرير او الشكوى',
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
          this.$store.dispatch('reports/delete', id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'عملية الحذف',
              text: 'تم حذف التقرير بنجاح',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          })
        }
      })
    },
    mapStatus(status) {
      const all = [
        {
          id: 0,
          name: 'لم يتم القراءة',
        },
        {
          id: 1,
          name: 'تم القراءة',
        },
      ]
      const item = all.find(x => x.id === parseFloat(status))
      return item ? item.name : ''
    },
  },
}
</script>

<style scoped></style>
