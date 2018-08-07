//creación de nuevo post
const writeNewPost = (uid, displayName, photoURL, mensaje, isPublic, likes) => {
  const postData = {
    uid: uid,
    displayName: displayName,
    photoURL: photoURL,
    mensaje: mensaje,
    isPublic: isPublic,
    likes: likes
  };
  // Get a key for a new Post
  let newPostKey = firebase.database().ref().child('posts').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  let updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

// show the post
const listAllPost = () => {
  let data = '';
  let postRef = firebase.database().ref('posts/');
  let user = firebase.auth().currentUser.uid;

  
  
 // let userRef = firebase.database().ref('users/');
  
  postRef.on('value', function(snapshot){
    const posts = snapshot.val();
    /* console.log (posts) */
    const postKeys = Object.keys(posts);
   
     postKeys.forEach( post => {
      if(posts[post].isPublic){    
        data += `
          <div class="row justify-content-center hiden postSolo">
            <figure class="col-2">
              <img id="userImage" src="${posts[post].photoURL}" height="44" width="44" >
            </figure>
            <div class="col-10">
              <form>
                <div class="row divTextArea">
                  <textarea  name="Publicacion" class="form-control input-contrast comment-form-textarea">
                    ${posts[post].mensaje}
                  </textarea>
                </div>
                <div class="row divTextAreaActions">
                  <div class="col-12">
                    <input type="button" class="btn btn-primary" value="Editar">
                    <input onclick ='Eliminar()' type="button" class="btn btn-primary" value="Eliminar">
                    <i class="fas fa-heart" id="hola" onclick="like()" ></i><span id="contador"></span>
                  </div>
                </div>
              </form>
            </div>  
          </div>                 
        `;
        
      }  else {
        if(posts[post].uid===user){ 
          data += `
          <div class="row justify-content-center hiden postSolo">
            <figure class="col-2">
              <img id="userImage" src="${posts[post].photoURL}" height="44" width="44" >
            </figure>
            <div class="col-10">
              <form>
                <div class="row divTextArea">
                  <textarea  name="Publicacion" class="form-control input-contrast comment-form-textarea">
                    ${posts[post].mensaje}
                  </textarea>
                </div>
                <div class="row divTextAreaActions">
                  <div class="col-12">
                    <input type="button" class="btn btn-primary" value="Editar">
                    <input type="button" class="btn btn-primary" value="Eliminar">
                  </div>
                </div>
              </form>
            </div>  
          </div>                 
        `;
        } 
      }
    });
    let allPosts = document.getElementById('allPosts');
    allPosts.innerHTML = data; 
  });

}


/* //Contador de likes (btnLikes)
const btnLikes = document.createElement('i');
const contadorheart = document.createElement('span');
heart.appendChild(contadorheart);
heart.classList.add('fa', 'fa-heart', 'heart');

//evento click del corazón
let contadorComentario = [];
btnLikes.addEventListener('click', ()=> {
  if (btnLikes.classList.toggle('red')){
    contadorComentario++;
  }else{
    contadorComentario--;
  }
  return contadorheart.innerHTML = contadorComentario;
})

//Editar
const edit = document.createElement('i');
edit.classList.add('fas', 'fa-pencil-alt');
//Evento click editar
edit.addEventListener('click', ()=> {
  contenedorElemento.contentEditable = true;
  contenedorElemento.addEventListener('keydown', (event)=> {
    if (event.which == 13){
      let confirmarEditar = confirm('¿Estas seguro que quieres modificar tu comentario?');
      if (confirmarEditar == true) {
        contenedorElemento.removeAttribute('contentEditable');
      }
    }
  })
})

 */
