<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة الموديولات"
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
            :items="getModules"
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

            <template #cell(image)="row">
              <b-img
                size="1rem"
                class="mr-1"
                fluid
                :src="row.item.image"
              />
            </template>

            <template #cell(name)="row">
              {{ row.item.name }}
            </template>

            <template #cell(points)="row">
              {{ row.item.points }}
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
    <edit-module :obj="Obj" />
  </div>
</template>

<script>
import EditModule from '@/views/admin/modules/EditModule.vue'
import {
  BRow, BCol, BTable, BButton, BPagination, BCard, BImg,
} from 'bootstrap-vue'
import { faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'AllModule',
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BImg,
    BPagination,
    EditModule,
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
        { key: 'image', label: 'صورة' },
        { key: 'name', label: 'الاسم' },
        { key: 'actions', label: 'العمليات' },
      ],
    }
  },
  computed: {
    rows() {
      // return this.getCategories.length
      return this.getModules.length
    },
    getModules() {
      /* eslint-disable no-param-reassign */
      return this.$store.state.modules.modules
    },
  },
  created() {
    this.$store.dispatch('modules/fetch').then(() => {
      this.isBusy = false
    })
  },
  methods: {
    edit(data) {
      this.Obj = data
      this.$bvModal.show('EditModule')
    },
    subCat(id) {
      this.$router.push(`/all-sub-category/${id}`)
    },
    allAdds(id) {
      this.$router.push(`/all-ads-category/${id}`)
    },
    // mapStatus(status) {
    //   const all = [
    //     {
    //       id: 1,
    //       name: 'فريلانسر',
    //     },
    //     {
    //       id: 2,
    //       name: 'شركة',
    //     },
    //     {
    //       id: 3,
    //       name: 'الكل',
    //     },
    //   ]
    //   const item = all.find(x => x.id === parseFloat(status))
    //   return item ? item.name : ''
    // },
    confirmDelete(id) {
      this.$swal({
        title: 'حذف القسم',
        text: 'هل تريد حذف القسم',
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
          this.$store.dispatch('categories/delete', id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'عملية الحذف',
              text: 'تم حذف القسم بنجاح',
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
