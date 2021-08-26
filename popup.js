document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("total", (budget) => {
        console.log(budget);
        if (budget.total) {
            document.getElementById("total").textContent = budget.total;
        }
    });

    chrome.storage.sync.get("limit", (budget) => {
        console.log(budget);
        if (budget.limit) {
            document.getElementById("limit").textContent = budget.limit;
        }
    });

    document.getElementById("spendAmount").addEventListener("click", (e) => {
        e.preventDefault();
        const inputAmount = document.getElementById("amount").value;

        let budgetLimit = 0;

        chrome.storage.sync.get("limit", (budget) => {
            if (budget.limit) {
                budgetLimit += parseInt(budget.limit);
            }
        });

        chrome.storage.sync.get("total", (budget) => {
            let newAmount = 0;

            if (budget.total) {
                newAmount += parseInt(budget.total);
            }

            if (inputAmount) {
                newAmount += parseInt(inputAmount);
            }
            console.log(newAmount, "newAmount", budgetLimit, "budgetLimit");
            if (newAmount <= budgetLimit) {
                chrome.storage.sync.set({ total: newAmount });
                document.getElementById("total").textContent = newAmount;
            } else {
                var notifOptions = {
                    type: "basic",
                    iconUrl: "./icons/icon48.png",
                    title: "Limit Exceeded",
                    message: "Looks like you have entered out of budget amount",
                };
                chrome.notifications.create("resetNotif", notifOptions);
            }

            document.getElementById("amount").value = "";
        });
    });
});
