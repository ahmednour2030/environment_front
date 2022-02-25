<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة الملخصات"
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
            :items="getSummary"
            :busy="isBusy"
            :fields="fields"
            bordered
            fixed
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
                <strong> جار تحميل البيانات ... </strong>
              </div>
            </template>

            <template #cell(id)="row">
              {{ row.item.id }}
            </template>
            <template #cell(title)="row">
              {{ row.item.title }}
            </template>
            <template #cell(type)="row">
              {{ row.item.type === 1 ? 'هدف' : 'ملخص' }}
            </template>

            <template #cell(module)="row">
              {{ row.item.module ? row.item.module.name : '' }}
            </template>

            <template #cell(category)="row">
              {{ row.item.category ? row.item.category.name : '' }}
            </template>

            <template #cell(actions)="row">
              <b-button
                class="mr-1"
                size="sm"
                variant="primary"
                @click="edit(row.item)"
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
    <edit-category :obj="Obj" />
  </div>
</template>

<script>
import EditCategory from '@/views/admin/category/EditCategory.vue'
import {
  BRow, BCol, BTable, BButton, BPagination, BCard, BSpinner,
} from 'bootstrap-vue'
import { faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'AllContent',
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BSpinner,
    BPagination,
    EditCategory,
  },
  data() {
    return {
      Obj: {},
      url: process.env.URL,
      perPage: 10,
      currentPage: 1,
      add: true,
      busy: true,
      file: null,
      isBusy: true,
      fields: [
        { key: 'id', label: 'م' },
        { key: 'title', label: 'عنوان المحتوى' },
        { key: 'type', label: 'النوع' },
        { key: 'module', label: 'اسم الموديول' },
        { key: 'category', label: 'التصنيف' },
        { key: 'actions', label: 'العمليات' },
      ],
    }
  },
  computed: {
    rows() {
      // return this.getCategories.length
      return this.getSummary.length
    },
    getSummary() {
      /* eslint-disable no-param-reassign */
      return this.$store.state.modulesData.modules
    },
  },
  created() {
    this.$store.dispatch('modulesData/fetchSummary').then(() => {
      this.isBusy = false
    })
  },
  methods: {
    edit(data) {
      this.Obj = data
      this.$bvModal.show('EditCat')
    },
    confirmDelete(id) {
      this.$swal({
        title: 'حذف الملخص',
        text: 'هل تريد حذف الملخص',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'تاكيد الحذف !',
        cancelButtonText: 'الغاء',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('modulesData/delete', id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'عملية الحذف',
              text: 'تم حذف الملخص بنجاح',
              confirmButtonText: 'موافق',
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
