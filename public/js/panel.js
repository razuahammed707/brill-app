


function myFunction() {
  var x = document.getElementById("panel_box");
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}

function displayNone(){
  var y = document.getElementById("panel_box");
  y.style.display="none";
}

// $(function() {
// $("#bold").click(function() {
// $("div").children().each(function() {
//   var size = parseInt($(this).css("color"));
//   size = 'blue'
//
//   $(this).css({
//     'color': size,
//     'font-weight':900
//   });
// });
// });
// });





$(function() {
$("#increase").click(function() {
$("div").children().each(function() {
  var size = parseInt($(this).css("font-size"));
  if(size<30){
    size = size + 1 + "px";
    $(this).css({
      'font-size': size
    });
  }

});
});
});



$(function() {
$("#decrease").click(function() {
$("div").children().each(function() {
  var size = parseInt($(this).css("font-size"));
  if(size>15){
    size = size - 1 + "px";
    $(this).css({
      'font-size': size
    });
  }

});
});
});






$(document).ready(function(){
    $("#black").click(function(){
         $("body").css("filter", "grayscale(1)");

    });
});

$(document).ready(function(){
    $("#black").click(function(){
         $(".bullet").css({"color":"black"});
         $(".sumbitbtn").css({"background":"black"});
    });
});








function resetMe(){
window.location.reload(true);
};


function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
