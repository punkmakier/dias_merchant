<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Menus',
        items: [
            { label: 'Float Swap', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Receiving Account', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Payment Method', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Orders', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Top-Up', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Change Name', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Transaction History', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <!-- <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li> -->
    </ul>
</template>

<style lang="scss" scoped></style>
