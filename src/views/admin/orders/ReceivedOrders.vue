<template>
  <div>
    <b-card
      ref="cardAction"
      title="كافة الطلبات"
    >
      <downloadExcel
        class="btn mb-2 btn-success download download-js-link"
        :data="items"
        name="filename.xls"
      >
        تصدير ملف اكسيل
      </downloadExcel>
      <b-row>
        <b-col cols="12">
          <b-table
            id="my-table"
            :per-page="perPage"
            :current-page="currentPage"
            head-variant
            hover
            responsive
            :items="getOrders"
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
              {{ row.item.client }}
            </template>

            <template #cell(owner)="row">
              {{ row.item.serviceProvider }}
            </template>

            <template #cell(category)="row">
              {{ row.item.category }}
            </template>

            <template #cell(price)="row">
              {{ row.item.price }}
            </template>

            <template #cell(actions)="row">
              <b-button
                class="mr-1"
                size="sm"
                variant="success"
                @click="showDetails(row.item.id)"
              >
                تفاصيل
              </b-button>
              <!--              <b-button-->
              <!--                class=""-->
              <!--                size="sm"-->
              <!--                variant="success"-->
              <!--                @click="showDetails(row.item.id)"-->
              <!--              >-->
              <!--                تم المراجعه-->
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
import downloadExcel from 'vue-json-excel'
import orderDetails from './showDetails.vue'

library.add(faEye, faTrash, faPlus)

export default {
  name: 'ReceivedOrders',
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BPagination,
    orderDetails,
    downloadExcel,
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
        { key: 'user', label: 'اسم مقدم الخدمة' },
        { key: 'qty', label: 'الكمية' },
        { key: 'booking_amount', label: 'سعر الطلب' },
        { key: 'insurance_amount', label: 'التامين' },
        { key: 'tax', label: 'الضريبة' },
        { key: 'status', label: 'الحاله' },
        { key: 'total_amount', label: 'مبلغ الاجمالي' },
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
      return this.getOrders.length
    },
    getOrders() {
      /* eslint-disable no-param-reassign */
      return this.$store.state.orders.orders
    },
  },
  created() {
    this.$store.dispatch('orders/fetchReceived').then()
  },
  methods: {
    mapStatus(status) {
      const all = [
        {
          id: 1,
          name: 'طلب جديد',
        },
        {
          id: 2,
          name: 'طلب جاري',
        },
        {
          id: 3,
          name: 'طلب مكتمل',
        },
        {
          id: 4,
          name: ' طلب مرفوض',
        },
        {
          id: 5,
          name: 'تمت مراجعته ومقبول',
        },
        {
          id: 6,
          name: 'تمت مراجعته ومرفوض',
        },
      ]
      const item = all.find(x => x.id === parseFloat(status))
      return item ? item.name : ''
    },
    showDetails(id) {
      this.activeID = id
      this.$bvModal.show('orderDetails')
    },
  },
}
</script>

<style scoped></style>
