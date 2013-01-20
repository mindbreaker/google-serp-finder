# Google SERP Finder
The Google [SERP](http://en.wikipedia.org/wiki/Serp) Finder is a node.js-based position finder for your domain.
With this tool you can determine the position of a domain for a spesific keyword in the Google top 100 result pages.
This tool is only for testing some node.js, parsing and javascript stuff. Don't use this in production. Use the official [Google Search API](https://developers.google.com/custom-search/v1/overview) instead.

## Installation

For this tool you'll need to install node.js on your system. Please check out the [offical website](http://nodejs.org/) and download the node.js setup files.

First of all clone this repository with

```
git clone git://github.com/mindbreaker/google-serp-finder.git
```

Alternativly you can click on the "ZIP" Button to download the repository without git.

Switch into the downloaded git folder and run npm install to install all the dependencies of this tool

```
cd google-serp-finder
npm install
```

### Dependencies

Google SERP Finder use this modules and versions:

* express: "3.0.3",
* ejs: "*",
* request: "2.x",
* jsdom: "0.x"

If you have trouble with npm install jsdom, follow [this guide](http://www.steveworkman.com/node-js/2012/installing-jsdom-on-windows/) to install jsdom and python on windows.

## Usage

After the setup process, you can run your node server with:

```
node app.js
```

### Webinterface

The nodejs server connects by default to port 3000. You can access the Webinterface with:

```
localhost:3000
```

In order to find out, weather a domain is ranked with a specific keyword under the top 100 google results, type in the keyword, the domain and press ``Search``

If your domain is under the top 100, the Google Serp Finder will return the complete ranked URL.

### REST-API

There is also a resource available you can interact with. Send a POST-Request to the route ``/search`` with ``keyword`` and ``domain``.
This request will trigger this JSON Object as a response:

``` json
{
  position: 0,
  domain: "http://example.org/test.html"
}
```

Position 0 means: Site is not under the top 100 of Google Serp



## How it works

The Google SERP Finder works without the Google Search API. This is more a Page scraper. The node-server has several tasks tasks to execute in order to get the google position of a domain:

* Getting the 100 Google search results with this query ``http://www.google.com/search?num=100&complete=0&q=``
  It is important to turn off the google suggestion with ``complete=0`` off, to get the result page
* With jsdom it is possible to parse the HTML-Content of the result page. A problem will be, that the URL's on the result page are not plain text. You cannot use the green colored URL under the Page-Title, because if this URL is to long, Google will truncate it. An other solution to work with would be the URL of the linked title. But wait, if you look into the source code, there is no direct link to the result site:
``` html
<a href="/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;sqi=2&amp;ved=0CDQQFjAA&amp;url=https%3A%2F%2Fgithub.com%2F&amp;ei=trT6UKeKPMWVtQbew4CoBA&amp;usg=AFQjCNH3ZL3XV5BXG7wkswWu5GxjTFtoJg&amp;bvm=bv.41248874,d.Yms" class="l" onmousedown="return rwt(this,'','','','1','AFQjCNH3ZL3XV5BXG7wkswWu5GxjTFtoJg','','0CDQQFjAA','','',event)"><em>GitHub</em> · Build software better, together.</a>
```
The URL is send to the ``/url`` route as a url-encoded get parameter `url=https%3A%2F%2Fgithub.com`
To get the URL i use this regular expression 
``` javascript
/url\?q=(\S+)&sa=/
```
* These URLs are saved in an array. After getting and parsing the content, i iterate with an each through the urls and compare if the url contains the domain.

## Things I've learned

* Node.js, Express.js, response and jsdom
* It will take time to run node and jsdom under a windows environment
* Structured jQuery
* Google request / response
* Parsing and regex
* It costs time to write docu

## Future Work

* Support SERP in different languages (current: en-En)
* Support more than 100 search results
* Support bulk requests for a list of domains and keywords

## Contributing
Feel free for contributing.

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Copyright
Copyright (c) 2013 Thomas Czernik
This project is under the [MIT Licence](LICENSE.md).
© 2012 Google Inc. All rights reserved. Google and the Google Logo are registered trademarks of Google Inc.
