<script setup>
import { ref, reactive } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { MerchantAPIRequest as axios } from '@/plugins/APIServices';
import { useRouter } from 'vue-router';

const checked = ref(false);
const isLoading = ref(false);
const router = useRouter();
const errorMessage = ref('');
const state = reactive({
    username: '',
    password: ''
});

const handleLogin = async () => {
    isLoading.value = true;
    const res = await axios.postLogin(state);
    if (res.resStatus == 0) {
        const dataStore = { username: res.username, token: res.token };
        localStorage.setItem('auth.merchant', JSON.stringify(dataStore));
        console.log(res);
        errorMessage.value = '';
        if (res.flogin == 0) {
            router.push('/dashboard');
        } else {
            // Redirect to the change password page
        }
        isLoading.value = false;
    } else if (res.resStatus == 1) {
        errorMessage.value = res.resMsg;
        isLoading.value = false;
    } else {
        errorMessage.value = 'Something went wrong...';
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img src="/src/assets/images/logogradient.png" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/src/assets/images/logogradient.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Merchant</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                    <Message severity="error" v-if="errorMessage">{{ errorMessage }}</Message>

                    <div>
                        <form @submit.prevent="handleLogin">
                            <label class="block text-900 text-xl font-medium mb-2">Username</label>
                            <InputText type="text" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="state.username" />

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password1" v-model="state.password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }" :feedback="false"></Password>

                            <div class="flex align-items-center justify-content-between mb-5 gap-5">
                                <div class="flex align-items-center">
                                    <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                            </div>
                            <Button label="Sign In" class="w-full p-3 text-xl" type="submit" :loading="isLoading"></Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
