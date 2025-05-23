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
    .eq('type', 'income')

  if (error) {
    console.error('Error fetching transactions:', error)
  } else {
    transactions.value = data
  }
  loading.value = false
}

const markAsPaid = async (tx) => {
  const tax_rate = 0.12
  const tax_due = parseFloat(tx.amount) * tax_rate

  const { error: insertError } = await supabase
    .from('taxes')
    .insert({
      period: 'May-2025',
      tax_type: 'vat',
      income_total: tx.amount,
      tax_rate,
      // tax_due,
      submitted: false,
      status: 'Paid',
    })

  if (insertError) {
    console.error('Error inserting into taxes:', insertError)
    return
  }

  const { error: deleteError } = await supabase
    .from('transactions')
    .delete()
    .eq('transaction_id', tx.transaction_id)

  if (deleteError) {
    console.error('Error deleting transaction:', deleteError)
    return
  }

  transactions.value = transactions.value.filter(t => t.transaction_id !== tx.transaction_id)
  console.log('Transaction processed and marked as paid.')
}

onMounted(fetchTransactions)
</script>

<template>
  <DashboardLayout>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" class="px-6 pt-2">
        <h2 class="text-h5 font-weight-bold mb-6 text-center text-brown-darken-3">
          🧾 Taxation
        </h2>

        <v-card class="rounded-xl elevation-4 pa-4 bg-brown-lighten-5">
          <v-card-text class="px-0">
            <v-table class="rounded-lg elevation-1">
              <thead class="bg-brown-lighten-4">
                <tr>
                  <th class="text-center">Transaction ID</th>
                  <th class="text-center">Total Income</th>
                  <th class="text-center">Period</th>
                  <th class="text-center">Rate</th>
                  <th class="text-center">Due</th>
                  <th class="text-center">Submitted</th>
                  <th class="text-center">Actions</th>
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
                  v-for="tx in transactions"
                  :key="tx.transaction_id"
                  class="hover:bg-brown-lighten-5 transition"
                >
                  <td class="text-center">{{ tx.transaction_id }}</td>
                  <td class="text-center font-weight-bold text-green-darken-2">
                    +{{ tx.amount }}
                  </td>
                  <td class="text-center">May-2025</td>
                  <td class="text-center">12%</td>
                  <td class="text-center">{{ (parseFloat(tx.amount) * 0.12).toFixed(2) }}</td>
                  <td class="text-center">No</td>
                  <td class="text-center">
                    <v-btn
                      color="brown-darken-2"
                      variant="flat"
                      size="small"
                      class="text-white"
                      @click="markAsPaid(tx)"
                    >
                      <v-icon start>mdi-check</v-icon>
                      Mark as Paid
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </DashboardLayout>
</template>
