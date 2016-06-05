$(document).ready(function() {
  function getArticles(userQuery) {
    var wikiApiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + userQuery + '&callback=?';
    $.getJSON(wikiApiUrl, function(articles) {
        renderArticlesMarkup(articles);
      });
    }

  function renderArticlesMarkup(articles) {
    var articlesMarkup = '';
    if (articles.query === undefined) {
      articlesMarkup += '<div class="error">Nothing found. Try another query</div>';
    }
    else {
      var pages = articles.query.pages;
      for (var property in pages) {
        if (pages.hasOwnProperty(property)) {
          articlesMarkup += '<div class="article"><h2>' + pages[property].title + '</h2><div class="snippet">' + pages[property].extract + '</div></div>';
        }
      }
    }
    $('.result').html(articlesMarkup);
  }

  $('#search').on('click', function() {
    getArticles($('#query').val());
  });

  $('#query').keydown(function(event) {
    if ( event.which == 13 ) {
     getArticles($('#query').val());
    }
  });

  $('#random').on('click', function() {
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
  });

});
