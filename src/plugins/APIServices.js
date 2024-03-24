import axios from './API';

const get = async (path) => {
    try {
        const response = await axios.get(path);
        return response.data;
    } catch (err) {
        console.error('Error getting data', err);
    }
};

const post = async (path, data) => {
    try {
        const response = await axios.post(path, data);
        return response.data;
    } catch (err) {
        console.error('Error sending data', err);
    }
};

export const MerchantAPIRequest = {
    // Get Request
    getAdminPaymentMethods: async () => {
        return await get('/api/merchant/adminPaymentMethods');
    },

    // Post Request
    postLogin: async (data) => {
        return await post('/api/merchant/login', data);
    },

    postGetBalance: async (data) => {
        return await post('/api/merchant/getBalance', data);
    },

    postOrderSwapCount: async (data) => {
        return await post('/api/merchant/orderSwapCount', data);
    },
    postTeamWalletMethod: async (data) => {
        return await post('/api/merchant/teamWalletMethod', data);
    },
    postTeamWalletMethodAdd: async (data) => {
        return await post('/api/merchant/teamWalletMethodAdd', data);
    },
    postTeamWalletMethodUpdate: async (data) => {
        return await post('/api/merchant/teamWalletMethodUpdate', data);
    },
    postTeamWalletMethodDelete: async (data) => {
        return await post('/api/merchant/teamWalletMethodDelete', data);
    },
    postTopUpMerchant: async (data) => {
        return await post('/api/merchant/topUpMerchant', data);
    }
};
