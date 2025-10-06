<template>
  <div id="app">
    <h1>All Books (Firestore)</h1>
    <pre>{{ formatted }}</pre>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      books: [],
      error: null,
    }
  },
  computed: {
    formatted() {
      return JSON.stringify(this.books, null, 2)
    }
  },
  mounted() {
    this.fetchAllBooks()
  },
  methods: {
    async fetchAllBooks() {
      try {
        const response = await axios.get('https://getallbooks-gwvncnqs2q-ts.a.run.app')
        this.books = Array.isArray(response.data) ? response.data : []
        this.error = null
      } catch (error) {
        console.error('Error fetching all books:', error)
        this.error = error?.message || 'error'
        this.books = []
      }
    }
  }
}
</script>


