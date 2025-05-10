<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const transactionsSubmitted = ref([])
const loading = ref(true)

const fetchTaxes = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('taxes')
    .select('*')
    .eq('status', 'Paid')
console.log(data)
  if (error) {
    console.error('Error fetching taxes:', error)
  } else {
    transactionsSubmitted.value = data
  }
  loading.value = false
}

onMounted(fetchTaxes)
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8" class="px-6 pt-2">
      <h2 class="text-h5 font-weight-bold mb-6 text-center text-green-darken-3">
        📋 List of Submitted to BIR
      </h2>

      <v-card class="rounded-xl elevation-3 pa-4">
        <v-divider class="my-2" />

        <v-card-text class="px-0">
          <v-table height="300px" density="comfortable" class="rounded-lg text-center">
            <thead>
              <tr>
                <th class="text-center">Period</th>
                <th class="text-center">Tax Type</th>
                <th class="text-center">Rate</th>
                <th class="text-center">Income Total</th>
                <th class="text-center">Due</th>
                <th class="text-center">Status</th>
                <th class="text-center">Paid Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="7" class="text-center">Loading...</td>
              </tr>
              <tr v-else-if="transactionsSubmitted.length === 0">
                <td colspan="7" class="text-center">No transactions found.</td>
              </tr>
              <tr v-for="tx in transactionsSubmitted" :key="tx.id">
                <td>{{ tx.period }}</td>
                <td>{{ tx.tax_type }}</td>
                <td>{{ (parseFloat(tx.tax_rate) * 100).toFixed(0) }}%</td>
                <td>{{ tx.income_total }}</td>
                <td>{{ tx.tax_due }}</td>
                <td>{{ tx.status }}</td>
                <td>{{ new Date(tx.created_at).toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
