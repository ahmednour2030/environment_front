<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة الإعدادات"
    >
      <b-row>
        <b-button
          class="mb-2 ml-2  float-left"
          size="md"
          variant="primary"
          @click="addNew()"
        >
          <feather-icon
            icon="PlusIcon"
          />
          اضافة
        </b-button>
        <b-col cols="12">
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

            <template #cell(image)="row">
              <b-avatar
                size="4rem"
                class="mr-1"
                :src="row.item.image"
              />
            </template>

            <template #cell(name)="row">
              {{ row.item.name }}
            </template>

            <template #cell(type)="row">
              {{ mapStatus(row.item.type) }}
            </template>

            <template #cell(actions)="row">
              <b-button
                class="mt-1 mr-1"
                size="sm"
                variant="primary"
                @click="edit(row.item)"
              >
                تعديل
              </b-button>
              <b-button
                class="mt-1 mr-1"
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
    <edit-setting :obj="Obj" />
  </div>
</template>

<script>
import EditSetting from '@/views/admin/setting/EditSetting.vue'
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
    EditSetting,
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
        { key: 'key', label: 'الرمز' },
        { key: 'value', label: 'القيمة' },
        { key: 'type', label: 'النوع' },
        { key: 'actions', label: 'العمليات' },
      ],
      items: [
        { key: 'key', value: 'value', type: 'type' },
        { key: 'key', value: 'value', type: 'type' },
        { key: 'key', value: 'value', type: 'type' },
        { key: 'key', value: 'value', type: 'type' },
        { key: 'key', value: 'value', type: 'type' },
        { key: 'key', value: 'value', type: 'type' },
      ],
    }
  },
  computed: {
    rows() {
      return this.items.length
    },
    // getSettings() {
    //   return this.$store.state.setting.settings
    // },
  },
  created() {
    // this.$store.dispatch('setting/fetch').then(() => {})
  },
  methods: {
    addNew() {
      this.Obj = { id: 'add' }
      // console.log(this.Obj)
      this.$bvModal.show('EditCat')
    },
    edit(data) {
      this.Obj = data
      // console.log(this.Obj)
      this.$bvModal.show('EditCat')
    },
    confirmDelete(id) {
      this.$swal({
        title: 'حذف الاعداد',
        text: 'هل تريد حذف الاعداد',
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
          this.$store.dispatch('setting/delete', id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'عملية الحذف',
              text: 'تم حذف الاعداد بنجاح',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          })
        }
      })
    },
    mapStatus(type) {
      const all = [
        {
          id: 1,
          name: '',
        },
        {
          id: 2,
          name: 'client',
        },
        {
          id: 3,
          name: 'company',
        },
        {
          id: 4,
          name: 'freelancer',
        },
        {
          id: 5,
          name: 'assessor',
        },
      ]
      const item = all.find(x => x.id === parseFloat(type))
      return item ? item.name : ''
    },
  },
}
</script>

<style scoped></style>
