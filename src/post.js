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

//Eliminar post
firebase.database().ref('users/' + userId).remove({
  username: name,
  email: email,
  profile_picture : imageUrl
}, function(error) {
  if (error) {
    // The write failed...
  } else {
    alert('Se procedió a cancelar la eliminación');
    // Data saved successfully!
  }
});


//Prueba DELETE
const deletePost = () => {
  const fireRef=firebase.database.ref("Users");
  fireRef.remove()
  .then(function(){
    console.log("Borrar Post")
  })
  .catch(function(){
    console.log("Remove failed:"+ error.message)
  })
} 

// likes


// pintar las publicaciones

const listAllPost = () => {
  let data = '';
  let postRef = firebase.database().ref('posts/');
  postRef.on('value', function(snapshot){
    const posts = snapshot.val();
    const postKeys = Object.keys(posts);

    postKeys.forEach( post => {
      
       data += `
                <div class="row justify-content-center hiden postSolo">
                  <div class="col-2">
                    <img id="userImage" src="${posts[post].photoURL}" height="44" width="44" >
                  </div>
                  <div class="col-10">
                    <form action="">
                        <div class="row divTextArea">
                            <textarea  id="post" name="Publicacion" class="form-control input-contrast comment-form-textarea">
                              ${posts[post].mensaje}
                            </textarea>
                        </div>
                        <div class="row divTextAreaActions">
                            <div class="col-12">
                                <input id="btnEditar" type="button" class="btn btn-primary" value="Editar">
                                <input id="btnEliminar" type="button" class="btn btn-primary" value="Eliminar">
                            </div>
                        </div>
                    </form>
                    </div>  
                  </div>  
                  
          `;

    });
    let allPosts = document.getElementById('allPosts');
    allPosts.innerHTML = data;

  });

}
                     
     