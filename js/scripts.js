$(document).ready(function() {
  function getArticles(userQuery) {
    var wikiApiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + userQuery + '&callback=?';
    $.getJSON(wikiApiUrl, function(articles) {
        renderArticlesMarkup(articles.query.pages);
      });
    }

  function renderArticlesMarkup(articles) {
    var articlesMarkup = '';
    for (var property in articles) {
      if (articles.hasOwnProperty(property)) {
        articlesMarkup += '<div class="article"><h2>' + articles[property].title + '</h2><div class="snippet">' + articles[property].extract + '</div></div>';
      }
    }
    $('.result').html(articlesMarkup);
  }

  $('#search').on('click', function() {
    getArticles($('#query').val());
  });

  $('#random').on('click', function() {
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
  });

});
