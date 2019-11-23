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