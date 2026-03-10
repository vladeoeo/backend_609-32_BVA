import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Items from '@/components/Items.vue';
import Categories from '@/components/Categories.vue';

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/category",
        component: Categories,
    },
    {
        path: "/good",
        component: Items,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
