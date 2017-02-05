
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark (e){
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  //Local Storage
  if (localStorage.getItem('bookmarks') === null){
    var bookmarks = [];

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }

  //clear form
  document.getElementById('myForm').reset();

  //re-fetch
  fetchBookmarks();

  e.preventDefault();
}

function deleteBookmark (url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for (var i = 0; i < bookmarks.length; i++){
    if (bookmarks [i].url === url) {
      bookmarks.splice(i,1);
    }
  }
  //reset
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  //re-fetch
  fetchBookmarks();

}

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = '';

  for (var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="bookmarks__well">' +
                                  '<h3>' + name +
                                  ' <a target="_blank" href="'+url+'"><i class="fa fa-globe fa__globe" aria-hidden="true"></i></a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" href="#"><i class="fa fa-trash-o fa__trash" aria-hidden="true"></i></a> ' +
                                  '</h3>'+
                                  '</div>';
  }
  }

//form validation
  function validateForm(siteName, siteUrl){
    if (!siteName || !siteUrl) {
      alert('Please fill in the form');
      return false;
      }


    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)){
      alert ('Please use a valid URL');
      return false;
    }
    return true;
  }
