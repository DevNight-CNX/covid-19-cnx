// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.11.0/firebase-messaging.js'
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: '354956353010',
  projectId: 'covid-19-cnx',
  apiKey: 'AIzaSyCgcd4bi5rNnpC9Wi4Czqk9lPWFh7Sf7lw',
  appId: '1:354956353010:web:a7040da3fd713c516b5f6b'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => Promise.resolve(payload));
