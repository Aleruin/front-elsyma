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
            let index = this.history_container.length
            for (let i = 0; i < this.config.data.datasets.length; i++) {
                this.config.data.datasets[i].data.push(this.history_container[index - 4])
                this.config.data.datasets[i].data.push(this.history_container[index - 3])
                this.config.data.datasets[i].data.push(this.history_container[index - 2])
                this.config.data.datasets[i].data.push(this.history_container[index - 1])
            }
            console.log(this.history_container)

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
                self.history_container.push(aft_parse['ADC-val'] + ',')
                console.log(self.history_container)
            })
        }
    }
});
