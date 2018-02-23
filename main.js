// time before showing the new content after hiding the old
var hideTime = 800;

var mailLink = 'https://c1ec1i7zn4.execute-api.us-west-2.amazonaws.com/prod/jordinGardner--EmailSender';

// TODO : uncomment this after the blog is good to go ;)
// $.get('http://jordingardner.com/blog//wp-json/wp/v2/posts', 
//       function(data, responseCode) {

//         var str = "";

//         for (var d in data) {
//           var pLink    = data[d].guid.rendered;
//           var pTitle   = data[d].title.rendered;
//           var pDate    = String(data[d].date).substring(0, 10);
//           var pExcerpt = data[d].excerpt.rendered;

//           str += "<a class='blog-post' href='" + pLink + "' target='_blank'>";
//           str += "<span class='title'>";
//           str += pTitle;
//           str += "</span>";
//           str += "<span class='date'>";
//           str += pDate;
//           str += "</span>";
//           str += "<span class='excerpt'>";
//           str += pExcerpt;
//           str += "</span>";
//           str += "</a>";
//         }

//         $('#blog-section > div').html(str);
//       });

function sendMessage(e) {
  e.preventDefault();

  var name  = $('input[name=name]').val();
  var email = $('input[name=email]').val();
  var message = $('textarea').val();

  var settings = {
    "async": true,
    "crossDomain": true,
    "url":mailLink,
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "processData": false,
    "data": JSON.stringify({
      name: name,
      email: email,
      message: message,
    })
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log('hello');
  });

  resetForm();
}

function formResponse(html) {
  $('form').fadeOut('slow', function() {
    $('form').html(html);
    $('form').fadeIn();
  });
}

function swapContentContainer(idClicked) {
  swapActiveMenuItem(idClicked);
  hideContent();

  setTimeout(function() {
    swapActiveContent(idClicked);
    resetForm();
    showContent();
    resetFocus();
  }, hideTime);
}
function hideContent() {
  $('#content-container').addClass('hidden');
}
function showContent() {
  $('#content-container').removeClass('hidden');
}
function swapActiveMenuItem(newMenuItemId) {
  $('nav .active').removeClass('active');
  $('#'+newMenuItemId).parent().addClass('active');
}
function swapActiveContent(newSectionId) {
  $('#content-container section:not(.no-display)').addClass('no-display');
  $('#'+newSectionId+'-section').removeClass('no-display');
}
function resetForm() {
  $('form input').val('');
}

function resetFocus() {
  // the timeout ensures that focus is not
  // given until after the CSS transition is finished
  setTimeout(function() { $('form input[name=name]').focus(); }, 500);
}

$('#about').on('click', function() {
  swapContentContainer('about');
});
$('#blog').on('click', function() {
  swapContentContainer('blog');
});
$('#contact').on('click', function() {
  swapContentContainer('contact');
});

$('#send-mail').on('click', sendMessage);
