import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
import home from './home'
import categories from './categories'
import content from './content'
import point from './point'
import link from './link'
import subCategories from './sub-categories'
import modules from './modules'
import modulesData from './modulesData'
import company from './company'
import exam from './exam'
import activities from './activities'
import common from './common'
import orders from './orders'
import students from './students'
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
import files from './files'

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
    students,
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
    activities,
    content,
    point,
    link,
    home,
    files,
  },
  strict: process.env.DEV,
})
