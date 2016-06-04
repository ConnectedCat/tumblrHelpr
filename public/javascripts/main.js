$(document).ready(function(){
  var likes_offset = 0;
  var likes_limit = 12;

  var get_more_likes = function(e){
    $.ajax({
      method: 'GET',
      url: '/handle_tumblr_callback/likes',
      data: {
        offset: likes_offset,
        limit: likes_limit
      }
    }).done(function(response){
      add_likes_to_page(response)
    });
  };

  var add_likes_to_page = function(response){
    likes_offset += likes_limit;
    $('.bottom-row').before(response);
  };
  
  $(window).load(get_more_likes);
  $('body').on('click', '.js-more-likes', get_more_likes);

});
