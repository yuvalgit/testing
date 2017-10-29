var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
const async = require('async');
const request = require('request');

app.listen((process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/bing', function (req, res) {
console.log("bing search");
console.log("GetPhoto");
    var bing_query = query.split(" ").join("+"); 
    var title = query.split("of");  
    var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://www.bing.com/images/search?q=" + bing_query;
    request(url, function (error, response, body) {
    if (!error) {
    var $ = cheerio.load(body, { decodeEntities: false }); 
    var parse = $.html().substring($.html().indexOf("class=\"item\">") + 0);
    var cut = parse.substring(parse.indexOf("href=\"") + 0).replace("href=\"","");
    mparsed =  cut.substring(0, cut.indexOf('\"'));
        try {
        return res.json({
    messages: [
        {           
          attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: [{
                    title: title[1], 
                    image_url: mparsed,
              
        }]
            }
        }
    }
]
        });
    
    } catch (err) {
        console.error("Can't process request");

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
}

  } else {
        try {
        return res.json({
    messages: [
        {           
    text: "Sorry champ, can't process request"
    }
]
        }); 
    } catch (err) {
        console.error("Can't process request");

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
}   
  }
});
});
}

app.post('/testing', function (req, res) {
    console.log("testing interactbot");                                                                                        
    try {
        return res.json([
        {
    text: "Hello from heroku"
    }
    ])} catch (err) {
        console.error("Can't process request");

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
}
});

app.post('/youtube', function (req, res) {
    console.log("YouTubeQuery");                                                                                        
search_string = req.url.replace('/youtube/?q=','').replace("%20"," ");    
var request = require("request"),                                                                                   
    cheerio = require("cheerio"),                                                                                       
    url = "https://www.youtube.com/results?search_query=" + search_string + "&page=1";                                  
    console.log("request" + search_string);                                                                             
    request(url, function (error, response, body) {                                                                     
    if (!error) {                                                                                                       
    var $ = cheerio.load(body, { decodeEntities: false });                                                              
    var parse = $.html().substring($.html().indexOf("watch?v=") + 0);                                                   
    var quote = parse.replace(/"/g,'');                                                                                 
    mparsed =  quote.substring(0, quote.indexOf('class='));                                                             
    var image_url = "http://img.youtube.com/vi/" + mparsed.replace("watch?v=","").trim() + "/0.jpg";                    
    console.log("youtube video " + mparsed);                                                                            
    console.log("Image URL"+ image_url);                                                                                
        try {                                                                                                           
        return res.json([                                                                                               
        {                                                                                                               
    attachment:{                                                                                                            
    type:"template",                                                                                    
    payload:{                                                                                           
    template_type:"generic",                                                                        
    elements:                                                                                       
    [                                                                                               
                                                                                                                      
    {                                                                                                           
    image_url:image_url,
    title:search_string,
    buttons:[
    {
    type:"web_url",
    title: "Watch video",
    url: "http://www.youtube.com/embed/"+mparsed.replace("watch?v=","").trim() + "?autoplay=1"
                }
            ]
            }
                        ]
                    }
                }
    }
]
        );

    } catch (err) {
        console.error("Can't process request");

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
}
  } else {
        try {
        return res.json([
        {
    text: "Sorry can't process request"
    }
]
        );
    } catch (err) {
        console.error("Can't process request");

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
}
  }
});
});


app.get('/async', function (req, res) {
console.log("async test");
function httpGet(url, callback) {
  const options = {
    url :  url,
    json : true
  };
  request(options,
    function(err, res, body) {
      callback(err, body);
    }
  );
}

const urls= [
  "https://raw.github.com/mikeal/request/master/package.json",
  "https://raw.github.com/mikeal/request/master/package.json",
  "https://raw.github.com/mikeal/request/master/package.json"
];

function done(error, result) {
  if (error) return console.log(error);
  console.log(result);
}

async.map(urls, httpGet, done); 

});
