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
    form.value.formSuccessMessage = 'Registration successful! '
    setTimeout(() => {
      router.replace('/')
    }, 2000)
  }

  form.value.formProcess = false
}

</script>

<template>
  <v-app>
    <v-container fluid class="bg-container d-flex align-center justify-center">
      <v-row justify="center">
   
          <v-card class="pa-10 rounded-xl mx-auto text-center" elevation="10" max-width="100%">
            <v-row no-gutters>
              <v-col cols="12" class="pa-3 d-flex flex-column justify-center">
                <v-img class="mx-auto mb-2" src="" width="100" />
                <h2 class="text-h6 font-weight-bold mb-2">
                  Register 
                </h2>

                <v-form fast-fail @submit.prevent="registeraccount">
                  <v-text-field
                    v-model="fullName"
                    label="Full name"
                    variant="outlined"
                    density="compact"
                    class="mb-2"
                    :rules="[requiredValidator]"
                  />
                  <v-text-field
                    v-model="email"
                    label="Email"
                    variant="outlined"
                    density="compact"
                    class="mb-2"
                    :rules="[requiredValidator, emailValidator]"
                  />
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    density="compact"
                    :rules="[requiredValidator, passwordValidator]"
                  />

                  <v-btn :loading="form.formProcess" class="mt-3" type="submit" block color="success">
                    Register
                  </v-btn>

                  <div v-if="form.formErrorMessage" class="text-error mt-2">
                    {{ form.formErrorMessage }}
                  </div>
                  <div v-if="form.formSuccessMessage" class="text-success mt-2">
                    {{ form.formSuccessMessage }}
                  </div>
                </v-form>

                <p class="text-caption mt-3">
                  Already have an account?
                  <RouterLink to="/" class="text-green-darken-2">Log in</RouterLink>
                </p>
              </v-col>
            </v-row>
          </v-card>
      
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>

.v-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}
</style>