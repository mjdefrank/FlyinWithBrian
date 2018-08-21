(function() {
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
    
    //Set firebase auth var
    const auth = firebase.auth();

    //Get elements from doc
    const userEmail = $('#user').val().trim();
    const userPass = $('#pass').val().trim();
    const loginButton = $('#loginButton');
    const signupButton = $('#signUpButton');
    const logoutButton = $('#signupButton)');

    //Add login event
    loginButton.click(function () {
        const email = userEmail;
        const pass = userPass;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    //Add signup event
    signupButton.click(function() {
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
        } else {
            console.log('Not logged in');
        }
    });

    //Add logout event
    logoutButton.click(function() {
        firebase.auth().signOut();
    });
})