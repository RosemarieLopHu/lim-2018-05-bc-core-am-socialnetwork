//Post
const bd = document.getElementById("bd");
const post = document.getElementById("post");
const btnSave = document.getElementById("btnSave");
const selector = document.getElementById("sel");
//Cerrar Sesion
const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
})