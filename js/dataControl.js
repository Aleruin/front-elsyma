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
    showMe:[]
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
            let temp = after_party[self.adcTypesGet]
            for(let i = 0; i < 4; i++)
            {
                self.adcValues[i] += ' ' + self.compareTypes(temp[i])
            }
          })
    },
    compareTypes: function(numType)
    {
        switch(numType){
                case '0':
                    return "Не подключен"
                    break;
                case '1':
                    return "мА"
                    break;
                case '2':
                    return "B"
                    break;
                default:
                    return "°C"
                    break;
            }
    },
    getJSON: function() {
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", "data");
          xhr.onload = () => resolve(xhr.response);
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send();
      });
    }
  }

})
