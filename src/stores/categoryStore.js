import {defineStore} from "pinia";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCategoryStore = defineStore('category',{
    state: () => ({
        categories: [],
        categories_total:null,
        items:[],
        errorMessage:"",
        loading: false,
    }),
    actions:{
        async getCategories(page=0, perpage=5){
            this.loading = true;
            try {
                const response = await axios.get(backendUrl+'/category',{
                    params:{
                        page:page,
                        perpage:perpage,
                    }
                });
                this.categories = response.data;
            } catch (error) {
                if(error.response){
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                }else if(error.request){
                    this.errorMessage = error.message;
                    console.log(error);
                }else{
                    console.log(error)
                }
            } finally{
                this.loading = false;
            }
        },
        async get_category_total(){
            this.loading = true;
            this.errorMessage="";
            try{
                const response = await axios.get(backendUrl+'/category_total');
                this.categories_total = response.data;
            } catch (error){
                if(error.response){
                    this.errorMessage=error.response.data.message;
                    console.log(error);
                }else if(error.request){
                    this.errorMessage=error.message;
                    console.log(error);
                }else{
                    console.log(error);
                }
            }finally{
                this.loading = false;
            }
        }
    }
})