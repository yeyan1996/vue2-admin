import svgIcon from '@/components/svgIcon/svgIcon'
import Vue from 'vue'

// register globally
Vue.component('svg-icon', svgIcon)

const req = require.context('./svg', false, /\.svg$/)

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)