/*

The MIT License

Copyright © 2017 by luk3yx

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

this.newPage = function(e) {
    var d = e.originalTarget;
    if (d instanceof HTMLDocument && d.duckDuckBangLoaded != true) {
        d.duckDuckBangLoaded = true;
        var w = d.defaultView;
        if (w.location.href.indexOf('http') == 0) { // Restricted to HTTP
            urls = ["*://www.google.*/search*"          ,
                    "*://encrypted.google.com/search*"  ,
                    "*://*search.yahoo.com/search*"     ,
                    "*://www.ecosia.org/search*"        ,
                    "*://www.bing.com/search*"          ];
            urls = RegExp('^' + urls.join("|").split(".").join("\\.").split("*")
              .join(".*") + '$');
            if (urls.test(w.location.href)) {
                // The script URL
                // It may be controversial to chainload the script this way, but
                // it means that updates can be applied without any reboots,
                // and the script doesn't need to be pasted here.
                var url = "https://cdn.rawgit.com/luk3yx/duckduckbang/master/duckduckbang.js";
                s = d.createElement('script');
                s.setAttribute("src", url);
                d.head.appendChild(s);
            }
        }
    }
}

gBrowser.addEventListener("DOMTitleChanged", this.newPage, true)
gBrowser.addEventListener("DOMLinkAdded", this.newPage, true)
gBrowser.addEventListener("load", this.newPage, true)
