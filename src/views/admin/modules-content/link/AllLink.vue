<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة الأقسام"
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
            :items="getLinks"
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

            <template #cell(descirption)="row">
              {{ row.item.descirption }}
            </template>

            <template #cell(url)="row">
              {{ row.item.url }}
            </template>

            <template #cell(point)="row">
              {{ row.item.point ? row.item.point.title : '' }}
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
  name: 'AllLink',
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
        { key: 'title', label: 'عنوان الرابط' },
        { key: 'description', label: 'وصف الرابط', sortable: true },
        { key: 'url', label: 'الرابط', sortable: true },
        { key: 'point', label: 'النقطة', sortable: true },
        { key: 'actions', label: 'العمليات' },
      ],
    }
  },
  computed: {
    rows() {
      // return this.getCategories.length
      return this.getLinks.length
    },
    getLinks() {
      /* eslint-disable no-param-reassign */
      return this.$store.state.link.link
    },
  },
  created() {
    this.$store.dispatch('link/fetch').then(() => {
      this.isBusy = false
    })
  },
  methods: {
    edit(data) {
      this.Obj = data
      // console.log(this.Obj)
      this.$bvModal.show('EditCat')
    },
    confirmDelete(id) {
      this.$swal({
        title: 'حذف الرابط',
        text: 'هل تريد حذف الرابط',
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
          this.$store.dispatch('link/delete', id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'عملية الحذف',
              text: 'تم حذف الرابط بنجاح',
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
