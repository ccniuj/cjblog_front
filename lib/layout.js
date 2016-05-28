var stick_footer_to_bottom = function(footer) {
  var diff = window.innerHeight - footer.offsetTop - footer.clientHeight
  if(diff > 0) {
    $(footer).css('margin-top', diff);
  } else if(diff < 0) {
    $(footer).css('margin-top', 0);
  } else {}
}

export { stick_footer_to_bottom }