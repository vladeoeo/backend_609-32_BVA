import {defineStore} from "pinia";
import axios from "axios";

export const useGoodStore = defineStore('good',{
    state: () => ({
        goods: [],
    }),
    actions: {
        async getGoods(){
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/good');
                this.goods = response.data;
            } catch (error){
                console.error("Ошибка при запросе",error);
            }
        }
    }
})