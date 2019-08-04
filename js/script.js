'use strict'

var tweetLink = "https://twitter.com/intent/tweet?text="; //link do wysyłania tweetów; po znaku = dodawana będzie treść tweeta za pomoca kodu js
var prefix = "https://cors-anywhere.herokuapp.com/";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"; //link do API Quotes on Design 

//pobieranie cytatu
function getQuote() {
    fetch(prefix + quoteUrl, { cache: "no-store" }) //quateUrl - adres zapytania(link do API); cache: - wyłączenie możłiwości zaglądania do HTTP Cache
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet); //funkcja tworząca tweeta
}

//tworzenie tweeta
function createTweet(input) {
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    //generowanie treści tweeta
    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    //sprawdzanie długości cytatu
    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = "Author: " + quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet); //wybierz element z klasą .tweet i modyfikuj zawartość atrybutu href na URL tweeta
    }
}

//generowanie cytatu po uruchumieniu strony i kliknięciu w button
document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});