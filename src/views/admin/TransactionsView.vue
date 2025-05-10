<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import DashboardLayout from '@/components/DashboardLayout.vue'

const transactions = ref([])
const loading = ref(true)

const fetchTransactions = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching transactions:', error)
  } else {
    transactions.value = data
  }

  loading.value = false
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(fetchTransactions)
</script>

<template>
  <DashboardLayout>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" class="px-6 pt-2">
        <h2 class="text-h5 font-weight-bold mb-6 text-center text-brown-darken-3">
          📋 Transaction History
        </h2>

        <v-card class="rounded-xl elevation-4 pa-4 bg-brown-lighten-5">
          <v-card-text class="px-0">
            <v-table class="rounded-lg elevation-1">
              <thead class="bg-brown-lighten-4">
                <tr>
                  <th class="text-center">ID</th>
                  <th class="text-center">Date</th>
                  <th class="text-center">Amount</th>
                  <th class="text-center">Type</th>
                  <th class="text-center">Category</th>
                  <th class="text-center">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="7" class="text-center py-4">Loading...</td>
                </tr>
                <tr v-else-if="transactions.length === 0">
                  <td colspan="7" class="text-center py-4">No transactions found.</td>
                </tr>
                <tr
                  v-for="t in transactions"
                  :key="t.transaction_id"
                  class="hover:bg-brown-lighten-5 transition"
                >
                  <td class="text-center">{{ t.transaction_id }}</td>
                  <td class="text-center">{{ formatDate(t.date) }}</td>
                  <td
                    class="text-center font-weight-bold"
                    :class="t.type === 'income' ? 'text-green-darken-2' : 'text-red-darken-2'"
                  >
                    {{ t.type === 'income' ? '+' : '-' }}{{ Math.abs(t.amount) }}
                  </td>
                  <td class="text-center">{{ t.type }}</td>
                  <td class="text-center">{{ t.category }}</td>
                  <td class="text-center">{{ t.notes }}</td>
                  
                </tr>
              </tbody>
            </v-table>
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn
              to="/tax"
              color="brown-darken-2"
              variant="flat"
              class="text-white mt-4"
            >
              <v-icon start>mdi-calculator-variant</v-icon>
              Calculate Taxes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </DashboardLayout>
</template>
