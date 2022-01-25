<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة السلايدرات"
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
            :items="getSlider"
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
                :src="'https://quetzal-soft.com/rentage/storage/images/'+row.item.image"
              />
            </template>

            <template #cell(name)="row">
              {{ row.item.name }}
            </template>

            <template #cell(type)="row">
              {{ row.item.type === 1 ? 'جوال' : 'لوحة تحكم' }}
            </template>

            <template #cell(actions)="row">
              <b-button
                class="mr-1"
                size="sm"
                variant="primary"
                @click="edit(row.item)"
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
    <edit-slider :obj="Obj" />
  </div>
</template>

<script>
import EditSlider from '@/views/admin/slider/EditSlider.vue'
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
    EditSlider,
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
        { key: 'image', label: 'صورة' },
        { key: 'actions', label: 'العمليات' },
      ],
      items: [
        {
          id: 1, name: 'تصنيف', image: 'https://via.placeholder.com/150',
        },
        {
          id: 2, name: 'محمد احمد ', image: 'https://via.placeholder.com/150',
        },
        {
          id: 3, name: 'محمد احمد ', image: 'https://via.placeholder.com/150',
        },
        {
          id: 4, name: 'محمد احمد ', image: 'https://via.placeholder.com/150',
        },
        {
          id: 5, name: 'محمد احمد ', image: 'https://via.placeholder.com/150',
        },
      ],
    }
  },
  computed: {
    rows() {
      return this.getSlider.length
    },
    getSlider() {
      return this.$store.state.slider.sliders
    },
  },
  created() {
    this.$store.dispatch('slider/fetch').then(() => {})
  },
  methods: {
    addNew() {
      this.Obj = { id: 'add' }
      this.$bvModal.show('EditSlider')
    },
    edit(data) {
      this.Obj = data
      // console.log(this.Obj)
      this.$bvModal.show('EditSlider')
    },
    confirmDelete(id) {
      this.$swal({
        title: 'حذف السلايدر',
        text: 'هل تريد حذف السلايدر',
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
          this.$store.dispatch('slider/delete', id).then(() => {
            this.$swal({
              icon: 'success',
              title: 'عملية الحذف',
              text: 'تم حذف السلايدر بنجاح',
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

<style scoped></style>
