const firebase = require('firebase');
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
    
    //Set firebase auth var
    const auth = firebase.auth();

    //Get elements from doc
    const userEmail = $('#user').val();
    const userPass = $('#pass').val();
    const loginButton = $('#loginButton');
    const signupButton = $('#signUpButton');
    // const logoutButton = $('#logoutBtn)');

    //Add login event
    loginButton.click(function () {
        console.log(userEmail);
        console.log(userPass);
        console.log('Login button clicked');
        console.log('userEmail is ' + userEmail);
        const email = userEmail.toString().trim();
        const pass = userPass.toString().trim();
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    //Add signup event
    signupButton.click(function() {
        console.log(`Signup button clicked`)
        //Validate e-mail here ***********************
        const email = userEmail;
        const pass = userPass;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.then(user => console.log(user))
        promise.catch(e => console.log(e.message));
    });

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            $('#logoutButton').classList.remove('invisible');
        } else {
            console.log('Not logged in');
        }
    });

    //Add logout event
    $('#logoutButton').click(function() {
        console.log('Logout button clicked');
        firebase.auth().signOut();
    });
});