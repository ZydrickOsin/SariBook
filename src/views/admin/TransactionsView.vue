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
    console.log(data)
  if (error) {
    console.error('Error fetching transactions:', error)
  } else {
    transactions.value = data
  }
  loading.value = false
}

onMounted(fetchTransactions)
</script>

<template>
  <DashboardLayout>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8" class="px-6 pt-2">
      <h2 class="text-h5 font-weight-bold mb-6 text-center text-green-darken-3">
        📋 Transactions
      </h2>

      <v-card class="rounded-xl elevation-3 pa-4">
        <v-divider class="my-2" />

        <v-card-text class="px-0">
          <v-table height="300px" density="comfortable" class="rounded-lg text-center">
            <thead>
              <tr>
                <th class="text-center">Transaction ID</th>
                <th class="text-center">When</th>
                <th class="text-center">Amount</th>
                <th class="text-center">Type</th>
                <th class="text-center">Category</th>
                <th class="text-center">Notes</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="7" class="text-center">Loading...</td>
              </tr>
              <tr v-else-if="transactions.length === 0">
                <td colspan="7" class="text-center">No transactions found.</td>
              </tr>
              <tr v-for="t in transactions" :key="t.transaction_id">
                <td>{{ t.transaction_id }}</td>
                <td>{{ t.date }}</td>
                <td>{{ t.amount }}</td>
                <td>{{ t.type }}</td>
                <td>{{ t.category }}</td>
                <td>{{ t.notes }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-btn to="/tax">
          Calculate Taxes
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
  </DashboardLayout>
</template>
