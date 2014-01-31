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

Array.prototype.remByVal = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}

go.play('http://www.pogdesign.co.uk/cat/supernatural-summary',function(err,data,res){
	var p =go.matchall(data,'<div itemprop="season" itemscope itemtype="http://schema.org/TVSeason" >','</div>');

	go.attrkey({"itemprop":/itemprop=["'](.*?)["']/g});
	go.attrkey({"content":/content=["'](.*?)["']/g});
	var keys = go.attr(p[0],'content');
		keys=keys.remByVal(keys[0]).chunk(5);
	console.log(keys);
	//go.out({dir:"data.txt",chunk:data});
	
})
