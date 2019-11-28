new Vue({
    el: '#container',                                            
    data: {                                                  
        data_container: [],
        history_container: [],
        type_container: [],
        diag_container: [],
        config: {
            type: 'line',
            data: {
                labels: [0],
                    datasets: [{
                        label: 'Dataset1',
                        fill: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                        borderWidth: 1,
                        data: [0]
                    },
                    {
                        label: 'Dataset2',
                        fill: false,
                        backgroundColor: 'rgba(255, 69, 0, 0.5)',
                        borderColor: 'rgba(255, 69, 0, 0.5)',
                        borderWidth: 1,                              
                        data: [0]                                    
                    },                                               
                    {                                                
                        label: 'Dataset3',                       
                        fill: false,                         
                        backgroundColor: 'rgba(75, 0, 130, 0.5)',    
                        borderColor: 'rgba(75, 0, 130, 0.5)',        
                        borderWidth: 1,                              
                        data: [0]                                    
                    },                                          
                    {                                           
                        label: 'Dataset4',                           
                        fill: false,                                 
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',     
                        borderColor: 'rgba(0, 0, 255, 0.5)',         
                        borderWidth: 1,                  
                        data: [0]                      
                    }]                                               
            },                                                       
            options: {                                               
                scales: {                                            
                    yAxes: [{                                        
                        ticks: {                           
                            suggestedMin: 50,                        
                            suggestedMax: 100                          
                        }                                            
                    }]                                               
                }                                                  
            }                                                      
        },
	time: 0                                                  
    },                                                           
    mounted: function() {                                        
        let ctx = document.getElementById("chart").getContext("2d")
        let line = new Chart(ctx, this.config)                     
        let self = this                                            
                                                                   
        setInterval(function(){                                                               
            self.setTime(10);                                      
            self.loadData(line);                                   
            self.getData();
        }, 1000)                                                   
    },                                                             
    methods: {                                                     
        loadData: function(chart) {                                  
            this.config.type = 'line'
            let history_str = String(this.data_container[0])

            let history_arr = history_str.split(',')
            history_arr.pop()
            
            this.history_container += history_arr
                                                                     
            this.config.data.datasets[3].data.push(history_arr.pop())
            this.config.data.datasets[2].data.push(history_arr.pop())
            this.config.data.datasets[1].data.push(history_arr.pop())
            this.config.data.datasets[0].data.push(history_arr.pop())
                                                                     
            this.config.data.labels.push(this.time)                  
                                                                     
            this.time += 1                                           
                                                                     
            chart.update()                                           
        },
        setTime: function(maxTime) {
            if( this.time >= maxTime-1 ) {
                this.config.data.labels.shift()
                this.config.data.datasets[0].data.shift()
            }
        },
        getJSON_data: function()
        {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "data");
                xhr.onload = () => resolve(xhr.response);
                xhr.onerror = () => reject(xhr.statusText);          
                xhr.send();                                            
            });                                                      
        },                                                           
        getData: function()                                            
        {                                                            
            var self = this
            self.data_container = []
            this.getJSON_data()
            .then(function(res)
            {
                var aft_parse = JSON.parse(res)
                self.data_container.push(aft_parse['ADC-val'] + ',')
                self.type_container = (aft_parse['ADC-type'])
                console.log(self.type_container)
                console.log(typeof(self.type_container))
                self.diag_container = (aft_parse['ADC-diag'])
                console.log(self.diag_container)
                console.log(typeof(self.diag_container))
            })
        }
    }
});
