<script setup>
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

// Reactive form data
const form = ref({
  date: '',
  amount: '',
  type: 'income',  // Default type is 'income'
  category: '',
  notes: ''
})

// Reactive variable for error/success messages
const error = ref('')
const success = ref('')

const submitTransaction = async () => {
  error.value = ''
  success.value = ''

  // Validate form fields
  if (!form.value.date || !form.value.amount || !form.value.category) {
    error.value = 'Please fill in all required fields.'
    return
  }

  // Insert transaction into Supabase
  const { data, error: insertError } = await supabase
    .from('transactions')
    .insert([
      {
        date: form.value.date,
        amount: form.value.amount,
        type: form.value.type,
        category: form.value.category,
        notes: form.value.notes
      }
    ])

  if (insertError) {
    error.value = 'Error inserting transaction: ' + insertError.message
  } else {
    success.value = 'Transaction added successfully!'
    // Reset the form
    form.value = {
      date: '',
      amount: '',
      type: 'income',
      category: '',
      notes: ''
    }
  }
}
</script>


<template>
  <v-app class="bg-brown-lighten-1">
    <v-container fluid>
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="login-card elevation-10">
            <v-card-title class="justify-center">
              <v-img
                src="/images/SariBooks.png"
                max-width="220"
                class="my-4 mx-auto"
              />
            </v-card-title>

            <v-card-text>
              <h2 class="text-center text-brown-darken-3 font-weight-bold mb-4">
                Add Transaction
              </h2>

              <!-- Error and Success Messages -->
              <v-alert v-if="error" type="error" class="mb-4" border="start" color="error" variant="tonal">
                {{ error }}
              </v-alert>
              <v-alert v-if="success" type="success" class="mb-4" border="start" color="success" variant="tonal">
                {{ success }}
              </v-alert>

              <v-form @submit.prevent="submitTransaction">
                <!-- Date Field -->
                <v-text-field
                  v-model="form.date"
                  label="Date"
                  type="date"
                  variant="outlined"
                  density="comfortable"
                  color="brown-darken-2"
                  required
                  class="mb-3"
                />

                <!-- Amount Field -->
                <v-text-field
                  v-model="form.amount"
                  label="Amount"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                  color="brown-darken-2"
                  required
                  class="mb-3"
                />

                <!-- Type Field (Income or Expense) -->
                <v-select
                  v-model="form.type"
                  :items="['income', 'expense']"
                  label="Transaction Type"
                  variant="outlined"
                  density="comfortable"
                  color="brown-darken-2"
                  required
                  class="mb-3"
                />

                <!-- Category Field -->
                <v-text-field
                  v-model="form.category"
                  label="Category"
                  variant="outlined"
                  density="comfortable"
                  color="brown-darken-2"
                  required
                  class="mb-3"
                />

                <!-- Notes Field -->
                <v-textarea
                  v-model="form.notes"
                  label="Notes"
                  variant="outlined"
                  density="comfortable"
                  color="brown-darken-2"
                  class="mb-3"
                />

                <!-- Submit Button -->
                <v-btn
                  type="submit"
                  block
                  color="brown-darken-2"
                  class="login-btn text-white mt-4"
                  :disabled="!form.date || !form.amount || !form.category"
                >
                  <template #default>Add Transaction</template>
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.login-card {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(4px);
  border-radius: 24px;
  padding: 28px 24px;
  transition: 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
}

.login-card:hover {
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.1);
}

.login-btn {
  border-radius: 22px;
  font-weight: 600;
  font-size: 15px;
  height: 45px;
  transition: all 0.2s ease-in-out;
}

.login-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(95, 65, 43, 0.25);
}
</style>
