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
    const txtEmail = $('#txtEmail');
    const txtPassword = $('#txtPassword');
    const btnLogin = $('#btnLogin');
    const btnSignUp = $('#btnSignUp');
    const btnLogout = $('#btnLogout');

    //Add login event
    btnLogin.click(function (e) {
        const email = txtEmail.val();
        const pass = txtPassword.val();
        console.log('Login button clicked');
        console.log('Attempting login with user ' + email);
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    //Add signup event
    btnSignUp.click(function() {
        console.log(`Signup button clicked`)
        //Validate e-mail here ***********************
        const email = txtEmail.val();
        const pass = txtPassword.val();
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.then(user => console.log(user))
        promise.catch(e => console.log(e.message));
    });
    
    //Add logout event
    btnLogout.click(function(e) {
        console.log('Logout button clicked');
        firebase.auth().signOut();
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            $('#btnLogout').removeClass('invisible');
        } else {
            console.log('Not logged in');
            $('#btnLogout').addClass('invisible');
        }
    });

});