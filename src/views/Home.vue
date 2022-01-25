<template>
  <b-card no-body>
    <b-row>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="total_price"
          icon="DollarSignIcon"
          statistic-title="عدد الطلاب"
        />
      </b-col>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="total"
          icon="ShoppingCartIcon"
          statistic-title="عدد الاختبارت"
        />
      </b-col>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="completed"
          icon="ShoppingCartIcon"
          statistic-title="عدد الكتب"
          color="primary"
        />
      </b-col>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="rejected"
          icon="ShoppingCartIcon"
          statistic-title="عدد الاستبيانات"
          color="primary"
        />
      </b-col>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="newOrders"
          icon="UserIcon"
          statistic-title="الملاحظات"
          color="primary"
        />
      </b-col>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="animateNumber(current)"
          icon="UserIcon"
          statistic-title="الادمن"
          color="primary"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { BCard, BRow, BCol } from 'bootstrap-vue'
import statisticsCard from '@core/components/statistics-cards/StatisticCardVertical.vue'

export default {
  components: {
    BCard,
    statisticsCard,
    BRow,
    BCol,
  },
  data() {
    return {
      new: 0,
      countnum: 0,
      current: 0,
      rejected: 0,
      total: 0,
      completed: 0,
      newOrders: 0,
      total_price: 0,
      // role: JSON.parse(localStorage.getItem('info')).role.name,
      // role: 'admin',
    }
  },
  created() {
    // const role = this.role === 'admin'
    //   ? 'common/fetchOrdersCount'
    //   : 'common/fetchOrdersCountUser'
    // this.$store.dispatch(role).then(res => {
    //   this.rejected = res.data.data.rejected
    //   this.total = res.data.data.total_count
    //   this.completed = res.data.data.completed
    //   this.current = res.data.data.current
    //   this.newOrders = res.data.data.new
    //   this.total_price = res.data.data.total_price
    // })
  },
  methods: {
    animateNumber(end) {
      let counter = 0
      setInterval(() => {
        if (counter < end) {
          counter += 1
        }
      }, 500)
      return counter
    },
  },
}
</script>

<style></style>
