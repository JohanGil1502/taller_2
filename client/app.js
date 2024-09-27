new Vue({
    el: '#app',
    data: {
      servers: [
        { server: '', logs: [] }, 
        { server: '', logs: [] }  
      ]
    },
    methods: {
      fetchServerInfo() {
        fetch('http://localhost:5000/status') 
          .then(response => response.json())
          .then(data => {
            this.servers = data;
          })
          .catch(error => {
            console.error('Error al obtener la información del servidor:', error);
          });
      }
    },
    mounted() {
      this.fetchServerInfo();
      setInterval(this.fetchServerInfo, 1000);
    }
  });