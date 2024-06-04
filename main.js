SEARCH_BUTTON_ID = 'searchButton';
SEARCH_INTERVAL_MS = 30 * 1000;
PROCESSING_DELAY_MS = 5 * 1000;

function requestPermissions() {
  if (Notification.permission === 'granted')
    return;

  const dialog = document.createElement('div');
  const button = document.createElement('button');

  button.innerText = 'Allow notifications';
  button.addEventListener('click', () => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted')
        console.info('Notification permissions granted.');
      else console.warn('Failed to grant permissions.');
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      dialog.remove();
    });
  });

  Object.assign(dialog.style, {
    top: 0,
    zIndex: 1000,
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 30, 50, 0.7)'
  });

  dialog.appendChild(button);
  document.body.appendChild(dialog);
}

(function() {
  requestPermissions();

  const searchButton = document.getElementById(SEARCH_BUTTON_ID);

  if (!searchButton) {
    console.warn('Could not find search button, quitting...');
    return;
  }

  const handleClick = () => {
    setTimeout(() => {
      const table = document.querySelector('tbody');
      const timestamp = new Date().toLocaleTimeString();

      if (!table) {
        console.info(`[${timestamp}] Could not find any results.`);
        return;
      }

      const message = `[${timestamp}] Search returned ${table.childElementCount} results.`;
      console.log(message);

      if (table.childElementCount > 0)
        new Notification(`Found ${table.childElementCount} reservations!`, {
          body: message
        });
    }, PROCESSING_DELAY_MS);
  };

  searchButton.addEventListener('click', handleClick);
  const intervalId = setInterval(() => searchButton.click(), SEARCH_INTERVAL_MS);

  console.info(`Started watcher with id ${intervalId} - will run every ${SEARCH_INTERVAL_MS / 1000} seconds.`);
})();
