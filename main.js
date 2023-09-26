(function init() {
    const intervalMs = 30_000;
    const clickProcessingDelayMs = 5_000;
    const searchButton = document.querySelector('#searchButton');

    if (!searchButton) {
        console.log("Could not find search button, quitting.");
        return;
    }

    const handleClick = () => {
        setTimeout(() => {
            const table = document.querySelector('tbody');

            if (!table) {
                console.log(`[${new Date().toLocaleTimeString()}] Could not find any results.`);
                return;
            }
    
            new Notification("Found reservation", { body: `Search returned ${table.childElementCount} results.` });
        }, clickProcessingDelayMs);
    };

    const handleInterval = () => {
        searchButton.click();
    }

    searchButton.addEventListener('click', handleClick);
    const intervalId = setInterval(handleInterval, intervalMs);

    console.log(`Started watcher with id ${intervalId}, running every ${intervalMs / 1000} s.`);
})();
