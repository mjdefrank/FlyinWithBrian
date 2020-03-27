$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCBA0DrjWi2_vOvZiLR_xlXEZKTrQrrGAo",
        authDomain: "flyin-with-brian.firebaseapp.com",
        databaseURL: "https://flyin-with-brian.firebaseio.com",
        projectId: "flyin-with-brian",
        storageBucket: "flyin-with-brian.appspot.com",
        messagingSenderId: "897225986815"
    };
    firebase.initializeApp(config);
    console.log('Connected to Google Firebase');
    
    //  Initialize firebase database
    const database = firebase.database();

    //Get elements from doc
    const btnLogin = $('#btnLogin');
    const btnSignUp = $('#btnSignUp');
    const btnLogout = $('#btnLogout');
    const saveProfileButton = $('#updateProfileButton');
   
    // Add a realtime listener
    firebase.auth().onAuthStateChanged(function(user) {
        // Logged in
        if (user) {
            var uid = firebase.auth().currentUser.uid;
            console.log(uid);
            // User is signed in.
            var userEmail = user.email;
            console.log('Logged in as ' + userEmail + ' (user ID: ' + uid + ')');
            $('#btnLogout').removeClass('invisible');
            $('#loginForm').addClass('invisible');
            $('#myProfile').removeClass('invisible');
// Populate profile info   
            if ($('#userFirst')) {
                let thisUser = firebase.database().ref('users/'+ uid +'/firstName'.value);
                console.log(thisUser)
            } else {
                console.log('Not on a profile page')
            }
        } else {
            console.log('Not logged in');
            $('#myProfile').addClass('invisible');            
            $('#btnLogout').addClass('invisible');
            $('#loginForm').removeClass('invisible');
        }
    });
 
    //Add signup event
    btnSignUp.click(function(e) {
        e.preventDefault();
        console.log(`Signup button clicked`);
        let email = $('#txtEmail').val();
        let pass = $('#txtPassword').val();
        //TODO validate e-mail
        const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
        promise.catch(function(error) {
            //  Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            //  Log the error to the console.
            window.alert(errorCode + ': ' + errorMessage);
        });
        let userId = firebase.auth().currentUser.uid;
        database.ref('users/' + userId).set({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          userEmail: email,
          myVideos: []
        });
    });

    //Add login event
    btnLogin.click( e => {
        e.preventDefault();
        let email = $('#txtEmail').val();
        let pass = $('#txtPassword').val();
        console.log('Login button clicked');
        console.log('Attempting login with user ' + email);
        window.alert('You\'ve successfully logged in!')
        const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
        promise.catch(function(error) {
            window.alert('There was a problem with your login')
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage);
          });
    });

    //Add logout event
    btnLogout.click(function(e) {
        console.log('Logout button clicked');
        firebase.auth().signOut();
        window.alert('User logged out.')
    });

    // Create function to write data to db
    const saveProfile = function(userFirst, userLast, userPhone) {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).set({
          firstName: userFirst,
          lastName: userLast,
          phoneNumber: userPhone
        });
      }

    // Add update profile event
    saveProfileButton.click(function() {
        userFirstName = $('#userFirst').val();
        userLastName = $('#userLast').val();
        userPhoneNumber = $('#phoneNumber').val();
        console.log('"Save Profile" button clicked');
        console.log(userFirstName);
        console.log(userLastName);
        console.log(userPhoneNumber);
        saveProfile(userFirstName, userLastName, userPhoneNumber);
    });
});