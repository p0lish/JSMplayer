chrome.app.runtime.onLaunched.addListener(
    function () {
        chrome.app.window.create('main.html',{
            'bounds':{'width':415,'height':145},
            minWidth: 415, minHeight: 145,
            maxWidth: 415, maxHeight: 800
        });
});