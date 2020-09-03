
  
function sign(){
    var user = firebase.auth().currentUser;
    if (user != null) {
        name = user.displayName;
        uid = user.uid;
        console.log(uid);
   
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    var userName = document.getElementById("name_field").value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
           var database = firebase.database();
           var ref = database.ref("user").child("useruid");
           var data = {
               uid: uid,
               userName: userName
           }
           ref.push(data);
        console.log(data);
        console.log(userName);
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }};

function login(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(user => {
        window.location = 'index.html';
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        console.log(uid);
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
              window.location = 'login.html'; 
            }
          });
    }).catch(error => {
        var hata = document.getElementById("hata");
        $("#hata").show("slow");
        console.log(error);
    })}

function logout(){
    firebase.auth().signOut();
    window.location = 'login.html';
}