new Vue({
    el: '#container',                                            
    data: {                                                  
        config: {
            type: 'line',
            data: {
                labels: [0],
                    datasets: [{
                        label: 'ADC-0',
                        fill: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                        borderWidth: 2,
                        data: [0]
                    },{
                        label: 'ADC-1',
                        fill: false,
                        backgroundColor: 'rgba(0, 250, 154, 0.5)',
                        borderColor: 'rgba(0, 250, 154, 0.5)',
                        borderWidth: 2,
                        data: [0]
                    },{
                        label: 'ADC-2',
                        fill: false,
                        backgroundColor: 'rgba(72, 209, 204, 0.5)',
                        borderColor: 'rgba(72, 209, 204, 0.5)',
                        borderWidth: 2,
                        data: [0]
                    },{
                        label: 'ADC-3',
                        fill: false,
                        backgroundColor: 'rgba(220, 20, 60, 0.5)',
                        borderColor: 'rgba(220, 20, 60, 0.5)',
                        borderWidth: 2,
                        data: [0]
                    }]                                               
            },                                                       
            options: {                                               
                scales: {                                            
                    yAxes: [{                                        
                        ticks: {                           
                            suggestedMin: 0,                        
                            suggestedMax: 10                         
                        }                                            
                    }]                                               
                }                                                  
            }                                            
        },
        currentData: [
            { value: ''},
            { value: ''},
            { value: ''},
            { value: ''}
        ],
        time: 0                                                  
    },                                                            
    mounted: function() {                                        
        let ctx = document.getElementById("chart").getContext("2d")
        let line = new Chart(ctx, this.config) 
                    
        let self = this                                            
                                                                   
        setInterval(function(){                                                               
            self.setTime(10);                                      
            self.loadData(line);                                   
        }, 1000)                                                   
    },                                                             
    methods: {                                                     
        loadData: function(chart) {                                  
            this.config.type = 'line'                                                                                                                           
            
            for (let i = 0; i < 4; i++) {
                this.config.data.datasets[i].data.push(this.randomData()) 
                this.currentData[i].value = this.config.data.datasets[i].data[this.config.data.datasets[i].data.length - 1]
            }        

            this.config.data.labels.push(this.time) 

            this.time += 1      

            chart.update()                                           
        },
        setTime: function(maxTime) {
            if( this.time >= maxTime-1 ) {
                this.config.data.labels.shift()
                for (let i = 0; i < 4; i++) {
                    this.config.data.datasets[i].data.shift()
                }
            }
        },
        randomData: function() {
            return Math.floor(Math.random() * 10)
        }
    }
}); 