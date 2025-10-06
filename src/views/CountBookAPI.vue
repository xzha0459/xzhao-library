<template>
  <div id="app">
    <h1>Count Book API</h1>
    <pre>{{ jsondata }}</pre>
    <p v-if="error">{{ error }}</p>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      jsondata: null,
      error: null,
    }
  },
  mounted() {
    this.getBookCountAPI()
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-gwvncnqs2q-ts.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = error?.message || 'error'
        this.jsondata = null
      }
    },
  },
}
</script>


