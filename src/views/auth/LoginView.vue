<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
import { supabase, formActionDefault } from '@/utils/supabase'
import { useRouter } from 'vue-router'

const refVform = ref()

const formAction = ref({ ...formActionDefault })

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({ ...formDataDefault })

const router = useRouter()

const loginError = ref(false)

const onFormSubmit = () => {
  refVform.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }
  loginError.value = false

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    loginError.value = true
    formAction.value.formErrorMessage = 'Wrong email or password.'
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Successfully Logged In.'
    const user = data.user
    if (user) {
       router.replace('/item')
          }
  }

  refVform.value?.reset()
  formAction.value.formProcess = false
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
                Welcome to SariBooks!
              </h2>

              <v-alert
                v-if="loginError"
                type="error"
                class="mb-4"
                border="start"
                color="error"
                variant="tonal"
                elevation="1"
              >
                {{ formAction.formErrorMessage }}
              </v-alert>

              <v-form ref="refVform" @submit.prevent="onFormSubmit">
                <v-text-field
                  v-model="formData.email"
                  label="Email"
                  variant="outlined"
                  density="comfortable"
                  color="brown-darken-2"
                  :rules="[requiredValidator, emailValidator]"
                  class="mb-3"
                />
                <v-text-field
                  v-model="formData.password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                  color="brown-darken-2"
                  :rules="[requiredValidator, passwordValidator]"
                />

                <v-btn
                  type="submit"
                  block
                  color="brown-darken-2"
                  class="login-btn text-white mt-4"
                  :disabled="formAction.formProcess"
                  :loading="formAction.formProcess"
                >
                  <template #default>Log In</template>
                  <template #loading>
                    <v-progress-circular indeterminate color="white" size="22" />
                  </template>
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

.register-link {
  font-weight: 600;
  color: #6d4c41; /* brown darken-2 */
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
