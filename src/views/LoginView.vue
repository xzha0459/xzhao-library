<template>
  <div class="container">
    <h1 class="text-center">Login</h1>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
          <div v-if="errorMessage" class="alert alert-danger mt-3">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  // Hardcoded credentials
  if (username.value === 'admin' && password.value === 'password') {
    // Store authentication state
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('username', username.value)

    // Trigger storage event to update header
    window.dispatchEvent(new Event('storage'))

    // Redirect to home page
    router.push('/')
  } else {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>
