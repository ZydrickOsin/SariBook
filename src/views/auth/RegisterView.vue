<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
import { supabase, formActionDefault } from '@/utils/supabase.js'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const form = ref({ ...formActionDefault })

const registeraccount = async () => {
  form.value.formProcess = true
  form.value.formErrorMessage = ''
  form.value.formSuccessMessage = ''

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    full_name: fullName.value,
  })

  if (error) {
    form.value.formStatus = error.status
    form.value.formErrorMessage = error.message
  } else {
    form.value.formSuccessMessage = 'Registration successful!'
    setTimeout(() => {
      router.replace('/login')
    }, 2000)
  }

  form.value.formProcess = false
}
</script>

<template>
  <v-app class="bg-brown-lighten-1">
    <v-container fluid class="fill-height">
      <v-row
        align="center"
        justify="center"
        class="ma-0"
        style="min-height: 100vh"
      >
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="rounded-xl elevation-10 pa-6 text-center bg-white">
            <v-img
              src="/images/SariBooks.png"
              max-width="180"
              class="mx-auto mb-5"
              contain
            />

            <h2 class="text-h6 font-weight-bold text-brown-darken-3 mb-4">
              ✨ Create an Account
            </h2>

            <v-form fast-fail @submit.prevent="registeraccount">
              <v-text-field
                v-model="fullName"
                label="Full name"
                variant="outlined"
                density="compact"
                class="mb-3"
                :rules="[requiredValidator]"
                color="brown-darken-2"
              />
              <v-text-field
                v-model="email"
                label="Email"
                variant="outlined"
                density="compact"
                class="mb-3"
                :rules="[requiredValidator, emailValidator]"
                color="brown-darken-2"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                variant="outlined"
                density="compact"
                class="mb-3"
                :rules="[requiredValidator, passwordValidator]"
                color="brown-darken-2"
              />

              <v-btn
                :loading="form.formProcess"
                type="submit"
                block
                color="brown-darken-2"
                class="rounded-lg text-white font-weight-medium"
              >
                Register
              </v-btn>

              <div
                v-if="form.formErrorMessage"
                class="text-error text-caption mt-2"
              >
                {{ form.formErrorMessage }}
              </div>
              <div
                v-if="form.formSuccessMessage"
                class="text-success text-caption mt-2"
              >
                {{ form.formSuccessMessage }}
              </div>
            </v-form>

            <p class="text-caption mt-4">
              Already have an account?
              <RouterLink
                to="/login"
                class="text-brown-darken-2 text-decoration-none font-weight-medium"
              >
                Log in
              </RouterLink>
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>



<style scoped>
.v-img {
  border-radius: 12px;
}
</style>
