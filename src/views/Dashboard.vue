<script setup>
import { onMounted, reactive, ref } from 'vue';
import ProductService from '@/service/ProductService';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const confirm = useConfirm();
const showTopUp = ref(false);
const showPaymentMethod = ref(false);
const pmText = ref('Add');
const selectedIDPaymentMethod = ref();

const state = reactive({
    acc_name: '',
    acc_num: '',
    paymentName: '',
    selectedPaymentMethod: null,
    transactionLimit: 0,
    qrcode: null,
    selectedStatus: { name: 'Active', status: 'success' }
});

const stateTopUp = reactive({
    acc_team: 'ChowZenon',
    amount: 0,
    selectedTopUpMethod: null,
    acc_name: '',
    acc_num: '',
    receipt: null,
    fee: 0
});

const adminTopUpPaymentMethod = ref([{ name: 'GCash', pmLogo: 'gcash.png', acc_name: 'Mark Allan Carba Admin', acc_num: '5435345344' }]);

const paymentMethods = ref([
    { name: 'GCash', pmLogo: 'gcash.png' },
    { name: 'Paymaya', pmLogo: 'paymaya.png' },
    { name: 'BDO', pmLogo: 'bdo.png' },
    { name: 'Metrobank', pmLogo: 'metrobank.png' },
    { name: 'Chinabank', pmLogo: 'chinabank.png' }
]);

const products = ref(null);
const lineData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'In',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Out',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});

const lineOptions = ref(null);
const productService = new ProductService();

const fetchPaymentMethod = ref([
    { id: 1, acc_name: 'Marco', selectedPaymentMethod: { name: 'GCash', pmLogo: 'gcash.png' }, selectedStatus: { name: 'Active', status: 'success' }, transactionLimit: 10000, acc_num: '09471559441', qrcode: null },
    { id: 2, acc_name: 'Mark', selectedPaymentMethod: { name: 'Paymaya', pmLogo: 'paymaya.png' }, selectedStatus: { name: 'Inactive', status: 'danger' }, transactionLimit: 100000, acc_num: '09471559441', qrcode: null }
]);

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
});

const customBase64Uploader = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
        const base64data = reader.result;
        console.log(base64data);
    };
};

const openPaymentMethod = () => {
    showPaymentMethod.value = true;
    pmText.value = 'Add';
    state.acc_name = '';
    state.acc_num = '';
    state.selectedPaymentMethod = null;
    state.transactionLimit = 0;
};

const items = ref([
    {
        label: 'Settings',
        items: [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => {
                    showPaymentMethod.value = true;
                    pmText.value = 'Edit';
                    const fetchRes = fetchPaymentMethod.value.filter((x) => x.id === selectedIDPaymentMethod.value);
                    if (fetchRes && fetchRes.length > 0) {
                        state.acc_name = fetchRes[0].acc_name;
                        state.acc_num = fetchRes[0].acc_num;
                        state.transactionLimit = fetchRes[0].transactionLimit;
                        state.selectedPaymentMethod = fetchRes[0].selectedPaymentMethod;
                        state.selectedStatus = fetchRes[0].selectedStatus;

                        state.selectedPaymentMethod.pmLogo = fetchRes[0].selectedPaymentMethod.pmLogo;
                        state.selectedStatus = fetchRes[0].selectedStatus;
                        console.log(state.selectedPaymentMethod);
                        console.log(state.selectedStatus);
                    }
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    confirm.require({
                        message: 'Do you want to delete this record?',
                        header: 'Please Confirm',
                        icon: 'pi pi-info-circle',
                        rejectLabel: 'Cancel',
                        acceptLabel: 'Delete',
                        rejectClass: 'p-button-secondary p-button-outlined',
                        acceptClass: 'p-button-danger',
                        accept: () => {
                            fetchPaymentMethod.value = fetchPaymentMethod.value.filter((x) => x.id !== selectedIDPaymentMethod.value);
                        }
                    });
                }
            }
        ]
    }
]);

