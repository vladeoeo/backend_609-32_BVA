<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useCategoryStore } from "@/stores/categoryStore.js"

export default {
  name:'Categories',
  components:{DataTable, Column},
  data(){
    return{
      categoryStore: useCategoryStore(),
      perpage:5,
      offset:0,
    }
  },
  computed:{
    categories(){
      return this.categoryStore.categories;
    },
    categories_total(){
      return this.categoryStore.categories_total;
    }
  },
  mounted() {
    console.log('Categories component MOUNTED');
    this.categoryStore.getCategories();
    this.categoryStore.get_category_total();
    console.log('Categories=',this.categories);
  },
  methods:{
    onPageChange(event){
      this.offset=event.first;
      this.perpage=event.rows;
      this.categoryStore.getCategories(this.offset/this.perpage,this.perpage);
    }
  }
}

</script>

<template>
  <DataTable
  :value="categories"
  :lazy="true"
  :loading="categoryStore.loading"
  :paginator="true"
  :rows="perpage"
  :rowsPerPageOptions="[2,5,10]"
  :totalRecords="categories_total"
  @page="onPageChange"
  responsive-layout="scroll"
  :first="offset">
    <Column field="category_id" header="№"/>
    <Column field="name" header="Наименование категории"/>
  </DataTable>

</template>