new Vue({
  data: {
    history_container: []
  },
  created: function () {
	let self = this
	self.getData()
	
	setInterval(function()
	{
		self.getData()
	}, 5000)
  },
  
  methods:
  {
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
			  var aft_parse = JSON.parse(res);
			  self.history_container += aft_parse['data'] + ',';
			  console.log(self.history_container);
		  }
		  )
	  }
  }
})
=======
Vue.component('type-signal-menu', {
    data: function(){
        return {
            insets: [
                {name: "Аналоговые сигналы"},
                {name: "Дискретные сигналы"},
                {name: "Диаграммы"}
            ]
        }
    },
    template: '<div><div class="signal-type" v-for="ins in insets"><p>{{ ins.name }}</p></div></div>'
});

Vue.component('io-menu', {
    data: function(){
        return {
            insets: [
                {name: "Аналоговые входы"},
                {name: "Дискретные входы"}
            ]
        }
    },
    template: '<div><div class="io-type" v-for="ins in insets"><p>{{ ins.name }}</p></div></div>'
});

new Vue({
    el: '#left-menu',
    data: {

    }
});

new Vue({
    el: '#top-menu',
    data: {

    }
});
