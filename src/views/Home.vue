<template>
  <b-card no-body>
    <b-row>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="students"
          icon="UserIcon"
          statistic-title="عدد الطلاب"
        />
      </b-col>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="questions"
          icon="BookIcon"
          statistic-title="عدد الاختبارت"
        />
      </b-col>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="books"
          icon="BookOpenIcon"
          statistic-title="عدد الكتب"
          color="primary"
        />
      </b-col>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="questionnaire"
          icon="BookmarkIcon"
          statistic-title="عدد الاستبيانات"
          color="primary"
        />
      </b-col>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="notes"
          icon="MessageCircleIcon"
          statistic-title="الملاحظات"
          color="primary"
        />
      </b-col>
      <b-col
        sm="2"
        md="2"
      >
        <statisticsCard
          :statistic="admins"
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
      admins: 0,
      students: 0,
      books: 0,
      questions: 0,
      questionnaire: 0,
      notes: 0,
      // role: JSON.parse(localStorage.getItem('info')).role.name,
      // role: 'admin',
    }
  },
  created() {
    // const role = this.role === 'admin'
    //   ? 'common/fetchOrdersCount'
    //   : 'common/fetchOrdersCountUser'
    this.$store.dispatch('home/fetch').then(res => {
      this.admins = res.data.data.admins
      this.students = res.data.data.students
      this.books = res.data.data.books
      this.questions = res.data.data.questions
      this.questionnaire = res.data.data.questionnaire
      this.notes = res.data.data.notes
    })
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
