import {defineStore} from "pinia";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCategoryStore = defineStore('category',{
    state: () => ({
        categories: [],
        categories_total:null,
        items:[],
        errorMessage:"",
        errorCode: 0,
        loading: false,
    }),
    actions:{
        async getCategories(page=0, perpage=5, search=""){
            this.loading = true;
            try {
                const response = await axios.get(backendUrl+'/category',{
                    params:{
                        page:page,
                        perpage:perpage,
                        search: search,
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
        async get_category_total(search=""){
            this.loading = true;
            this.errorMessage="";
            try{
                const response = await axios.get(backendUrl+'/category_total',{
                    params: {
                        search: search,
                    }
                });
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
        },
        async delete_category(id){
            this.errorMessage = "";
            this.errorCode = 0;
            try{
                const response = await axios.delete(backendUrl+"/category/"+id,{
                    headers: {
                        'Content-Type':'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });
                this.errorMessage = response.data.error;
                this.errorCode = response.data.code;
            }
            catch (error){
                if (error.response){
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if(error.request){
                    this.errorCode=12;
                    this.errorMessage= error.message;
                    console.log(error);
                } else{
                    this.errorCode=13;
                    console.log(error);
                }
            }
        },
        async createCategory(formData){
            this.errorMessage = "";
            try{
                const response = await axios.post(backendUrl+'/category',formData,{
                    headers:{
                        'Content-Type':'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
            } catch (error){
                if(error.response){
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if(error.request){
                    this.errorMessage = error.message;
                    this.errorCode = 12;
                    console.log(error);
                }else{
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
        async updateCategory(formData, id){
            this.errorMessage = "";
            try {
                console.log(formData);
                const response = await axios.post(backendUrl + "/category/" + id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                });
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
            } catch (error){
                if (error.response){
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                }
                else if(error.request){
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                } else{
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        }
    }
})