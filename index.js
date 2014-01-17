var request,fs,Regex;

request = require('request')
fs = require('fs');
Regex = require('yi-regex');

function seven(headers) {
	if(headers){
	this.headers=headers;
	}else{
	this.headers={ "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3",
				   "accept-language" : "en-US,en;q=0.8",
				   "accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
				   "user-agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"
				  }	
	}
	return  this;
}

seven.prototype.play = function(url,fn) {
	options = { url: url,  headers: this.headers }; 
	request(options, function callback(error, response, body) {
	    if (error) {
	    	fn(error,null);
	    }else{
	    	var resp ={headers:response.headers,
	    				status:response.statusCode}
	    	fn(null,body.replace(/[\n\t\r]/g,""),resp);
	    }
	});
};


seven.prototype.matchall=function(data,start,end){
	return data.match(new RegExp(start+"(.*?)"+end,"g"));
					  
}

seven.prototype.out=function(dir,data,fn){
	if(typeof dir =="object"){
			if(dir.clear){
				fs.writeFile(dir.dir, dir.chunk, function(err) {
				    if(data){
				    	if(err) {
					       data(err);
					    } else {
					       data(null,"The file was saved!");
					    }
				    }
				}); 

			}else{
				fs.writeFile(dir.dir, dir.chunk, function(err) {
				    if(data){
				    	if(err) {
					       data(err);
					    } else {
					        data(null,"The file was saved!");
					    }
				    }
				}); 
			}
	}else{

		fs.writeFile(dir, data, function(err) {
				    if(fn){
				    	if(err) {
					       fn(err);
					    } else {
					       fn(null,"The file was saved!");
					    }
				    }
				}); 	
	}
}

seven.prototype.attr=function(data,attr){
	var result;
	switch(attr){
		case "id":
			result = Regex.matchAll(/ id="(.*?)"/g, data);
		break;

		case "class":
			result = Regex.matchAll(/ class="(.*?)"/g, data);
		break;

		case "src":
			result = Regex.matchAll(/ src="(.*?)"/g, data);
		break;

		case "href":
			result = Regex.matchAll(/ href="(.*?)"/g, data);
		break;

		case "all": 
			result = Regex.matchAll(/(class|id|data|data-*?)*?["|'](.*?)["|']/g,data);
	    break;
	    case "data": 
			result = Regex.matchAll(/(data-*?)*?["|'](.*?)["|']/g,data);
	    break;
	    default:
	    	result=null;
	    break;	
	}

	return result;
}

module.exports =seven;