const statusList = ref([
    { name: 'Active', status: 'success' },
    { name: 'Inactive', status: 'danger' }
]);

const showID = (id) => {
    selectedIDPaymentMethod.value = id;
};

const handlePaymentMethod = () => {
    const id = fetchPaymentMethod.value.length;

    state.id = id + 1;

    console.log(state);

    fetchPaymentMethod.value = [...fetchPaymentMethod.value, { ...state }];
    console.log(fetchPaymentMethod.value);
    showPaymentMethod.value = false;
    pmText.value = 'Add';
    state.acc_name = '';
    state.acc_num = '';
    state.selectedPaymentMethod = null;
    state.transactionLimit = 0;
    toast.add({ severity: 'success', summary: 'Success', detail: 'New payment method has been successfully added.', life: 5000 });
};

const handleSelectedStatus = () => {
    // state.status = state.selectedStatus.name;
};

const updatePaymentMethod = () => {
    const updatedArray = fetchPaymentMethod.value.map((item) => {
        if (item.id === selectedIDPaymentMethod.value) {
            const data = {
                pmLogo: state.pmLogo,
                acc_name: state.acc_name,
                selectedPaymentMethod: state.selectedPaymentMethod,
                transactionLimit: state.transactionLimit,
                acc_num: state.acc_num
            };
            console.log(data);

            return {
                ...item,
                ...data
            };
        }
        return item;
    });

    console.log(updatedArray);
    fetchPaymentMethod.value = updatedArray;
    toast.add({ severity: 'success', summary: 'Success', detail: 'Payment method has been successfully updated.', life: 5000 });
};

const handleTopUpMethod = () => {
    console.log(stateTopUp.selectedTopUpMethod);
    stateTopUp.acc_name = stateTopUp.selectedTopUpMethod.acc_name;
    stateTopUp.acc_num = stateTopUp.selectedTopUpMethod.acc_num;
};
const disabledPaymentDropdown = ref(true);
const handlePaymentName = () => {
    if (state.paymentName.length > 0) {
        disabledPaymentDropdown.value = false;
    } else {
        disabledPaymentDropdown.value = true;
    }
};

const handleTopUpSubmit = () => {
    console.log(stateTopUp);
    showTopUp.value = false;
    toast.add({ severity: 'success', summary: 'Success', detail: 'Your transaction has been successful; please wait for approval of admin', life: 5000 });
};
</script>

