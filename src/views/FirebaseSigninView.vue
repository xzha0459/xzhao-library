<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model = "email"/></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {useRouter} from "vue-router"

const email = ref ("")
const password = ref("")

const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data) => {
    console.log("Firebase Sign In Successful!")
    console.log("Current user after login:", auth.currentUser)
    console.log("User email:", auth.currentUser?.email)
    console.log("User UID:", auth.currentUser?.uid)
    console.log("User display name:", auth.currentUser?.displayName)
    router.push("/")
  })
  .catch((error) => {
    console.log(error.code);
  })
}
</script>
