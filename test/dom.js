var seven = require('../index.js')();
var fs =require('fs');
//seven.play('http://www.pogdesign.co.uk/cat/supernatural-summary',function(err,data,res){
	//fs.readFileSync('data.txt','utf8')
	//console.log(seven.dom(data));

//});

seven.play('http://www.forsky.co/',function(err,data){
	if(err){
		 console.error(err);
	}else{
		var x = seven.matchall(data,'<body>','</body>');
		seven.attrkey({"content":/content=["'](.*?)["']/g});
		var b =seven.attr(x[0],'class');
		var c =seven.tags(x[0]);
		console.log(x[0].clear('a'));
	}
});