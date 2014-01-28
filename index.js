var request,fs,Regex,strip,pattern,tagfinder,

request = require('request')
fs = require('fs');
Regex = require('yi-regex');
strip=require('./lib/strip');
pattern=require('./lib/pattern');
tagfinder=require('tagfinder');

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
	this.pattern =pattern;
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
	    	fn(null,body,resp);
	    }
	});
};


seven.prototype.matchall=function(data,start,end){
	try {
   return data.match(new RegExp(start+"(.*?)"+end,"g"));
  } catch (e) {
   return null;
  }
					  
}

seven.prototype.out=function(obj){
	if(typeof obj =="object"){
			if(obj.clear){
				fs.writeFile(obj.dir, obj.chunk, function(err) {
				    if(data){
				    	if(err) {
					       data(err);
					    } else {
					       data(null,"The file was saved!");
					    }
				    }
				}); 

			}else{
				fs.writeFile(dir.dir, dir.chunk.replace(/[\n\t\r]/g,""), function(err) {
				    if(data){
				    	if(err) {
					       data(err);
					    } else {
					        data(null,"The file was saved!");
					    }
				    }
				}); 
			}
	}
}

seven.prototype.attrkey=function(x){
  var b =Object.keys(x);
  var y ={};
      y[b]=x[b];
  this.pattern.push(y);
  
  return this;
}

seven.prototype.attr=function(data,attr){
	var result;
	for (var i = this.pattern.length - 1; i >= 0; i--) {
   		 var b =Object.keys(this.pattern[i]);
	    if(b == attr){
	      result = Regex.matchAll(this.pattern[i][b], data);
	      break;
	    }else{
	    	result=null;
	    }
  	}
  	return result;
}


seven.prototype.tags = function(data) {
	return tagfinder.decomposeHtml(data).tags;
};


String.prototype.clear=function(allowed){
	if(allowed){		
 	 return strip(this,allowed);	
	}else{
	 return strip(this);	
	}

};

module.exports =function(headers){

	if(headers) return new seven(headers);
	else return new seven();

};