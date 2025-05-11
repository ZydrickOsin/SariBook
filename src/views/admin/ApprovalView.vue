<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { supabase } from '@/utils/supabase';
import DashboardLayout from '@/components/DashboardLayout.vue';
import { Bar } from 'vue-chartjs'; 
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const transactionsSubmitted = ref([]);
const loading = ref(false);

const fetchTaxes = async () => {
  loading.value = true;
  const { data, error } = await supabase
    .from('taxes')
    .select('*')
    .eq('status', 'Paid');

  if (error) {
    console.error('Error fetching taxes:', error);
  } else {
    transactionsSubmitted.value = data;
  }
  loading.value = false;
};

onMounted(() => {
  fetchTaxes();
});

const chartData = ref({
  labels: [], 
  datasets: [
    {
      label: 'Taxes Paid',
      data: [], 
      backgroundColor: 'rgba(121, 85, 72, 0.2)',
      borderColor: 'rgba(121, 85, 72, 1)', 
      borderWidth: 1
    }
  ]
});

watchEffect(() => {
  if (transactionsSubmitted.value.length > 0) {
    const labels = transactionsSubmitted.value.map(tax => tax.period); 
    const data = transactionsSubmitted.value.map(tax => tax.tax_due); 
    chartData.value.labels = labels;
    chartData.value.datasets[0].data = data;
  }
});
</script>

<template>
  <DashboardLayout>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" class="px-6 pt-2">
        <h2 class="text-h5 font-weight-bold mb-6 text-center text-brown-darken-3">
          🧾 Taxes Paid Overview
        </h2>

        <v-card class="rounded-xl elevation-4 pa-4 bg-brown-lighten-5">
          <v-card-text class="px-0">
            <div v-if="loading" class="text-center py-4">
              <v-progress-circular indeterminate color="brown"></v-progress-circular>
            </div>
            <div v-else>
              <Bar :data="chartData" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </DashboardLayout>
</template>
