$(document).ready(function() {
    $('.menu-icon').click(function(){
        $('#nav-desktop').toggle();
    });
});

window.onload=function(){

    var templateSource = document.getElementById('results-template').innerHTML,
    template = Handlebars.compile(templateSource),
    resultsPlaceholder = document.getElementById('results'),
    playingCssClass = 'playing',
    audioObject = null;
    
    var fetchTracks = function (albumId, callback) {
        $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumId,
            success: function (response) {
                callback(response);
            }
        });
    };
    var searchAlbums = function (query, callback) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'album'
            },
            success: function (response) {
                callback(response);
            }
        });
    };
    var renderFirstAlbum = function(a){
    	resultsPlaceholder.innerHTML =  resultsPlaceholder.innerHTML 
    	+ template(a.albums.items[0]);
    }

    results.addEventListener('click', function (e) {
        var target = e.target;
        if (target !== null && target.classList.contains('cover')) {
            if (target.classList.contains(playingCssClass)) {
                audioObject.pause();
            } else {
                if (audioObject) {
                    audioObject.pause();
                }
                fetchTracks(target.getAttribute('data-album-id'), function (data) {
                    audioObject = new Audio(data.tracks.items[1].preview_url);
                    audioObject.play();
                    target.classList.add(playingCssClass);
                    audioObject.addEventListener('ended', function () {
                        target.classList.remove(playingCssClass);
                    });
                    audioObject.addEventListener('pause', function () {
                        target.classList.remove(playingCssClass);
                    });
                });
            }
        }
    });

    // var artist = ["Lady+Gaga","Jessie+J","Lana+del+rey","Madonna","Miriam+Bryant"
    //                 ,"Håkan+Hellström","Tove+Lo","Ed+Sheeran","Sam+Smith"
    //                 ,"P!nk","Justin+Timberlake","Veronica+Maggio","Sia","One+Direction",
    //                 "Roxette","Lykke+Li","ABBA","Katy+Perry","Bruno+Mars","Carly+Rae+Jepsen"];
    var artist = ["Miriam+Bryant"]
    $.each(artist, function(i, val){
    	 searchAlbums(val, renderFirstAlbum);
    });
   
}