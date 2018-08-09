//Llamando datos del firebase
let currentUser = {};

window.onload = () => {
    verificateUserAuth();
}
//Verificacion de autenticacion de usuario
const verificateUserAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
                if(snapshot.val()){
                    currentUser.uid = snapshot.val().uid;
                    currentUser.displayName = snapshot.val().displayName;
                    currentUser.photoURL = snapshot.val().photoURL;

                    let userImage = document.getElementById('userImage');
                    userImage.src = currentUser.photoURL;

                    listAllPost();
                }else{
                    console.log("no hay datos del usuario autenticado");
                }
            });
        }else{
            location.href = 'index.html';
        }
    }); 
};
//compartir
const btnSave = document.getElementById("btnSave");
if(btnSave){
    btnSave.addEventListener('click',()=>{
        let post = document.getElementById('post');
        let mensaje = post.value;
        if(mensaje.trim().length == 0){
            alert('Debes ingresar un mensaje!');
            return;
        }
        const isPublic = document.getElementById('sel').value === 'Publico' ? true : false ;
        writeNewPost(currentUser.uid, currentUser.displayName, currentUser.photoURL, mensaje.trim(), isPublic, 0);
        post.value = '';
    });
}

//creación de nuevo post
const writeNewPost = (uid, displayName, photoURL, mensaje, isPublic, likes) => {
    const postData = {
      uid: uid,
      displayName: displayName,
      photoURL: photoURL,
      mensaje: mensaje,
      isPublic: isPublic,
      likes: 0
    };  
    // Get a key for a new Post
    let newPostKey = firebase.database().ref().child('posts').push().key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    firebase.database().ref().update(updates);
    listAllPost();
}

//creación de nuevo post
const editar = (userUid, postUid) => {
    if (confirm('¿Estas Seguro de Editar tu publicación?')){
        let updates = {};
        updates['/posts/' + postUid+"/mensaje"] = document.getElementById('post-'+postUid).value;
        updates['/user-posts/' + userUid + '/' + postUid+"/mensaje"] = document.getElementById('post-'+postUid).value;
        firebase.database().ref().update(updates);
        listAllPost();
    }else {
        console.log('Se procedió a cancelar la edicion');
    }
}
//Likes
const updateLikes = (userUid, postUid) => {
    let like = parseInt(document.getElementById('like-'+postUid).innerHTML);
    let likeUpdate = like + 1;
    let updates = {};
    updates['/posts/'+postUid+'/likes'] = likeUpdate; 
    updates['/user-posts/'+userUid+'/'+postUid+'/likes'] = likeUpdate; 
    firebase.database().ref().update(updates);
    listAllPost();
}
//eliminar
const eliminar = (userUid, postUid) => {
    if (confirm('¿Estas Seguro de Eliminar tu publicación?')){
        firebase.database().ref().child('/posts/' + postUid).remove();
        firebase.database().ref().child('/user-posts/' + userUid + '/' + postUid).remove();
        listAllPost();
    }else{
       console.log('Se procedió a cancelar la eliminación');
    }
}
//imprimir publicaciones
const listAllPost = () => {
    let data = '';
    let postRef = firebase.database().ref('posts/');
    let user = firebase.auth().currentUser.uid;
    postRef.on('value', function(snapshot){
        let allPosts = document.getElementById('allPosts');
        const posts = snapshot.val();
        if(posts){
            
            const postKeys = Object.keys(posts);
            postKeys.forEach( (post, index) => {
                if(posts[post].isPublic){
                data += `
                <div class="row justify-content-center postSolo">
                <div class="col-2">
                <img id="userImage" src="${posts[post].photoURL}" class="img-user-image float-right" >
                </div>
                <div class="col-10">
                <form action="">
                    <div class="row divTextArea">
                        <textarea disabled id="post-${postKeys[index]}" name="Publicacion" class="form-control input-contrast comment-form-textarea">${posts[post].mensaje}</textarea>
                    </div>
                    <div class="row divTextAreaActions">
                        <div class="col-6 div-actions">
                            <span class="d-inline-block" onclick="updateLikes('${currentUser.uid}','${postKeys[index]}')">
                                <img id="userImage" src="img/like32.png" height="32" width="32" class="d-inline-block">
                                <div id="like-${postKeys[index]}" class="d-inline-block">${posts[post].likes}</div>
                            </span>
                        </div>
                        <div class="col-6 div-actions">
                            ${ posts[post].uid === currentUser.uid ? `
                            <input id="btnEliminar" type="button" class="float-right btn btn-primary button-action-eliminar" value="Eliminar" onClick="eliminar('${currentUser.uid}','${postKeys[index]}')">
                            <input id="btnEditar" type="button" class="float-right btn btn-primary button-action-editar" value="Editar" onClick="editar('${currentUser.uid}','${postKeys[index]}')">
                            ` : '' }
                        </div>
                    </div>
                </form>
                </div>  
                </div>   
                    `;
        
                } else {
                    if(posts[post].uid===user){ 
                        data += `
                        <div class="row justify-content-center postSolo">
                        <div class="col-2">
                        <img id="userImage" src="${posts[post].photoURL}" class="img-user-image float-right" >
                        </div>
                        <div class="col-10">
                        <form action="">
                            <div class="row divTextArea">
                                <textarea disabled id="post-${postKeys[index]}" name="Publicacion" class="form-control input-contrast comment-form-textarea">${posts[post].mensaje}</textarea>
                            </div>
                            <div class="row divTextAreaActions">
                                <div class="col-6 div-actions">
                                    <span class="d-inline-block" onclick="updateLikes('${currentUser.uid}','${postKeys[index]}')">
                                        <img id="userImage" src="img/like32.png" height="32" width="32" class="d-inline-block">
                                        <div id="like-${postKeys[index]}" class="d-inline-block">${posts[post].likes}</div>
                                    </span>
                                </div>
                                <div class="col-6 div-actions">
                                    ${ posts[post].uid === currentUser.uid ? `
                                    <input id="btnEliminar" type="button" class="float-right btn btn-primary button-action-eliminar" value="Eliminar" onClick="eliminar('${currentUser.uid}','${postKeys[index]}')">
                                    <input id="btnEditar" type="button" class="float-right btn btn-primary button-action-editar" value="Editar" onClick="editar('${currentUser.uid}','${postKeys[index]}')">
                                    ` : '' }
                                </div>
                            </div>
                        </form>
                        </div>  
                        </div>   
                    `;
                    } 
                  }
            });
            allPosts.innerHTML = data;
        
        }else {
            allPosts.innerHTML = 'No hay posts ;(';
        }
    });
  }
 
 