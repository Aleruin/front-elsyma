  new Vue({

  el: '#data',

  data: {
    dacPerfoms: "DAC-val",
    dacValues: null,
    adcPerfoms: "ADC-val",
    adcValues: null,
    adcDiag: "ADC-diag",
    adcStatus: 0
  },

  created: function () {
    var self = this 
    self.fetchData() 

    setInterval(function () {
        self.fetchData() 
    }, 5000)
  },

  methods: {
    fetchData: function () {
        var self = this

        this.getJSON()
          .then(function(res) {
            var after_party = JSON.parse(res);
            self.dacValues = after_party[self.dacPerfoms]
            self.adcValues = after_party[self.adcPerfoms]
            self.adcStatus = after_party[self.adcDiag]
          })

    },
    getJSON: function() {
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", "/data");
          xhr.onload = () => resolve(xhr.response);
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send();
      });
    }
  }

})
