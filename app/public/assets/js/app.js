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
    
    //Get elements from doc
    const btnLogin = $('#btnLogin');
    const btnSignUp = $('#btnSignUp');
    const btnLogout = $('#btnLogout');
   
    // Add a realtime listener
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var userEmail = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log('Logged in as ' + userEmail);
            $('#btnLogout').removeClass('invisible');
            $('#loginForm').addClass('invisible');
            $('#myProfile').removeClass('invisible');            
            // ...
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
        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            //Log the error to the console.
            window.alert(errorCode + ': ' + errorMessage);
        });
    });

    //Add login event
    btnLogin.click( e => {
        e.preventDefault();
        let email = $('#txtEmail').val();
        let pass = $('#txtPassword').val();
        console.log('Login button clicked');
        console.log('Attempting login with user ' + email);
        //
        const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
        promise.catch(function(error) {
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
    });
});