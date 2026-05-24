<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useCategoryStore } from "@/stores/categoryStore.js";
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';

export default {
  name:'Categories',
  components:{DataTable, Column, InputText, Button, ConfirmPopup, Toast},
  data(){
    return{
      categoryStore: useCategoryStore(),
      perpage:5,
      offset:0,
      search:"",
    }
  },
  computed:{
    categories(){
      return this.categoryStore.categories;
    },
    categories_total(){
      return this.categoryStore.categories_total;
    },
    error_code(){
      return this.categoryStore.errorCode;
    },
    error_message(){
      return this.categoryStore.errorMessage;
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
    },
    onPushSearchButton(event){
      this.categoryStore.get_category_total(this.search)
      this.categoryStore.getCategories(undefined, undefined, this.search);
    },
    async deleteCategory(id){
      await this.categoryStore.delete_category(id);
      if (this.error_code > 0){
        this.$toast.add({severity:'error', summary:'Ошибка удаления категории '+id, detail:this.error_message+" "
              +this.error_code, life:4000});
      }
      else{
        this.$toast.add({severity:'success', summary:'Категория '+id+" успешно удалена", detail:this.error_message+" ",
          life:4000});
      }
      this.categoryStore.getCategories(this.offset / this.perpage, this.perpage, this.search);
    },
    openPopupConfirm(event, data){
      this.$confirm.require({
        target: event.currentTarget,
        message:"Вы уверены, что хотите удалить запись " + data.category_id+"?",
        icon:"pi pi-exclamation-triangle",
        acceptLabel:"Да",
        rejectLabel:"Нет",
        accept: () => {
          this.deleteCategory(data.category_id)
        }
      })
    },
    selectRow(data){
      this.$router.push(`/createCategory/${data.category_id}`);
    },
  }
}

</script>

<template>
  <Toast />
  <ConfirmPopup />
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
      :first="offset"
  >
    <template #header>
      <InputText
          v-model="search"
          type="text"
          id="search"
          required
          placeholder="Наименование"
          class="m-2 sm:w-auto"
      />

      <Button
          type="button"
          @click="onPushSearchButton()"
          icon="pi pi-search"
          label="Найти"
      />
    </template>

    <Column field="category_id" header="№" />
    <Column field="name" header="Наименование категории" />
    <Column class="w-24 !text-end" header="Действия">
      <template #body="{ data }">
        <div class="flex justify-between gap-2">
          <Button icon="pi pi-times-circle" @click="openPopupConfirm($event, data)" severity="secondary" rounded></Button>
          <Button icon="pi pi-file-edit" @click="selectRow(data)" severity="secondary" rounded></Button>
        </div>
      </template>
    </Column>
    <template #footer>
      <div class="text-end">
        <Button type="button" @click="this.$router.push('/createCategory')" icon="pi pi-plus" label="Добавить товар">Добавить категорию</Button>
      </div>
    </template>
  </DataTable>
</template>