var ref = firebase.database().ref("user").child("userId");
var table = document.getElementsByTagName('table')[0];
ref.orderByKey().on("child_added", function(child) {

  console.log(child.key+': '+child.val());
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  var th = document.createElement('th');
  td.innerText = JSON.stringify(child.val().bookName) +" ● "+ JSON.stringify(child.val().bookAuthor) +" ● "+ JSON.stringify(child.val().bookPage) +" ● "+ JSON.stringify(child.val().bookType) +" ● "+ JSON.stringify(child.val().bookWord) +" ● "+ JSON.stringify(child.val().bookThink) +" • "+ JSON.stringify(child.val().bookCount);
  tr.appendChild(td);
  table.appendChild(tr);
});
