const serviceWorkers = {
  getBlobType (blob, url) {
    return url.includes('http://fonts.googleapis.com/css') ?
      // http://stackoverflow.com/questions/2871655/proper-mime-type-for-fonts
      'text/css' :
        url.includes('https://travis-ci.org/noahehall/udacity-trainschedule.svg') ?
          'image/svg+xml' :
            blob.type ?
              blob.type :
                'text/html';
  },
  fakeResponse() {
    return new Response(new Blob(), {
      "status" : 500 , "statusText" : "Sorry, you need to connect to the internet!"
    });
  }
}

export default serviceWorkers;
