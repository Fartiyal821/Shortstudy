// Firebase initialization and safe form handlers
// Paste your Firebase config and safely attach submit handlers when forms exist on the page.
const firebaseConfig = {
  apiKey: "AIzaSyDcqZLYEKhoX4uTiXDKLqqy2VKtHzgi9dg",
  authDomain: "shortstudy-f634b.firebaseapp.com",
  projectId: "shortstudy-f634b",
  storageBucket: "shortstudy-f634b.firebasestorage.app",
  messagingSenderId: "834683520569",
  appId: "1:834683520569:web:be74c75eb8adf3fbd46fe8",
  measurementId: "G-MYMZBTE875"
};

function initFirebaseSafe() {
  if (!window.firebase) {
    console.warn('Firebase SDK not loaded. Skipping initialization.');
    return null;
  }
  try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    return firebase.database();
  } catch (e) {
    console.warn('Firebase init error', e);
    return null;
  }
}

const database = initFirebaseSafe();

// Default course id (override per-page if needed)
const currentCourseId = "html-course";

function safeAttachFormHandler(formId, getPayload) {
  if (!database) return;
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const payload = getPayload();
    database.ref('courses/' + currentCourseId).set(payload, function (error) {
      if (!error) {
        try { alert('बधाई हो भाई! लिंक लाइव अपडेट हो गया है।'); } catch (e) {}
      } else {
        console.error('Firebase write error', error);
      }
    });
  });
}

// Attach to known host forms if present
safeAttachFormHandler('courseForm', () => ({ videoLink: (document.getElementById('youtubeLink') || {}).value || '' }));
safeAttachFormHandler('adminForm', () => ({ videoLink: (document.getElementById('youtubeLink') || {}).value || '' }));
safeAttachFormHandler('affiliateForm', () => ({ videoLink: (document.getElementById('productVideo') || {}).value || '' }));
safeAttachFormHandler('notesForm', () => ({ videoLink: (document.getElementById('embeddedText') || {}).value || '' }));

// Expose helpers for pages that want to set a custom course id
function setCurrentCourseId(id) {
  if (typeof id === 'string' && id.trim()) {
    window.currentCourseId = id;
  }
}
