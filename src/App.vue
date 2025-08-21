<script setup>
import JSONLab from '@/components/JSONLab.vue'
import LoginForm from '@/components/LoginForm.vue'
</script>

<template>
  <div class="app-container">
    <JSONLab />
    <LoginForm />
  </div>
</template>

<style scoped>
.app-container {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
</style>
