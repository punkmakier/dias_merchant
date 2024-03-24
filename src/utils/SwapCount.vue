<script setup>
import { useMonitoring } from '@/stores/monitoring';
import { onMounted, ref } from 'vue';

const count = ref('');
const loading = ref(true);

async function fetchData() {
    const store = useMonitoring();
    try {
        const res = await store.postOrderSwapCount();
        console.log(res);
        if (res) {
            count.value = res.swapCount;
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
    <div v-if="!loading" class="card" style="height: 195px">
        <div class="flex justify-content-between">
            <div>
                <span class="block text-700 font-medium mb-3">Float Swap Count</span>
            </div>
            <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                <i class="pi pi-map-marker text-orange-500 text-xl"></i>
            </div>
        </div>
        <div class="flex justify-content-center align-items-center h-7rem">
            <span style="font-size: 2rem; text-align: center">{{ count.toLocaleString() }}</span>
        </div>
    </div>
    <div v-else class="text-center"><Skeleton width="27.5rem" height="13.8rem"></Skeleton></div>
</template>
