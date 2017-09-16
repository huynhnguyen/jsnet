console.log('requirejs loaded!');
console.log('okay! try to not make thing more complicated than what it should be!');
console.log('not sure what i need to do with requirejs')
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      "d3":"https://d3js.org/d3.v4",
      "_":"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min"
    }
});	

define('_d3',['d3'],(d3)=>{
	let svg, width
	const figure = ()=>{
		const = margin = {top: 20, right: 80, bottom: 30, left: 50};
		svg = d3.select("svg")
		width = svg.attr("width") - margin.left - margin.right,
		height = svg.attr("height") - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	}
	const xAxis = (width)=>{
		sn-d3-
	} 

	const yAxis = ()=>{

	}

	const parcood = (data)=>{
		xA
	}
	return {'plot':'d3':}
})
define('numpy',()=>{
	const op = {add:(x,y)=>{

			},
			dot:(x,y)=>{

			},
			tanh:(x,y)=>{

			}
		}
}
define('data/moon', ['d3','_'], (d3,_)=>{
	let data = new Array();
	const generate = (points)=>{
		console.log('generate');
		idx = _.range(points);
		console.log(data);
		data = _.map((x)=>{
			[i,i,i%2]
		},idx);
		return data;
	};
	const display = ()=>{	
		var svg = d3.select("svg"),
			margin = {top: 20, right: 80, bottom: 30, left: 50},
			width = svg.attr("width") - margin.left - margin.right,
		    height = svg.attr("height") - margin.top - margin.bottom,
		    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	}
	return {'generate':generate,'display':display}
})
define('net',['_'],(layerconfig)=>{
	const activation = {tanh:(x)=>{_.map()}}
	const layerconfig = [{id:'l1','size':[10,20],'activate':tanh},
				   {id:'l2','size':[10,1],'activate':tanh}];
	const fnet = ()=>{
		console.log('this is net generate');

	};
	const fdata = ()=>{};
	const loss = ()=>{
		return 
	};
	assert 
	const ftrain = (epoch, lr, decay)=>{
		console.log('this is train');
		loss = _.map()
	}
	return {net:fnet, data:fdata, train: ftrain}
})

require(['data/moon'],(data)=>{
	console.log(data.generate());
})
