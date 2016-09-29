// Credit to http://stackoverflow.com/questions/6643410/pick-random-value-from-associated-array-using-javascript
function randomKey(obj) {
    var ret;
    var c = 0;
    for (var key in obj)
        if (Math.random() < 1/++c)
           ret = key;
    return ret;
}

proxyXHR.get('https://rawgit.com/joshisa/pleonasm/master/chrome/data/quotes.json' ).onSuccess(function (data) {
  var quotes=JSON.parse(data);
  var selection=quotes[randomKey(quotes)];
  var bq = document.createElement('blockquote');
  bq.style="text-align:center;margin:0px;";

  var para = document.createElement('p');
  para.style="color: #4863a0 ; font-size: 24px ; font-weight: bold";
  para.innerHTML=selection.quote;

  var tilda = document.createElement('span');
  tilda.id="tilda";
  tilda.innerHTML="~";

  tilda.addEventListener("click", function(e) {
    window.location.hash = 'pleonasm=burningfire';
    var regex = /(.*)\.(ng.bluemix.net|ibm.com)/;
    newurl = window.location.hostname.replace(regex, function(match, $1, $2, offset, original) { 
      var goldensubdomain = "cdsx";
      var prefix = "[Unexpected Surprise]] ";
      if ($1 !== goldensubdomain && $1 !=="apsportal") {
        console.warn(prefix + "With a subdomain of: " + $1 + " ... cross domain problems lie ahead if we don't act to fix 'em");
        document.location = window.location.href.replace("new-console", goldensubdomain).replace("console", goldensubdomain);
      } else {
        console.warn(prefix + " No hostname modifications performed.");
      }
      return window.location.href;
    });
    
    if (window.location.hostname.indexOf("cdsx") !== -1) {
      window.location.reload(true);
    } else if (window.location.hostname.indexOf("apsportal") !== -1){
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
          var kernel = localStorage.kernel;
          var re = /https:\/\/.*\.(ng.bluemix.net|ibm.com)\/(data|analytics)\/notebooks\/[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}(\?tenant=|\/view\?projectid=).*/;
          if (re.test(location.href)) { 
            notebookContainer = document.getElementsByClassName("notebookContainer")[0];
            notebookContainer.insertBefore(bq, notebookContainer.firstChild);
            if (window.location.hash === "#pleonasm=burningfire") {
              console.warn(prefix + "It looks like your notebook is having trouble. Let me help you ;-)");
              iframe = document.getElementById('guest');
              chrome.storage.sync.get({
                kernelAction: 'restart_run_all',
              }, function(items) {
                   console.warn(items.kernelAction);
                   kernelmenu = iframe.contentWindow.document.getElementById(items.kernelAction); 
                   // Easter Egg.  Pick the poison.  I'll go with restart and run all which works well in 
                   kernelmenu.click();
              });
            }
          }
        }
      }, 15);
  });
});
