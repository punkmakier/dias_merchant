<script setup>
import { useMonitoring } from '@/stores/monitoring';
import { onMounted, ref } from 'vue';

const totalSales = ref('');
const loading = ref(true);

async function fetchData() {
    const store = useMonitoring();
    try {
        const res = await store.postOrderSwapCount();
        if (res) {
            totalSales.value = res.salesOrderTotal;
        } else {
            console.log('Something went wrong');
        }
    } catch (error) {
        console.error('Error fetching:', error);
    } finally {
        loading.value = false; // Set loading to false regardless of success or failure
    }
}

onMounted(async () => {
    fetchData();
});
</script>
<template>
    <div v-if="!loading" class="card" style="height: 250px">
        <div class="flex justify-content-between">
            <div>
                <span class="block text-700 font-medium mb-3">Sales Order</span>
            </div>
            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                <i class="pi pi-chart-line text-blue-500 text-xl"></i>
            </div>
        </div>
        <div class="flex justify-content-center align-items-center h-12rem">
            <span style="font-size: 2rem; text-align: center"
                ><span><img src="/src/assets/images/logogradient.png" style="width: 20px" alt="" /></span>{{ totalSales.toLocaleString() }}</span
            >
        </div>
    </div>
    <div v-else class="text-center"><Skeleton width="23rem" height="17.7rem"></Skeleton></div>
</template>
