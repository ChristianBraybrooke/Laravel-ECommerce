<template lang="html">
  <div>
    <el-button
      size="mini"
      @click="openModal">Notes</el-button>

    <el-dialog
      v-if="showModal"
      :append-to-body="true"
      :visible.sync="showModal"
      title="Notes">

      <el-form
        :model="notes"
        label-position="top">
        <el-row :gutter="20">
          <el-col :md="{span:12, offset: 4}">
            <el-form-item
              v-for="(note, key) in notes"
              :key="key"
              :label="label(key)">
              <el-checkbox
                v-if="key.toUpperCase().includes('CHECKBOX')"
                v-model="notes[key]"
                :label="label(key)"/>
              <el-input
                v-else
                v-model="notes[key]"
                type="textarea"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-row :gutter="20">
        <el-col :md="{span:12, offset: 4}">
          <el-button
            :loading="loading"
            type="success"
            @click="saveNotes">Save Notes</el-button>
        </el-col>
      </el-row>

    </el-dialog>
  </div>
</template>

<script>
import contentUtil from 'utils/content'

export default {

  name: 'OrdernNotes',

  components: {
    ContentInner: () => import(/* webpackChunkName: "content-inner" */'components/ContentInner')
  },

  props: {
    notes: {
      required: true,
      type: Object
    },
    onNotesSave: {
      required: false,
      type: Function,
      default: () => { return function (notes) {} }
    }
  },

  data () {
    return {
      showModal: false,
      loading: false
    }
  },

  computed: {

  },

  watch: {

  },

  mounted () {
    console.log('OrderNotes.vue mounted!')
  },

  methods: {
    openModal () {
      this.showModal = true
    },

    label (key) {
      return this.capitalize(contentUtil.inputLabel(key))
    },

    saveNotes () {
      this.onNotesSave(this.notes)
      this.$emit('notes-save', this.notes)
      this.showModal = false
    }
  }

}
</script>

<style lang="css">
</style>
