var menuItem = {
    id: "spendMoney",
    title: "Spend Money",
    contexts: ["selection"],
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(menuItem);
});

function isInt(value) {
    return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
    );
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        // var newURL =
        //     "chrome-extension://pbbffpopahbceijmhejmipeagoiioenc/options.html";
        // chrome.tabs.create({ url: newURL });
        chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
            console.log(response.farewell);
        });
        if (isInt(clickData.selectionText)) {
            // chrome.tabs.query(
            //     { currentWindow: true, active: true },
            //     function (tabs) {
            //         console.log(tabs[0]["favIconUrl"], "tabs");
            //     }
            // );
            console.log(clickData.selectionText, "sd");
            chrome.storage.sync.get(["total", "limit"], function (budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }

                newTotal += parseInt(clickData.selectionText);
                if (newTotal > budget.limit) {
                    var notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message:
                            "Uh oh, look's like you've reached your alloted limit.",
                    };
                    chrome.notifications.create("limitNotif", notifOptions);
                } else {
                    chrome.storage.sync.set(
                        { total: newTotal },
                        function () {}
                    );
                }
            });
        }
    }
});

// chrome.storage.onChanged.addListener(function(changes, storageName){
//     chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
// });

// chrome.browserAction.onClicked.addListener(function (activeTab) {
//     var newURL = "http://stackoverflow.com/";
//     chrome.tabs.create({ url: newURL });
// });
