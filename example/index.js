var myElement = document.getElementById( "myTextField" );
function run( e ) {
  var target = e.target || e.srcElement,
    key =  parseInt( target.textContent || target.nodeValue );
  if(!isNaN(key)){
    textFieldRange( myElement ).moveCaret( key );
    return;
  }
}
document.onclick=function(e) {
  run(e);
}

