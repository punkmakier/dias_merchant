import { defineStore } from 'pinia';
import { MerchantAPIRequest as axios } from '@/plugins/APIServices.js';

export const useMonitoring = defineStore('monitoring', () => {
    const store = JSON.parse(localStorage.getItem('auth.merchant'));
    const passData = { username: store.username, token: store.token };
    async function getBalance() {
        const getResult = await axios.postGetBalance(passData);
        return getResult;
    }

    async function postOrderSwapCount() {
        const getResult = await axios.postOrderSwapCount(passData);
        return getResult;
    }

    return { getBalance, postOrderSwapCount };
});
