<template lang="html">
    <data-table type-name="product"
                bulk-update-url="products/bulk"
                :table-options="tableOptions"
                request-with="variant"
                :request-includes="['live_at', 'created_at']"
                :create-form="productsCreateForm">

      <template slot="createForm"
                slot-scope="props">


                <el-form-item label="Product Name" prop="name">
                  <el-input :autofocus="true" v-model="productsCreateForm.name" auto-complete="off"></el-input>
                </el-form-item>

      </template>

    </data-table>
</template>

<script>
export default {

  components: {
      DataTable: () => import(/* webpackChunkName: "data-table" */'components/DataTable')
  },

  watch: {
    productsCreateForm: function (value) {
        this.$emit('input', this.internalValue);
    }
  },

  mounted() {
      console.log('Products.vue Mounted.');
  },

  data() {
    return {
        productsCreateForm: {

        },
        tableOptions: {
            border: true,
            stripe: true,
            showSearch: true,
            showHeader: true,
            showNewBtn: true,
            showRefreshBtn: true,
            showHeadHr: true,
            showTitle: true,
            viewText: 'View',
            deleteText: 'Delete',
            collumns: [
                {
                    prop: 'id',
                    sortable: true,
                    label: 'ID',
                    align: 'left',
                    resizable: true
                },
                {
                    prop: 'name',
                    sortable: true,
                    label: 'Name',
                    align: 'left',
                    formatter: function(row, column, cellValue) {
                        if (!row.variant) {
                            return <strong>{row.name}</strong>;
                        } else {
                          return <span><strong>{row.variant.name}</strong> / {row.name}</span>
                        }

                    },
                    resizable: true
                },
                {
                    prop: 'created_at.human',
                    sortable: true,
                    label: 'Created',
                    align: 'left',
                    resizable: true
                },
                {
                    prop: 'live_at.live',
                    sortable: true,
                    label: 'Live',
                    align: 'left',
                    formatter: function(row, column, cellValue) {
                        return row.live_at.live ? <i class="el-icon-check"></i> : <i class="el-icon-close"></i>;
                    },
                    resizable: true
                },
            ],
            bulkOptions: [
                {
                  value: 'delete',
                  label: 'Delete'
                },
                {
                  value: 'draft',
                  label: 'Mark Draft'
                },
                {
                  value: 'live',
                  label: 'Mark Live'
                },
            ],
        },
    }
  },

}
</script>

<style lang="css">
</style>
