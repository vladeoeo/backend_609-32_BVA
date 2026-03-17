<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useGoodStore } from "@/stores/goodStore.js"

export default {
  name:'Goods',
  components:{DataTable, Column},
  data(){
    return{
      goodStore: useGoodStore(),
      perpage:5,
      offset:0,
    }
  },
  computed:{
    goods() {
      return this.goodStore.goods;
    },
    goods_total(){
      return this.goodStore.goods_total;
    }
  },
  mounted() {
    console.log('Categories component MOUNTED');
    this.goodStore.getGoods(0,this.perpage);
    this.goodStore.getGoods_total();
  },
  methods:{
    onPageChange(event){
      this.offset=event.first;
      this.perpage=event.rows;
      this.goodStore.getGoods(event.page, event.rows);
    }
  }
}

</script>

<template>
  <DataTable
      :value="goods"
      :lazy="true"
      :loading="goodStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2,5,10]"
      :totalRecords="goods_total"
      @page="onPageChange"
      responsive-layout="scroll"
      :first="offset">
    <Column field="product_id" header="№"/>
    <Column field="name" header="Наименование товара"/>
    <Column header="Изображение товара">
      <template #body="slotProps">
        <img :src="slotProps.data.img_url" alt="Товар" style="width:80px;"/>
      </template>
    </Column>
    <template #footer>
      <div class="text-end">
        <Button type="button" @click="this.$router.push('/createGood')" icon="pi pi-plus" label="Добавить товар">Добавить товар</Button>
      </div>
    </template>
  </DataTable>
  </template>