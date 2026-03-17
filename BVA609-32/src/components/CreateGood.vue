<script>

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {useGoodStore} from "@/stores/goodStore.js";
import {useCategoryStore} from "@/stores/categoryStore.js";
import Toast from "primevue/toast";
import Select from 'primevue/select'

export default {
  name:"CreateGood",
  components:{InputText, Button, Toast, Select},
  data(){
    return{
      goodStore:useGoodStore(),
      categoryStore:useCategoryStore(),
      goodName:"",
      goodImage:null,
      category_id:null,
      description:"",
      price:null,
      stock_quantity:null,
      brand:"",
    }
  },
  computed:{
    categories(){
      return this.categoryStore.categories;
    },
    errorMessage(){
      return this.goodStore.errorMessage;
    },
    errorCode(){
      return this.goodStore.errorCode;
    }
  },
  mounted(){
    this.categoryStore.getCategories();
  },
  methods:{
    changeCaption(event){
      const file = event.target.files[0];
      if(file){
        document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.goodImage = file;
      }
      else{
        document.getElementById('file-label').innerHTML = '<span class="pi pi-upload mx-3"></span> Выбрать изображение';
        this.goodImage = null;
      }
    },
    async createGood(){
      const formData = new FormData();
      formData.append('name',this.goodName);
      formData.append('image',this.goodImage);
      formData.append('category_id',this.category_id);
      formData.append('description',this.description);
      formData.append('price',this.price);
      formData.append('stock_quantity',this.stock_quantity);
      formData.append('brand',this.brand);
      await this.goodStore.createGood(formData);
      if(this.errorCode > 0){
        this.$toast.add({severity:'error',summary:'Ошибка добавления данных', detail:this.errorMessage,life:4000});
      }
      else{
        this.$toast.add({severity:'success',summary:'Данные успешно добавлены', detail:this.errorMessage,life:4000});
      }
    }
  }
}

</script>

<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createGood" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color:dimgrey">Добавление товара</h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Введите наименование" v-model="this.goodName"/>
        <Select v-model="this.category_id"
        :options="categories"
        optionLabel="name"
        optionValue="category_id"
        placeholder="Выберите категорию"/>
        <InputText type="text" placeholder="Введите описание" v-model="this.description"/>
        <InputText type="number" placeholder="Введите цену" v-model="this.price"/>
        <InputText type="number" placeholder="Введите кол-во товара на складе" v-model="this.stock_quantity"/>
        <InputText type="text" placeholder="Введите бренд" v-model="this.brand"/>
      </div>
      <div class="mb-4 mt-4">
        <label for="file" id="file-label" class="block text-md font-medium text-gray-500 border-gray-300 rounded-md p-2">
          <span class="pi pi-upload mx-3"></span>Выбрать изображение
        </label>
        <input type="file" hidden id="file" name="file" v-on:change="changeCaption" required accept="image/*">
      </div>

      <div class="flex flex-col mt-6">
        <Button type="submit" label="Создать"/>
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>