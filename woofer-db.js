// TODO Sign into the database anonymously  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyCMatVcOKHiuiGKE7fC4nkSf-bZcdM-eEk',
    authDomain: 'fir-project-mi449.firebaseapp.com',
    databaseURL: 'https://fir-project-mi449.firebaseio.com',
    projectId: 'fir-project-mi449',
    storageBucket: 'fir-project-mi449.appspot.com',
    messagingSenderId: '233214602122'
  }
  firebase.initializeApp(config)
  firebase.auth().signInAnonymously()

  var woofAddButton = document.getElementById('woof-button')

  var getTheDate = Date.now()
// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  // TODO create a new record in Firebase
  firebase.database().ref('woofs').push({
    created_at: getTheDate,
    text: woofText.value
  })
}

// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page. Make
// sure to pass the right parameters (hint: these functions are
// defined in woofer-ui.js).
function readWoofsInDatabase () {
  // TODO read new, changed, and deleted Firebase records
  firebase.database().ref('woofs').on('child_removed', function (delWoofSnap) {
    deleteWoofRow(delWoofSnap.key)
  })
  firebase.database().ref('woofs').on('child_changed', function (changedWoofSnap) {
    updateWoofRow(changedWoofSnap.key, changedWoofSnap.val())
  })
  firebase.database().ref('woofs').on('child_added', function (addedWoofSnap) {
    addWoofRow(addedWoofSnap.key, addedWoofSnap.val())
  })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  // TODO update the record in Firebase
  firebase.database().ref('woofs').child(woofKey).child('text').set(woofText)
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  // TODO delete the record from Firebase
  firebase.database().ref('woofs').child(woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
