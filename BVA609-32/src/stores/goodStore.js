import {defineStore} from "pinia";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGoodStore = defineStore('good',{
    state: () => ({
        goods: [],
        goods_total:null,
        errorMessage:"",
        loading:false,
    }),
    actions: {
        async getGoods(page=0, perpage=5){
            this.loading = true;
            try{
                const response = await axios.get(backendUrl+'/good',{
                    params:{
                        page:page,
                        perpage:perpage,
                    }
                });
                this.goods = response.data;
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
        async getGoods_total(){
            this.loading = true;
            this.errorMessage="";
            try{
                const response = await axios.get(backendUrl+'/good_total');
                this.goods_total = response.data;
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