<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import DashboardLayout from '@/components/DashboardLayout.vue'

const transactionsSubmitted = ref([])
const loading = ref(true)

const fetchTaxes = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('taxes')
    .select('*')
    .eq('status', 'Paid')

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
  <DashboardLayout>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" class="px-6 pt-2">
        <h2 class="text-h5 font-weight-bold mb-6 text-center text-brown-darken-3">
          🧾 Submitted Taxes to BIR
        </h2>

        <v-card class="rounded-xl elevation-4 pa-4 bg-brown-lighten-5">
          <v-card-text class="px-0">
            <v-table class="rounded-lg elevation-1">
              <thead class="bg-brown-lighten-4">
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
                  <td colspan="7" class="text-center py-4">Loading...</td>
                </tr>
                <tr v-else-if="transactionsSubmitted.length === 0">
                  <td colspan="7" class="text-center py-4">No transactions found.</td>
                </tr>
                <tr
                  v-for="tx in transactionsSubmitted"
                  :key="tx.id"
                  class="hover:bg-brown-lighten-5 transition"
                >
                  <td class="text-center">{{ tx.period }}</td>
                  <td class="text-center">{{ tx.tax_type }}</td>
                  <td class="text-center">{{ (parseFloat(tx.tax_rate) * 100).toFixed(0) }}%</td>
                  <td class="text-center text-green-darken-2 font-weight-bold">+{{ tx.income_total }}</td>
                  <td class="text-center">{{ tx.tax_due }}</td>
                  <td class="text-center">{{ tx.status }}</td>
                  <td class="text-center">{{ new Date(tx.created_at).toLocaleDateString() }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </DashboardLayout>
</template>
