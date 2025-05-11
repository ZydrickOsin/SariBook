<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { supabase } from '@/utils/supabase';
import DashboardLayout from '@/components/DashboardLayout.vue';
import { Bar } from 'vue-chartjs'; // Import the Bar chart component from vue-chartjs
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Define reactive variables
const transactionsSubmitted = ref([]);
const loading = ref(false);

// Fetch taxes data
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

// Call fetchTaxes when component is mounted
onMounted(() => {
  fetchTaxes();
});

// Prepare data for the chart
const chartData = ref({
  labels: [], // Tax periods (e.g., March-2025, Q1-2025)
  datasets: [
    {
      label: 'Taxes Paid',
      data: [], // Tax due amounts
      backgroundColor: 'rgba(121, 85, 72, 0.2)', // Light brown color
      borderColor: 'rgba(121, 85, 72, 1)', // Dark brown color for the border
      borderWidth: 1
    }
  ]
});

// Update chart data when taxes data is fetched
watchEffect(() => {
  if (transactionsSubmitted.value.length > 0) {
    const labels = transactionsSubmitted.value.map(tax => tax.period); // Use period for labels
    const data = transactionsSubmitted.value.map(tax => tax.tax_due); // Use tax_due for the values
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
