<template lang="html">
  <div style="display: inline;">
    <a
      v-if="download"
      :href="downloadLink"
      target="_blank">
      <el-button
        size="small"
        plain
        class="action_btn view_btn">Download PDF
      </el-button>
    </a>

    <el-button
      :disabled="loading"
      :style="internalPrintButton.style"
      :class="internalPrintButton.class"
      :size="internalPrintButton.size"
      :type="internalPrintButton.type"
      @click="printInvoice">{{ internalPrintButton.text }}
    </el-button>

    <iframe
      :id="`printLinkIframe${orderId}`"
      :src="printUrl"
      :name="`printLinkIframe${orderId}`"
      style="position:absolute;top:-9999px;left:-9999px;border:0px;overfow:none; z-index:-1"
      @load="loading = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PrintDownloadButton',

  components: {

  },

  props: {
    orderId: {
      type: [String, Number],
      required: true
    },

    download: {
      type: Boolean,
      required: false,
      default: () => { return true }
    },

    printButton: {
      type: Object,
      required: false,
      default: () => { return {} }
    },

    deliveryNote: {
      type: Boolean,
      required: false,
      default: () => { return false }
    }
  },

  data () {
    return {
      loading: true,
      defaultPrintButton: {
        class: '',
        type: 'success',
        size: 'small',
        style: 'float:right; margin-bottom:20px; margin-right:10px;',
        text: 'Print'
      }
    }
  },

  computed: {
    downloadLink () {
      return `/ecommerce-templates/invoice-download?reports=${this.orderId}`
    },

    printUrl () {
      if (this.deliveryNote) {
        return `${this.getSiteBaseURL}/ecommerce-templates/delivery-note?orders=${this.orderId}`
      }
      return `${this.getSiteBaseURL}/ecommerce-templates/invoice?reports=${this.orderId}`
    },

    internalPrintButton () {
      return {
        ...this.defaultPrintButton,
        ...this.printButton
      }
    },

    ...mapGetters([
      'shopData'
    ])
  },

  watch: {

  },

  mounted () {

  },

  methods: {
    printInvoice () {
      if (navigator.userAgent.match(/opera/i) || navigator.userAgent.match(/trident/i) || (navigator.userAgent.match(/msie/i) && window.addEventListener)) {
        window.open(
          this.printUrl,
          '_blank'
        )
      } else {
        frames[`printLinkIframe${this.orderId}`].focus()
        frames[`printLinkIframe${this.orderId}`].print()
      }
    }
  }
}
</script>

<style lang="css">
</style>
