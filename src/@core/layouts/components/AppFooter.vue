<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="/"
        target="_blank"
      >Ahmed Mohamed</b-link>
    </span>

    <span
      class="float-md-right d-none d-md-block"
    >صنع بواسطة المهندس احمد محمد
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