<template>
    <div class="container">
        <Toast position="bottom-center" />
        <ConfirmDialog></ConfirmDialog>
        <div class="container-child">
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-8" style="padding: 0.8rem">
                    <div class="grid" style="margin-top: -3px">
                        <div class="col-12 lg:col-6 xl:col-7" style="padding: 0.3rem">
                            <div class="card bg-card" style="height: 250px; display: flex; flex-direction: column; justify-content: space-between">
                                <div class="card-Header flex justify-content-between">
                                    <img src="/src/assets/images/card-chip.png" style="width: 40px" alt="" />
                                    <img src="/src/assets/images/dias-logo-text.png" style="width: 90px" alt="" />
                                    <!-- <span class="text-white dias-title">DIAS Game</span> -->
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 10px">
                                    <span class="text-white">Current Balance</span>
                                    <span class="mb-2"><img src="/src/assets/images/diaslogo.png" style="width: 20px" alt="" /> <span style="font-size: 2rem" class="text-white">32, 343, 545.00</span></span>
                                </div>
                                <div class="card-footer flex justify-content-between">
                                    <div class="flex gap-3 cursor-pointer" @click="showTopUp = true">
                                        <i class="pi pi-plus-circle text-xl" style="color: #fff"></i>

                                        <span class="text-white">Buy More Dias</span>
                                    </div>
                                    <span class="text-white">Chowzenon</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 xl:col-5" style="padding: 0.3rem">
                            <div class="card" style="height: 250px">
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
                                        ><span><img src="/src/assets/images/logogradient.png" style="width: 20px" alt="" /></span> 545, 434, 34.00</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid" style="margin-top: -3px">
                        <div class="col-12 lg:col-6 xl:col-6" style="padding: 0.3rem">
                            <div class="card" style="height: 195px">
                                <div class="flex justify-content-between">
                                    <div>
                                        <span class="block text-700 font-medium mb-3">Order Count</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <div class="flex justify-content-center align-items-center h-7rem">
                                    <span style="font-size: 2rem; text-align: center">435</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 xl:col-6" style="padding: 0.3rem">
                            <div class="card" style="height: 195px">
                                <div class="flex justify-content-between">
                                    <div>
                                        <span class="block text-700 font-medium mb-3">Float Swap Count</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                                    </div>
                                </div>
                                <div class="flex justify-content-center align-items-center h-7rem">
                                    <span style="font-size: 2rem; text-align: center">435</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 lg:col-6 xl:col-4" style="padding: 0.8rem">
                    <div class="card" style="height: 450px; overflow: auto">
                        <div class="flex justify-content-between align-items-center mb-4">
                            <div>
                                <span class="block text-700 font-medium mb-3">Payment Method </span>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round cursor-pointer" style="width: 2.5rem; height: 2.5rem" @click="openPaymentMethod">
                                <i class="pi pi-plus-circle text-blue-500 text-xl"></i>
                            </div>
                        </div>

                        <div class="mb-2 p-3 flex gap-2 align-items-center" style="border-radius: 7px; background-color: #e5e5e576" v-for="(value, index) in fetchPaymentMethod" :key="index">
                            <img :src="`/src/assets/images/${value.selectedPaymentMethod.pmLogo}`" style="width: 40px; height: 40px; border-radius: 6px" alt="" />
                            <div class="flex justify-content-between w-10 align-items-center">
                                <div style="display: flex; flex-direction: column">
                                    <span style="font-size: 1rem; font-weight: 600">{{ value.acc_name }}</span>
                                    <span>{{ value.acc_num }}</span>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                                    <Tag :severity="value.selectedStatus.status" :value="value.selectedStatus.name"></Tag>

                                    <i
                                        class="pi pi-cog text-blue-500 text-xl cursor-pointer"
                                        @click="
                                            $refs.menu1.toggle($event);
                                            showID(value.id);
                                        "
                                        aria-haspopup="true"
                                    ></i>
                                    <Menu ref="menu1" :model="items" :popup="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid">
                <div class="col-12 lg:col-12 xl:col-12" style="padding: 0; margin-top: 10px">
                    <div class="card"><span class="text-lg block text-700 font-medium">Recent Orders</span></div>
                </div>
                <div class="col-12 lg:col-12 xl:col-12" style="padding: 0; margin-top: 10px">
                    <div class="card">
                        <DataTable :value="products" stripedRows tableStyle="min-width: 50rem" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
                            <Column field="code" header="Account"></Column>
                            <Column field="name" header="Method"></Column>
                            <Column field="category" header="Ref Number - User"></Column>
                            <Column field="quantity" header="Amount"></Column>
                            <Column field="quantity" header="Date"></Column>
                            <Column field="quantity" header=" "></Column>
                        </DataTable>
                    </div>
                </div>
            </div>

            <div class="grid mt-3 mb-5">
                <div class="col-12 xl:col-4" style="padding: 10px; padding-left: 0">
                    <div class="card" style="height: 450px">
                        <div class="flex align-items-center justify-content-between mb-4">
                            <h5>Notifications</h5>
                            <div>
                                <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu1.toggle($event)"></Button>
                                <Menu ref="menu1" :popup="true" :model="items"></Menu>
                            </div>
                        </div>

                        <span class="block text-600 font-medium mb-3">TODAY</span>
                        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
                            <li class="flex align-items-center py-2 border-bottom-1 surface-border">
                                <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                    <i class="pi pi-dollar text-xl text-blue-500"></i>
                                </div>
                                <span class="text-900 line-height-3"
                                    >Richard Jones
                                    <span class="text-700">has purchased a blue t-shirt for <span class="text-blue-500">79$</span></span>
                                </span>
                            </li>
                            <li class="flex align-items-center py-2">
                                <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                                    <i class="pi pi-download text-xl text-orange-500"></i>
                                </div>
                                <span class="text-700 line-height-3">Your request for withdrawal of <span class="text-blue-500 font-medium">2500$</span> has been initiated.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 xl:col-8" style="padding: 10px; padding-right: 0">
                    <div class="card">
                        <h5>Sales Overview</h5>
                        <Chart type="line" :data="lineData" :options="lineOptions" />
                    </div>
                </div>
            </div>
        </div>

        <Dialog v-model:visible="showTopUp" header="Top Up" :style="{ width: '50rem' }" :position="position" :modal="true" :draggable="false">
            <form @submit.prevent="handleTopUpSubmit">
                <div style="display: flex; flex-direction: column" class="mb-3">
                    <label for="email" class="font-semibold mb-1">Team Name</label>
                    <InputText v-model="stateTopUp.acc_team" id="Email" class="flex-auto" autocomplete="off" disabled />
                </div>
                <div style="display: flex; flex-direction: column" class="mb-3">
                    <label for="email" class="font-semibold mb-1">Amount</label>
                    <InputNumber v-model="stateTopUp.amount" inputId="withoutgrouping" />
                </div>
                <div style="display: flex; flex-direction: column" class="mb-3">
                    <label for="email" class="font-semibold mb-1">Payment Method</label>
                    <Dropdown v-model="stateTopUp.selectedTopUpMethod" :options="adminTopUpPaymentMethod" @change="handleTopUpMethod" optionLabel="name" placeholder="Select a City" style="width: 100%" class="" />
                </div>

                <div class="flex align-items-center gap-3 mb-3">
                    <div style="width: 50%">
                        <div style="display: flex; flex-direction: column">
                            <label for="accountName" class="font-semibold mb-1">Account Name</label>
                            <InputText v-model="stateTopUp.acc_name" id="accountName" class="flex-auto" autocomplete="off" readonly />
                        </div>
                    </div>
                    <div style="width: 50%">
                        <div style="display: flex; flex-direction: column">
                            <label for="accountNumber" class="font-semibold mb-1">Account Number</label>
                            <InputText v-model="stateTopUp.acc_num" id="accountNumber" class="flex-auto" autocomplete="off" readonly />
                        </div>
                    </div>
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <div style="width: 100%">
                        <div style="display: flex; flex-direction: column">
                            <label for="email" class="font-semibold mb-1">Upload Receipt</label>
                            <FileUpload :showCancelButton="false" :showUploadButton="false" :multiple="false" customUpload @uploader="customBase64Uploader" accept="image/*" :maxFileSize="1000000">
                                <template #empty>
                                    <p>Drag and drop files to here to upload.</p>
                                </template>
                            </FileUpload>
                        </div>
                    </div>
                </div>
                <Divider />
                <div style="display: flex; flex-direction: column; gap: 10px">
                    <span style="font-weight: 700">Amount: {{ stateTopUp.amount.toLocaleString() }}</span>
                    <span style="font-weight: 700">Fee: {{ (stateTopUp.amount * 0.1).toLocaleString() }}</span>
                    <span style="font-weight: 700">Total Amount to Pay: {{ (stateTopUp.amount * 0.1 + stateTopUp.amount).toLocaleString() }}</span>
                </div>
                <Divider />

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="showTopUp = false"></Button>
                    <Button type="submit" label="Save"></Button>
                </div>
            </form>
        </Dialog>

        <Dialog v-model:visible="showPaymentMethod" :header="`${pmText} Payment Method`" :style="{ width: '50rem' }" :position="position" :modal="true" :draggable="false">
            <form @submit.prevent="pmText === 'Add' ? handlePaymentMethod() : updatePaymentMethod()">
                <div style="display: flex; flex-direction: column" class="mb-3">
                    <label for="accountName" class="font-semibold mb-1">Account Name</label>
                    <InputText v-model="state.acc_name" id="accountName" class="flex-auto" autocomplete="off" />
                </div>
                <div style="display: flex; flex-direction: column" class="mb-3">
                    <label for="accountNumber" class="font-semibold mb-1">Account Number</label>
                    <InputText v-model="state.acc_num" id="accountNumber" class="flex-auto" autocomplete="off" />
                </div>
                <div style="display: flex; flex-direction: column" class="mb-3">
                    <label for="paymentName" class="font-semibold mb-1">Payment Name</label>
                    <InputText v-model="state.paymentName" id="paymentName" @update:modelValue="handlePaymentName" class="flex-auto" autocomplete="off" />
                </div>
                <div style="display: flex; flex-direction: column" class="mb-3">
                    <label for="email" class="font-semibold mb-1">Bank / E-Wallet</label>
                    <Dropdown v-model="state.selectedPaymentMethod" filter :options="paymentMethods" optionLabel="name" placeholder="Select" style="width: 100%" class="" :disabled="disabledPaymentDropdown" />
                </div>

                <div style="display: flex; flex-direction: column" class="mb-3">
                    <label for="email" class="font-semibold mb-1">Status</label>
                    <Dropdown v-model="state.selectedStatus" :options="statusList" @change="handleSelectedStatus" optionLabel="name" placeholder="Select" style="width: 100%" class="" />
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <div style="width: 100%">
                        <div style="display: flex; flex-direction: column">
                            <label for="email" class="font-semibold mb-1">Transaction Limit</label>
                            <InputNumber v-model="state.transactionLimit" inputId="integeronly" />
                        </div>
                    </div>
                </div>
                <div class="flex align-items-center gap-3 mb-3">
                    <div style="width: 100%">
                        <div style="display: flex; flex-direction: column">
                            <label for="email" class="font-semibold mb-1">QR Code (QR)</label>
                            <FileUpload v-model="state.qrcode" :showCancelButton="false" :showUploadButton="false" :multiple="false" customUpload @uploader="customBase64Uploader" accept="image/*" :maxFileSize="1000000">
                                <template #empty>
                                    <p>Drag and drop files to here to upload.</p>
                                </template>
                            </FileUpload>
                        </div>
                    </div>
                </div>
                <Divider />
                <div style="text-align: center"><img src="@/assets/images/qrsample.png" style="width: 150px" alt="" /></div>

                <Divider />

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="showPaymentMethod = false"></Button>
                    <Button type="submit" label="Save" v-if="pmText === 'Add'"></Button>
                    <Button type="submit" label="Update" severity="warning" @click="showPaymentMethod = false" v-if="pmText === 'Edit'"></Button>
                </div>
            </form>
        </Dialog>
    </div>
</template>

<style>
.container-child {
    width: 80%;
    margin: 0 auto;
}

.bg-card {
    /* background: rgb(243, 5, 135);
    background: -moz-linear-gradient(209deg, rgba(243, 5, 135, 1) 0%, rgba(130, 37, 196, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(243, 5, 135, 1) 0%, rgba(130, 37, 196, 1) 100%);
    background: linear-gradient(209deg, rgba(243, 5, 135, 1) 0%, rgba(130, 37, 196, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f30587",endColorstr="#8225c4",GradientType=1); */

    background: url('/src/assets/images/bg-card.jpg');
}

.text-white {
    color: white;
    text-shadow: 0 0 3px #000;
}
</style>
