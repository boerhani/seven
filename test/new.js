var seven = require('../index.js');

var go = seven();

Array.prototype.chunk = function(chunkSize) {
    var array=this;
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
}

go.play('http://www.pogdesign.co.uk/cat/new-girl-summary',function(err,data,res){
	go.patkey({"itemprop":/itemprop=["'](.*?)["']/g});
	go.patkey({"content":/content=["'](.*?)["']/g});
	console.log(go.attr(data,'content'));
	
})
