  new Vue({

  el: '#data',

  data: {
    dacPerfoms: "DAC-val",
    dacValues: null,
    adcPerfoms: "ADC-val",
    adcValues: null,
    adcDiag: "ADC-diag",
    adcStatus: 0,
    adcTypesGet: "ADC-type",
    showMe:[
        {val: null, type: null}
    ]
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
            self.showMe.val = after_party[self.adcPerfoms]
            console.log(self.showMe.val)
            self.adcStatus = after_party[self.adcDiag]
            self.showMe.type = after_party[self.adcTypesGet]
            console.log(self.showMe.type)
          })
    },
    getJSON: function() {
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", "http://192.168.56.101/data");
          xhr.onload = () => resolve(xhr.response);
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send();
      });
    }
  }

})
