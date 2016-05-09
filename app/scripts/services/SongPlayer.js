(function() {
  function SongPlayer(Fixtures) {
      var SongPlayer = {};

      var currentAlbum = Fixtures.getAlbum();
      var currentSong = null;

      var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
      };

      /**
      * @desc Buzz object audio file
      * @type {Object}
      */
      SongPlayer.currentSong = null;

      /**
      * @function setSong
      * @desc Stops currently playing song and loads new audio file as currentBuzzObject
      * @param {Object} song
      */

      var setSong = function(song) {
        if (currentBuzzObject) {
          currentBuzzObject.stop();
          currentSong.playing = null;
        }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });
        currentSong = song;
      };

      var playSong = function(){
        currentBuzzObject.play();
        currentSong.playing = true
      }

      SongPlayer.play = function(song) {
          song = song || SongPlayer.currentSong;
          if (SongPplayer.currentSong !== song) {
            setSong(song);
            playSong(song);
        } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
              playSong(song);
            }
         }
      };
      /**
      * @function pause
      * @desc Pause current song
      * @param {Object} song
      */
      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
      };

      SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
      };

      return SongPlayer;
  }

  angular
      .module('blocJams')
      .factory('SongPlayer', SongPlayer);
})();
