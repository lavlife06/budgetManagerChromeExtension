document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("limit", function (budget) {
        console.log(budget, "budget limit");
        if (budget.limit) {
            document.getElementById("limit").value = budget.limit;
        }
    });

    document.getElementById("saveLimit").addEventListener("click", () => {
        let theLimit = document.getElementById("limit").value;
        if (theLimit) {
            chrome.storage.sync.set({ limit: theLimit }, function () {
                close();
            });
        }
    });
    document.getElementById("resetTotal").addEventListener("click", () => {
        chrome.storage.sync.set({ total: 0 }, function () {
            console.log("inside resetTotal");
            var notifOptions = {
                type: "basic",
                iconUrl: "./icons/icon48.png",
                title: "Resetting Total",
                message: "Total has been reset to 0.",
            };
            chrome.notifications.create("resetNotif", notifOptions);
        });
    });
});
