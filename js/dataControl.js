  new Vue({                                                   
                                             
  el: '#data',                                            
                                                          
  data: {                                                 
    descretePerfoms: ["DAC-0", "DAC-1", "DAC-2", "DAC-3", "DAC-4", "DAC-5"],
    currentPerform: "DAC-0",                 
    values: null                                          
  },                          
                                                
  created: function () {                                  
    var self = this 
    self.fetchData() 

    setInterval(function () {
        self.fetchData() 
    }, 5000)                          
  },                                                 
                                                        
  watch: {                                           
    currentPerfodescretePerfomsrm: 'fetchData'                        
                  
  },                                                 
                                                      
  filters: {                                              
                                                    
  }, 

  methods: {                                                
    fetchData: function () {                                
        var self = this         
                                
        this.getJSON()          
          .then(function(res) {
            var after_party = JSON.parse(res);
            self.values = after_party[self.currentPerform]           
          })                                               
                                                          
    },   
    getJSON: function() {                                 
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", "/tmlbdata");                  
          xhr.onload = () => resolve(xhr.response);     
          xhr.onerror = () => reject(xhr.statusText);   
          xhr.send();                                   
      });                                               
    }  
  }  

})
