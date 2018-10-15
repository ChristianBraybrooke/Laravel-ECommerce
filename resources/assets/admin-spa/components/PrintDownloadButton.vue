<template lang="html">
  <div>
    <a
      :href="downloadLink"
      target="_blank"
      style="float:right; margin-bottom:20px;">
      <el-button
        size="small"
        plain
        class="action_btn view_btn">Download PDF
      </el-button>
    </a>

    <el-button
      :disabled="loading"
      size="small"
      style="float:right; margin-bottom:20px; margin-right:10px"
      type="success"
      @click="printInvoice">Print
    </el-button>

    <iframe
      id="printLinkIframe"
      :src="printUrl"
      name="printLinkIframe"
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
    }
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    downloadLink () {
      return `/ecommerce-templates/invoice-download?reports=${this.orderId}`
    },

    printUrl () {
      return `${this.shopData.url}/ecommerce-templates/invoice?reports=${this.orderId}`
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
        frames['printLinkIframe'].focus()
        frames['printLinkIframe'].print()
      }
    }
  }
}
</script>

<style lang="css">
</style>
