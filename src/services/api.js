import axios from 'axios'


const api = axios.create({
  baseURL: 'https://cdn.jwplayer.com/v2/media/'
})

export default api;



/* var data = null;

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://cdn.jwplayer.com/v2/media/media_id");
xhr.open("GET", "https://cdn.jwplayer.com/v2/playlist/playlist_id");
xhr.setRequestHeader("accept", "application/json; charset=utf-8");

xhr.send(data); */