<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              name
            </p>
            <!--            <span class="user-status">{{ userData.role.name }}</span>-->
            <span class="user-status">name</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            src=""
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item
          to="/"
          link-class="d-flex align-items-center"
        >
          <feather-icon
            size="16"
            icon="HomeIcon"
            class="mr-50"
          />
          <span>الصفحة الرئيسية</span>
        </b-dropdown-item>
        <b-dropdown-divider />

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>تسجيل الخروج</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,

    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      // userData: JSON.parse(localStorage.getItem('info')),
      avatarText,
      // avatarImg: JSON.parse(localStorage.getItem('info')).avatar,
    }
  },
  methods: {
    logout() {
      // Remove userData from localStorage
      localStorage.removeItem('info')
      localStorage.removeItem('token')
      localStorage.removeItem('loggedIn')
      // Redirect to login page
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
