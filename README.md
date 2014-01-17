Data does reach the shredding process..

![#](https://nodei.co/npm/seven.png)

## Install

```
npm install seven
```

## Usage

```js
var seven = require('seven');


```
```js
var crop = new seven();
//or
var crop = new seven({ "accept-charset" : "ISO-8859-1,utf-8;q=0.7,*;q=0.3"});

```


```js
crop.play('https://news.ycombinator.com/',function(err,data,res){
	if(err){
    throw err
    }else{
    var post = go.matchall(data,'<td class="title">','</td>');
    var attr =go.attr(post[0],'all'); // ['class','id','href','src','data-*','all']
    go.out({dir:"data.txt",chunk:data,clean:true});
    // or
    go.out("data.txt",data,function(err,succes){
    	if(err) throw err;
        else console.log(succes);
    });
    }

});
```

