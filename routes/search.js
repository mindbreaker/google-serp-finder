var jsdom = require('jsdom'),
    request = require('request');

/*
 * GET users listing.
 */

exports.find = function(req, res) {
    var keyword = req.param('keyword');
    var domain = req.param('domain');
    getGoogle(keyword, domain, res);
   
};

exports.info = function(req, res) {
    res.send("Use POST /search/ <br /> with: :domain and :keyword");
};



/* 
 * Get the search result pages from google
 */

function getGoogle(keyword, domain, res) {
  request('http://www.google.com/search?num=100&complete=0&q=' + keyword, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        parseHTML(body, domain, res); 
    }
  });
}

/*
 * Parse the HTML of the serp page and extract the urls
 */

function parseHTML(content, domain, res) {
  var result_urls = [];
  jsdom.env({
    html: content,
    scripts: [
      'http://code.jquery.com/jquery-1.5.min.js'
    ]
    }, function (err, window) {
      var $ = window.jQuery;

      // jQuery is now loaded on the jsdom window created from 'agent.body'
      $('h3.r a').each(function() {
        var url = $(this).attr("href").match(/url\?q=(\S+)&sa=/);
        if(url) {
            result_urls.push(url[1]);
        }
      });
        var position = findUrl(domain, result_urls);
        var response_json = ({
            position: position,
            domain: domain
        });
        res.send(response_json);
        res.end();
  });
}

function findUrl(domain, urls) {
  var counter = 1;
  var position = 0;
  var found = false;

  urls.forEach( function(item) {
    if(item.search(domain) >= 0 && !found) {
      found = true;
      position = counter;
    }
    counter++;
  });

  if(found)
    return position;   
  else
    return 0;
}