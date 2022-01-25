<template>
  <!-- Error page-->
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <b-img
        :src="appLogoImage"
        style="width: 35px"
        alt="logo"
      />
      <h2 class="brand-text text-primary ml-1">
        Education
      </h2>
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          الصفحة غير موجودة🕵🏻‍♀️
        </h2>
        <p class="mb-2">
          عذرا, هذه الصفحة غير موجوده
        </p>

        <b-button
          variant="primary"
          class="mb-2 btn-sm-block"
          :to="{path:'/'}"
        >
          عودة للصفحة الرئيسية
        </b-button>

        <!-- image -->
        <b-img
          fluid
          :src="imgUrl"
          alt="Error page"
        />
      </div>
    </div>
  </div>
<!-- / Error page-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BButton, BImg } from 'bootstrap-vue'
import store from '@/store'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BLink,
    BButton,
    BImg,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/error.svg'),
    }
  },
  setup() {
    // App Name
    const { appLogoImage } = $themeConfig.app
    return {
      appLogoImage,
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/error-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
