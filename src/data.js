//login de usuario existente
const emaiLogin = document.getElementById('emaiLogin');
const passwordLogin = document.getElementById('passwordLogin');
const btnLogin = document.getElementById('btnLogin');
//Cerrar Sesion
const btnLogout = document.getElementById("btnLogout");
//Post
const bd = document.getElementById("bd");
const post = document.getElementById("post");
const btnSave = document.getElementById("btnSave");
const selector = document.getElementById("sel");

//Registro de usuario nuevo
const registerUser = document.getElementById("registerUser");
const btnGoogle = document.getElementById("btnGoogle");
const btnFacebook = document.getElementById("btnFacebook");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnUp = document.getElementById("btnUp");

//cambio de registro a inicio de Sesion
const translateToRegister = document.getElementById('translateToRegister');
const ingresoUser = document.getElementById('ingresoUser');
const translateToIngreso = document.getElementById('translateToIngreso');

let username= document.getElementById('username');
let userImage = document.getElementById('userImage');

let currentUser = {};

translateToRegister.addEventListener('click', ()=>{
  registerUser.classList.remove('show');
  registerUser.classList.add('hiden');
  ingresoUser.classList.remove('hiden')
  ingresoUser.classList.add('show')
});

translateToIngreso.addEventListener('click', ()=>{
  registerUser.classList.add('show');
  registerUser.classList.remove('hiden');
  ingresoUser.classList.add('hiden')
  ingresoUser.classList.remove('show')
});

window.onload = () => {
  verificateUserAuth();
}

const verificateUserAuth = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('logueado');
      firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
        if(snapshot.val()){
          currentUser.uid = snapshot.val().uid;
          currentUser.displayName = snapshot.val().displayName;
          currentUser.photoURL = snapshot.val().photoURL;

          username.innerHTML = `Bienvenida  ${currentUser.displayName}`;

          registerUser.classList.remove("show");
          registerUser.classList.add("hiden");
          
          bd.classList.remove("hiden");
          bd.classList.add("show");
          userImage.src = currentUser.photoURL;

          //posts.classList.remove("hiden");
          login.classList.remove("hiden");
          
          ingresoUser.classList.add('hiden')
          ingresoUser.classList.remove('show')


          listAllPost();

        }else{
          console.log("no hay datos del usuario autenticado");
        }
      });
    }else{
      console.log('No está logueado');
      currentUser = {};
      registerUser.classList.remove("hiden");
      login.classList.add("hiden");
      //posts.classList.add("hiden");
      bd.classList.add("hiden");
    }
  });
}


btnUp.addEventListener('click', ()=>{
  registerVal(email.value, password.value);
});

btnLogin.addEventListener('click', ()=>{
  loginValidation(emaiLogin.value, passwordLogin.value);
});

btnLogout.addEventListener('click', ()=> {
  close();
      console.log('Cerró sesión');
      login.classList.remove("hiden");
      registerUser.classList.add("hiden");
});

btnGoogle.addEventListener('click', ()=>{
  gmailLogin();
})
btnFacebook.addEventListener('click', ()=>{
  facebookLogin();
})

//post
btnSave.addEventListener('click',()=>{
  let post = document.getElementById('post');
  let mensaje = post.value;
  if(mensaje.trim().length == 0){
    alert('Debes ingresar un mensaje!');
    return;
  }
  const isPublic = document.getElementById('sel').value === 'Publico' ? true : false ;
  writeNewPost(currentUser.uid, currentUser.displayName, currentUser.photoURL, mensaje, isPublic, 0);
  post.value = '';
  listAllPost();
});
/*btnUpdate.addEventListener('click',); */

/* const eliminar = () => {
  firebase.database().ref('post');
  eliminar.remove('post/')
  .then(function(){
    console.log('post eliminado')
  })
  .catch(function(error){
    console.log('remove failed'+ error.mensaje)
  })
} */
/*  var db = firebase.database();                   
 var ref = db.ref(); 
 var survey=db.ref(path+'/'+path);    //Eg path is company/employee                
 survey.child(key).remove(); 
  */
/*  //contador de likes
 function toggleStar(postRef, uid) {
  postRef.transaction(function(post) {
    if (post) {
      if (post.likes && post.likes[uid]) {
        post.likesCount--;
        post.likes[uid] = null;
      } else {
        post.likesCount++;
        if (!post.likes) {
          post.likes = {};
        }
        post.likes[uid] = true;
      }
    }
    return post;
  });
}  */
/* let btnLike = document.createElement("input");
btnLike.setAttribute("value", "Like");
btnLike.setAttribute("type", "button");
let cantLikes = document.createElement("label");
cantLikes.setAttribute("for", "");
cantLikes.setAttribute("type", "label");
let contPost = document.createElement('div');
//var textPost = document.createElement('p');
let textPost = document.createElement('textarea');
textPost.setAttribute("id", idDeunpost);
textPost.innerHTML = post.value;
nomUsuario.innerHTML = userNom + "  publicó...";
textPost.disabled = true;
 let contador = 0;
btnLike.addEventListener('click', () => {
     if (userId = 0) {
        console.log("Debe estar logueado");
    }
    else {
        contador++;
        if (contador == 1) {
            cantLikes.innerText = contador;
        }
        else {
            alert("Solo puedes dar 1 like");
        }
     }
}); */
