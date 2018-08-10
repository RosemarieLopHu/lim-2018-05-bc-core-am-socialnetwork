const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockdatabase = new firebasemock.MockFirebase();
mockdatabase.autoFlush();
mockauth.autoFlush();

/* global.firebase = firebasemock.MockFirebaseSdk(
  path => (path ? mockdatabase.child(path) : mockdatabase),
  () => mockauth,
);
 */


// cuando usamos un mock, ya no necesitamos configurar ni firebaseAdmin
// ni un entorno distinto para testeo, toda la logica de firebase se
// ejecuta a traves de su mock (impostor)
