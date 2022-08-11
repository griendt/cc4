<template>
  <div id="app">
    <button v-on:click="sendMessage('message', 'hello')">Send Message</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      connection: null
    }
  },
  methods: {
    sendMessage: function(type, payload) {
      const message = JSON.stringify({"type": type, "payload": payload})

      this.connection.send(message);
      console.log('Message sent: ' + message);
    },
  },
  created: function() {
    this.connection = new WebSocket("ws://localhost:3000");

    this.connection.onmessage = function(event) {
      console.log('We received a message! It contains: ' + event.data);
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>