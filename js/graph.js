new Vue({
    el: '#container',
    data: {
        history_container: [],
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
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
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

        setInterval(function() {
            self.setTime(10);
            self.loadData(line);
            self.getData();
        }, 1000)
    },
    methods: {
        randomScalingFactor: function() {
            return Math.round(Math.random() * 100);
        },
        loadData: function(chart) {
            this.config.type = 'line'
            for (let i = history_container.length - 5; i < history_container.length - 1; i++) {
                this.config.data.datasets[0].data.push(this.history_container[i])
                console.log(this.history_container[i])
            }
            
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
            this.getJSON_data()
            .then(function(res) 
            {
                var aft_parse = JSON.parse(res)
                self.history_container.push(aft_parse['data'] + ',')
                console.log(self.history_container)
            })
        }
    }
});
