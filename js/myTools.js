var myTools = myTools || {};

myTools.iframe = myTools.iframe || {};
myTools.iframe.adjust = function(elm){
    elm.height = elm.contentDocument.documentElement.scrollHeight;
    elm.width  = elm.contentDocument.documentElement.scrollWidth;
}

myTools.section = myTools.section || {};
myTools.section.initialize = function(id){
    var parent = document.getElementById(id);

    // HTML全体としての機能説明等を行う場合
    // CSSは引き継がない
    var iframes = parent.getElementsByTagName("iframe");
    for(var ii=0; ii < iframes.length; ii++){
        iframes[ii].onload = function(){
            myTools.iframe.adjust(this);
        };
    }

    // 記事を埋め込みたい場合
    var articles = parent.getElementsByTagName("article");
    for(var ii=0; ii < articles.length; ii++){
        var src = articles[ii].getElementsByTagName("source")[0].src;
        $(articles[ii]).load(src);
    }
}

myTools.document = myTools.document || {};
// 9時間ずれるバグ残ってます。
myTools.document.setLastupdate = function(doc){
    var elm = doc.getElementById("lastupdate");
    if(!elm) return;

    var lastup = new Date(doc.lastModified);
    elm.textContent =
        lastup.getFullYear() + "/" +
        ("0" + (lastup.getMonth()+1)).slice(-2) + "/" +
        ("0" + lastup.getDate()     ).slice(-2) + " " +
        ("0" + lastup.getHours()    ).slice(-2) + ":" +
        ("0" + lastup.getMinutes()  ).slice(-2) + ":" +
        ("0" + lastup.getSeconds()  ).slice(-2);
}
