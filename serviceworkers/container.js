/**
 * @file manages all service workers in the client
 * @author @noahedwardhall
 */

if ('serviceWorker' in navigator) {
  function showCommands () {
    document.querySelector('#add').addEventListener('click', () => {
      sendMessage({
        command: 'add',
        url: document.querySelector('#url').value
      }).then(() => {
        // If the promise resolves, just display a success message.
        appFuncs.console()('add worked');
      }).catch((err) => appFuncs.console('error')(err)); // If the promise rejects, show the error.
    });

    document.querySelector('#delete').addEventListener('click', () => {
      sendMessage({
        command: 'delete',
        url: document.querySelector('#url').value
      }).then(() => {
        // If the promise resolves, just display a success message.
        appFuncs.console()('delete cache');
      }).catch((err) => appFuncs.console('error')(err)); // If the promise rejects, show the error.
    });

    document.querySelector('#listcontents').addEventListener('click', () => {
      sendMessage({command: 'keys'})
        .then((data) => {
          const contentsElement = document.querySelector('#contents');
          // Clear out the existing items from the list.
          while (contentsElement.firstChild)
            contentsElement.removeChild(contentsElement.firstChild);


          // Add each cached URL to the list, one by one.
          data.urls.forEach((url) => {
            const liElement = document.createElement('li');
            liElement.textContent = url;
            contentsElement.appendChild(liElement);
          });
        }).catch((err) => appFuncs.console('error')(err)); // If the promise rejects, show the error.
    });

    document.querySelector('#commands').style.display = 'block';
  }

  function sendMessage (message) {
  // This wraps the message posting/response in a promise, which will resolve if the response doesn't
  // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
  // a convenient wrapper.
    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = function (event) {
        if (event.data.error)
          reject(event.data.error);
        else
        resolve(event.data);
      };

    // This sends the message data as well as transferring messageChannel.port2 to the service worker.
    // The service worker can then use the transferred port to reply via postMessage(), which
    // will in turn trigger the onmessage handler on messageChannel.port1.
    // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
      navigator.serviceWorker.controller.postMessage(message,
      [messageChannel.port2]);
    });
  }
  navigator.serviceWorker.addEventListener('message', (event) => {
    appFuncs.console()('event data received');
    appFuncs.console('dir')(event.data);
  });

  navigator.serviceWorker.register('./rootworker.js', {
    scope: './'
  })
    .then(() => navigator.serviceWorker.ready)
  // registration was successful
    .then((reg) => {
      if (reg.installing) {
        const sw = reg.installing;
        sw.postMessage(`installed worker message`);
        appFuncs.console()(`state is installing ${JSON.stringify(sw)}`);
      } else if (reg.waiting) {
        const sw = reg.waiting;
        appFuncs.console()(`state is waiting ${JSON.stringify(sw)}`);
      }

    // reg.installing is now the current worker
      reg.addEventListener('updatefound', () => {
      // whenever sw.state changes
        reg.installing.addEventListener('statechange', () => {
          if (reg.state === 'installed')
            appFuncs.console()(`please refresh your browser! ${JSON.stringify(reg)}`);
        });
      });
    })
    .then(showCommands)
  // registration failed
    .catch((error) => {
      appFuncs.console('error')(`Registration failed: ${error}`);
    });

  // the controlling service worker has changed
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    appFuncs.console()('controller has changed, reload');
    // reload the page if the user has consented, if not ask for permission
    // for some changes (e.g. minor, or security fixes) you may want to force changes to users
    window.location.reload();
  });
} else appFuncs.console('info', true)('Your browser does not offline apps :( try switching to chrome, firefox, or opera');
