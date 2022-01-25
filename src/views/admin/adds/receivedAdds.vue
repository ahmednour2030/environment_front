<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة الطلبات"
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
            :items="getAds"
            :fields="fields"
            bordered
          >
            <template #head()="data">
              <span
                class="text-primary"
                style="font-size:16px"
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

            <template #cell(user)="row">
              {{ row.item.user ? row.item.user.name : '' }}
            </template>

            <template #cell(owner)="row">
              {{ row.item.owner ? row.item.owner.name : '' }}
            </template>

            <template #cell(category)="row">
              {{ row.item.category ? row.item.category.name : '' }}
            </template>

            <template #cell(price)="row">
              {{ row.item.price }}
            </template>

            <template #cell(actions)="row">
              <b-button
                class="mr-1"
                size="sm"
                variant="success"
                @click="confirmAccepted(row.item.id)"
              >
                تفعيل الاعلان
              </b-button>
              <!--              <b-button-->
              <!--                class="mr-1"-->
              <!--                size="sm"-->
              <!--                variant="warning"-->
              <!--                @click="showDetails(row.item.id)"-->
              <!--              >-->
              <!--                تفاصيل-->
              <!--              </b-button>-->
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
    <order-details :id="activeID" />
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BButton, BPagination, BCard,
} from 'bootstrap-vue'
import { faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import orderDetails from './showDetails.vue'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'AcceptedOrders',
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BPagination,
    orderDetails,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      activeID: null,
      add: true,
      busy: true,
      file: null,
      fields: [
        { key: 'id', label: 'رقم الطلب' },
        { key: 'fullname', label: 'اسم العميل' },
        { key: 'ad_name', label: 'اسم الاعلان' },
        { key: 'category_name', label: 'التصنيف' },
        { key: 'price', label: 'سعر الطلب' },
        { key: 'qty', label: 'الكمية' },
        { key: 'status', label: 'الحاله' },
        { key: 'insurance_amount', label: 'مبلغ التامين' },
        { key: 'actions', label: 'العمليات' },
      ],
      items: [
        {
          id: 1,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 2,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 3,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 4,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 5,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 6,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 7,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 8,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 9,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 10,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 11,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 12,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 13,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 14,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 15,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
        {
          id: 16,
          num: '12548',
          client: 'احمد محمد',
          serviceProvider: 'محمد احمد',
          category: 'تصنيف تجريبي',
          price: 255,
          tax: 20,
          commission: 50,
        },
      ],
    }
  },
  computed: {
    rows() {
      return this.getAds.length
    },
    getAds() {
      /* eslint-disable no-param-reassign */
      return this.$store.state.ads.ads.map(element => {
        element.status = this.mapStatus(element.status)
        return element
      })
    },
  },
  created() {
    this.$store.dispatch('ads/fetchWaiting').then()
  },
  methods: {
    mapStatus(status) {
      const all = [
        {
          id: 0,
          name: 'اعلان تحت التفعيل',
        },
        {
          id: 1,
          name: 'اعلان مفعل',
        },
      ]
      const item = all.find(x => x.id === parseFloat(status))
      return item ? item.name : ''
    },
    showDetails(id) {
      this.activeID = id
      this.$bvModal.show('orderDetails')
    },
    confirmAccepted(id) {
      this.$swal({
        title: 'تاكيد الاعلان',
        text: 'هل تريد تاكيد الاعلان',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'تاكيد الاعلان !',
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
              title: 'عملية تاكيد الاعلان',
              text: 'تم تاكيد الاعلان بنجاح',
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
