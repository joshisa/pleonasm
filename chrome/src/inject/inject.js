// Credit to http://stackoverflow.com/questions/6643410/pick-random-value-from-associated-array-using-javascript
function randomKey(obj) {
    var ret;
    var c = 0;
    for (var key in obj)
        if (Math.random() < 1/++c)
           ret = key;
    return ret;
}

var quotes = new Array(2);
quotes['one']={quote:"“The best way out is always through.” ", author:"Robert Frost"}
quotes['two']={quote:"“Perseverance is not a long race; it is many short races one after the other” ", author: "Walter Elliot"}
quotes['three']={quote:"“Without a struggle, there can be no progress.” ", author:"Frederick Douglass"}
quotes['four']={quote:"“You can have data without information, but you cannot have information without data.” ", author:"Daniel Keys Moran"}
quotes['five']={quote:"“If I don't like the shape of the world around me, then I shape the world around me.” ", author:"Sanjay Joshi"}
quotes['six']={quote:"“When you come to a fork in the road, take it.” ", author:"Yogi Berra"}

var selection=quotes[randomKey(quotes)];

var bq = document.createElement('blockquote');
bq.style="text-align:center;line-height:0px;margin:0px;";

var para = document.createElement('p');
para.style="color: #4863a0 ; font-size: 24px ; font-weight: bold";
para.innerHTML=selection.quote;

var tilda = document.createElement('span');
tilda.id="tilda";
tilda.innerHTML="~";

tilda.addEventListener("click", function(e) {
  window.location.hash = 'pleonasm=burningfire';
  var regex = /(.*)\.ng.bluemix.net/;
  newurl = window.location.hostname.replace(regex, function(match, $1, $2, offset, original) { 
    var goldensubdomain = "cdsx";
    var prefix = "[Unexpected Surprise]] ";
    console.log(window.location.href);
    if ($1 !== goldensubdomain) {
      console.warn(prefix + "With a subdomain of: " + $1 + " ... cross domain problems lie ahead if we don't act to fix 'em");
      document.location = window.location.href.replace("console", goldensubdomain);
    }
    return window.location.href;
  });
  
  if (window.location.hostname.indexOf("cdsx") !== -1) {
    window.location.reload(true);
  } else {
    window.location.assign(newurl);
  }
}, false);

var author = document.createElement('span');
author.id="author";
author.innerHTML=selection.author;

para.appendChild(tilda);
para.appendChild(author);
bq.appendChild(para);

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        var prefix = "[Unexpected Surprise]] ";
        var re = /https:\/\/.*\.ng.bluemix.net\/data\/notebooks\/[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}\?tenant=.*/;
        if (re.test(location.href)) { 
          notebookContainer = document.getElementsByClassName("notebookContainer")[0];
          notebookContainer.insertBefore(bq, notebookContainer.firstChild);
          if (window.location.hash === "#pleonasm=burningfire") {
            console.warn(prefix + "It looks like your notebook is having trouble. Let me help you ;-)");
            iframe = document.getElementById('guest');
            // Weird timing bug .. but seems like writing out to console allows the right wait for the iframe to load
            console.warn("Found the notebook iframe: " + iframe);
            restart_run_all = iframe.contentWindow.document.getElementById('restart_run_all');
            // Easter Egg.  Pick the poison.  I'll go with restart and run all which works well in 
            restart_run_all.click();
          }
        }
      }
    }, 15);
});
