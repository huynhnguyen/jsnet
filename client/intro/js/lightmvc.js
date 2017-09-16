console.log('requirejs loaded!');
console.log('okay! try to not make thing more complicated than what it should be!');
console.log('not sure what i need to do with requirejs')
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "nets": 'nets',
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      "d3":"https://d3js.org/d3.v4",
      "underscore":"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min"
    }
});	

require(['jquery','nets'],function(draw_net){
	console.log('draw_net');
	draw_net();
	const baseURI = 'pages/';
    const routers = { '#index':{'url':'index.html'},
    				  '#todo':{'url':'todo.html'},
    				  '#lazycoder':{'url':'lazycoder.html'},
                      '#funmath':{'url':'funmath.html'},
    				  '#randomthought':{'url':'randomthought.html'} };
    const default_route = '#index';
    let current_hash = '';
    const check_hash = (new_hash) =>{
    	let is_change = new_hash !== current_hash;
    	console.log(current_hash);
    	return {'changed':is_change,'hash':new_hash}
    }
    const load_controller = (controller) => {
    	console.log(controller);
    	if(controller.hash in routers){
    		let url = baseURI + routers[controller.hash].url; 
    		$('#page').load(url);
    		return controller.hash;   		
    	}
    	else{
    		let url = baseURI + routers[default_route].url; 
    		return '';
    	}
    }	
    
    function startRouting(){
        current_hash = load_controller(check_hash(window.location.hash));
        $('.router').click(function(){
            console.log('click me');
            let new_hash = $(this).attr('href');
            current_hash = load_controller(check_hash(new_hash));
        })
    	// const interval = 100;
    	// console.log('start routing with interval '+ interval);
    //     setInterval(()=>{ site lags terriblely

    //     		//TODO: FP by Eris Elliott, T.T, antipattern
				// current_hash = load_controller(check_hash(current_hash));
    //     	}, interval);
    }
    
    startRouting();
    
});


