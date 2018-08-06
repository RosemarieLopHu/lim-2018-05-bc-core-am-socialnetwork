// Initialize Firebase
const config = {
    apiKey: "AIzaSyDlyPsTR7Jo4y0aSUIipN_NooO8HtqJexY",
    authDomain: "fir-c6242.firebaseapp.com",
    databaseURL: "https://fir-c6242.firebaseio.com",
    projectId: "fir-c6242",
    storageBucket: "fir-c6242.appspot.com",
    messagingSenderId: "482129686898"
  };
  firebase.initializeApp(config);
//Obteniendo elementos de index html
// Login Form Inicia sesión
const emaiLogin = document.getElementById('emaiLogin');
const passwordLogin = document.getElementById('passwordLogin');
const btnLogin = document.getElementById('btnLogin');
const btnFacebook = document.getElementById('btnFacebook');
const btnGoogle = document.getElementById('btnGoogle');
// Sign Up form Registro
const emailForm = document.getElementById('emailForm');
const passwordForm = document.getElementById('passwordForm');
const btnUp = document.getElementById('btnUp');

// Agregando evento al logueo
btnLogin.addEventListener('click', e =>{
    //obteniendo el correo (mail) y contraseña(pass)
    const txtEmail = emaiLogin.value;
    const pass = passwordLogin.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(txtEmail,pass);
    promise.catch(e => console.log(e.message));
});

// Agregando el evento de Registro (signup)
btnUp.addEventListener('click', e => {
    //obteniendo el correo (mail) y contraseña(pass)
    const email = emailForm.value;
    const password = passwordForm.value;
    const auth = firebase.auth();
    //ingresando
    const promise =  auth.signInWithEmailAndPassword(email,password);
    promise
/*     .then(uset => console.log(user))
 */    .catch(e => console.log(e.message));
});
// Agregando el realtime listener

firebase.auth().onAuthStateChanged(firebase => {
    if (firebaseUser){
        console.log(firebaseUser);
    }else{
        console.log('No iniciaste sesión')
    }
})
//Ingreso con facebook
var provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  //login google
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
/* const registerVal = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        alert('confirma tu correo electronico')
         const user = {
           uid: result.user.uid,
           displayName: result.user.email,
           email: result.user.email,
           photoURL: 'https://freeiconshop.com/wp-content/uploads/edd/chef-outline.png',
         }
        console.log(user);
        writeUserData(user);
        verificar();
    }).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      });
  };
  
  const ingresoVal = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      loginValidacion();
    })
    .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert('Error en firebase >'+ errorCode);
    alert('Error en firebase >'+ errorMessage);
    });
  };
  
  const close = () => {
      firebase.auth().signOut()
      .then(()=>{
        alert('Saliendo...');
      }).catch((error) => {
        console.log(error);
      });
  };
  
  const verificar = () => {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
      alert('enviando correo');
    }).catch((error) => {
      console.log(error);
    });
  };
  
  const facebookLogin = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
    'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        writeUserData(user);
    }).catch((error)=> {
      alert('err'+error.message);
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
  });
  };
  
  const gmailLogin = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result)=> {
      var user = result.user;
      writeUserData(user);
    });
  };
  
  // guardando los datos en database
  const writeUserData = (user) => {
    firebase.database().ref('users/' + user.uid).set(user);
  } */