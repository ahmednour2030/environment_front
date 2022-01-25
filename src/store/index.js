import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
import categories from './categories'
import subCategories from './sub-categories'
import modules from './modules'
import modulesData from './modulesData'
import company from './company'
import exam from './exam'
import common from './common'
import orders from './orders'
import users from './users'
import admins from './admins'
import quality from './quality'
import questionnaire from './questionnaires'
import question from './question'
import setting from './setting'
import reports from './reports'
import slider from './slider'
import adsCategory from './ads-category'
import ads from './ads'
import notes from './notes'
import library from './library'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    categories,
    subCategories,
    modules,
    modulesData,
    company,
    exam,
    common,
    orders,
    users,
    admins,
    quality,
    questionnaire,
    question,
    setting,
    reports,
    slider,
    adsCategory,
    ads,
    notes,
    library,
  },
  strict: process.env.DEV,
})
