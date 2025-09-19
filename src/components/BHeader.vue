<template>
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <div class="nav nav-pills">
        <router-link to="/" class="nav-link" active-class="active">Home (Week 5)</router-link>
        <router-link v-if="isAuthenticated" to="/about" class="nav-link" active-class="active">About</router-link>
        <router-link v-if="isAuthenticated" to="/add-book" class="nav-link" active-class="active">Add Book</router-link>
        <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
      </div>

      <div v-if="isAuthenticated" class="d-flex align-items-center">
        <span class="me-3">Welcome, {{ username }}!</span>
        <button @click="logout" class="btn btn-outline-danger btn-sm">Logout</button>
      </div>
      <div v-else>
        <router-link to="/login" class="btn btn-primary btn-sm">Login</router-link>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()
const isAuthenticated = ref(false)
const username = ref('')

const checkAuth = () => {
  // Check Firebase auth state
  const user = auth.currentUser
  if (user) {
    isAuthenticated.value = true
    username.value = user.email || user.displayName || 'User'
  } else {
    isAuthenticated.value = false
    username.value = ''
  }
}

const logout = async () => {
  try {
    // Log current user before logout
    const currentUser = auth.currentUser
    console.log('Current user before logout:', currentUser)
    console.log('User email:', currentUser?.email)
    console.log('User UID:', currentUser?.uid)
    console.log('User display name:', currentUser?.displayName)

    await signOut(auth)
    console.log('Firebase logout successful!')
    console.log('User logged out successfully')

    isAuthenticated.value = false
    username.value = ''
    router.push('/FireLogin')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

let unsubscribeAuth = null

onMounted(() => {
  checkAuth()
  // Listen for Firebase auth state changes
  unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true
      username.value = user.email || user.displayName || 'User'
    } else {
      isAuthenticated.value = false
      username.value = ''
    }
  })
})

onUnmounted(() => {
  if (unsubscribeAuth) {
    unsubscribeAuth()
  }
})

// Also check auth when component updates
import { watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

watch(route, () => {
  checkAuth()
}, { immediate: true })
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
