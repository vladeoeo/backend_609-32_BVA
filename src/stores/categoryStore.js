import {defineStore} from "pinia";
import axios from "axios";

export const useCategoryStore = defineStore('category',{
    state: () => ({
        categories: [],
    }),
    actions:{
        async getCategories(){
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/category');
                this.categories = response.data;
            } catch (error) {
                console.error("Ошибка при запросе",error);
            }
        }
    }
})