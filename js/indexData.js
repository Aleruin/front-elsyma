  new Vue({                                                   
                                             
  el: '#indexData',                                            
                                                          
  data: {
    indexPerforms: ["Флаг отладки", "Положение переключателя", "Наличие карты памяти", "Версия ядра ОС", "Версия ядра CoDeSys", "Версия сборки компонент", "Имя модуля", "Доп информация"],                                                         
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
