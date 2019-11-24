  new Vue({                                                   
                                             
  el: '#indexData',                                            
                                                          
  data: {
    indexPerforms: ["ExeptionFlag", "DIPSwitch", "SDOn", "OSCoreVer", "CSCoreVer", "FWVer", "RealModName", "ExtInfo"],                                                         
    values: null                                          
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
            self.values = after_party           
          })                                               
                                                          
    },   
    getJSON: function() {                                 
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", "/boardinfo");                  
          xhr.onload = () => resolve(xhr.response);     
          xhr.onerror = () => reject(xhr.statusText);   
          xhr.send();                                   
      });                                               
    }  
  }  

})
