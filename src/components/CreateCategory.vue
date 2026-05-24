<script>

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {useCategoryStore} from "@/stores/categoryStore.js";
import Toast from "primevue/toast";
import Select from 'primevue/select'

export default {
  name:"CreateCategory",
  components:{InputText, Button, Toast, Select},
  data(){
    return{
      categoryStore:useCategoryStore(),
      name:"",
      description:"",
    }
  },
  computed:{
    errorMessage(){
      return this.categoryStore.errorMessage;
    },
    errorCode(){
      return this.categoryStore.errorCode;
    },
    isEdit(){
      return !!this.$route.params.id;
    },
    categoryId(){
      return this.$route.params.id;
    }
  },
  methods:{
    async createCategory(){
      const formData = new FormData();
      formData.append('name',this.name);
      formData.append('description',this.description);
      if (this.isEdit){
        console.log(this.categoryId)
        await this.categoryStore.updateCategory(formData, this.categoryId);
      }
      else{
        await this.categoryStore.createCategory(formData);
      }
      if(this.errorCode > 0){
        this.$toast.add({severity:'error',summary:'Ошибка добавления данных', detail:this.errorMessage,life:4000});
      }
      else{
        this.$toast.add({severity:'success',summary:'Данные успешно добавлены', detail:this.errorMessage,life:4000});
      }
    }
  },
  watch:{
    categoryId:{
      handler(newId){
        if (newId){
          const category = this.categoryStore.categories.find( c => c.id == newId);
          if (category) {
            this.name = category.name;
            this.description = category.description;
          }
        }else{
          this.name = "";
          this.description = "";
        }
      },
      immediate: true
    }
  }
}

</script>

<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createCategory" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color:dimgrey">
        {{ isEdit ? 'Редактирование' : 'Добавление'}} категории
      </h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Введите наименование" v-model="this.name"/>
        <InputText type="text" placeholder="Введите описание" v-model="this.description"/>
      </div>
      <div class="flex flex-col mt-6">
        <Button type="submit" :label="isEdit ? 'Сохранить' : 'Создать'"/>
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>