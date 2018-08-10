expresionCorreo = /\w+@[a-z]+\.+[a-z]/;

<<<<<<< HEAD
const emailValidation = (email,password)=>{
  if (email.trim().length === 0 || password.trim().length === 0) {
    showMessage('dangerMessage', 'Debe de ingresar email y contraseña');
    return;
  }  
  if (!expresionCorreo.test(email)){
    alert('El correo electrónico no es valido'); 
    return;   
  }
  if (password.length<7){
    alert('La contraseña debe ser mayor de 7 caracteres'); 
    return; 
=======
const registroValidation = (email,password)=>{
  if (email.length === 0 || password.length === 0) {
    // showMessage('dangerMessage', 'Debe de ingresar email y contraseña');
    return false;
   }  
   if (!expresionCorreo.test(email)){
   //  alert('El correo electrónico no es valido'); 
   return false;
   }
   if (password.length<7){
   //  alert('La contraseña debe ser mayor de 6 caracteres'); 
   return false;
>>>>>>> f9ca99f269ba0cb71d15a2b13dc11e668639328f
  }
  else {
    //registro(email,password);
    return true; 
  }
}

const emailValidation = (email,password)=>{
  if (email.length === 0 || password.length === 0) {
   // showMessage('dangerMessage', 'Debe de ingresar email y contraseña');
    return false;
  }  
  if (!expresionCorreo.test(email)){
  //  alert('El correo electrónico no es valido'); 
    return false;   
  }
  if (password.length<7){
<<<<<<< HEAD
    alert('La contraseña debe ser mayor de 7 caracteres'); 
    return; 
=======
  //  alert('La contraseña debe ser mayor de 6 caracteres'); 
    return false; 
>>>>>>> f9ca99f269ba0cb71d15a2b13dc11e668639328f
  }
  else {
    //login(email,password);
    return true;
  }
}


window.emailValidation = emailValidation;
window.registroValidation = registroValidation;