<script setup>
import { onMounted, ref, defineProps } from 'vue';
import { useMonitoring } from '@/stores/monitoring';
defineProps(['buyText']);
const fund = ref(0);
const username = ref('');
const loading = ref(true);

async function fetchData() {
    const store = useMonitoring();
    try {
        const res = await store.getBalance();
        if (res) {
            fund.value = res.balance;
        } else {
            console.log('Something went wrong');
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
    } finally {
        loading.value = false; // Set loading to false regardless of success or failure
    }
}

onMounted(() => {
    fetchData();
});
</script>

<template>
    <div v-if="!loading" class="card bg-card" style="height: 250px; display: flex; flex-direction: column; justify-content: space-between">
        <div class="card-Header flex justify-content-between">
            <img src="/src/assets/images/card-chip.png" style="width: 40px" alt="" />
            <img src="/src/assets/images/dias-logo-text.png" style="width: 90px" alt="" />
            <!-- <span class="text-white dias-title">DIAS Game</span> -->
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px">
            <span class="text-white">Current Balance</span>
            <span class="mb-2"
                ><img src="/src/assets/images/diaslogo.png" style="width: 20px" alt="" /> <span style="font-size: 2rem" class="text-white">{{ fund.toLocaleString() }}</span></span
            >
        </div>
        <div class="card-footer flex justify-content-between">
            <div class="flex gap-3 cursor-pointer" @click="$emit('buyMoreDias')">
                <i class="pi pi-plus-circle text-xl" style="color: #fff"></i>

                <span class="text-white">{{ buyText }}</span>
            </div>
            <span class="text-white">{{ username }}</span>
        </div>
    </div>
    <div v-else class="text-center"><Skeleton width="32rem" height="17.7rem"></Skeleton></div>
</template>
