var Handler = require('express'), Firebase = require('firebase-admin'),  Axios = require('axios'), Server = require('request'), App = Handler(), Auth = require('./auth.json')
  , Id = '9f65da0268b04db2a11dced346a83ff9'
  , Secret = '0383828c2ccf4d419338d8c3c4d4ce52'
Firebase.initializeApp({ credential: Firebase.credential.cert(Auth), databaseURL: `https://jongerenparlement-default-rtdb.europe-west1.firebasedatabase.app/` })
var Database = Firebase.database()

App.get('/', (Request, Response) => { Response.sendFile(__dirname + '/views/index.html') })
App.get('/request', (Request, Response) => { Response.sendFile(__dirname + '/views/public/splash.html') })
App.get('/requested', (Request, Response) => { Response.sendFile(__dirname + '/views/public/requested.html') })
App.get('/playlist', (Request, Response) => { Response.sendFile(__dirname + '/views/public/playlist.html') })
App.get('/api/v1/search', (Request, Response) => {
  var Authentication = { url: 'https://accounts.spotify.com/api/token', headers: { 'Authorization': 'Basic ' + (new Buffer.from(Id + ':' + Secret).toString('base64')) }, form: { grant_type: 'client_credentials' }, json: true }
  Server.post(Authentication, function (error, response, data) {
    if (!error && response.statusCode === 200) {
      var Token = data.access_token;
      var Authenticate = { url: `https://api.spotify.com/v1/search?q=${Request.query.quest}&type=track&limit=6`, headers: { 'Authorization': 'Bearer ' + Token }, json: true };
      Server.get(Authenticate, function (error, response, data) {
        Response.json(data)
      });
    }
  });
});

App.get('/api/v1/request', async (Request, Response) => {
  var Flaggy = true, Likes
  var Id = Request.query.id, Authors = Request.query.authors, Album = Request.query.album, AlbumName = Request.query.name, Requester = Request.query.requester, Description = Request.query.desc
  await Axios.get(`https://jongerenparlement-default-rtdb.europe-west1.firebasedatabase.app/cloud/server/request/${Id}.json`).then(async function (response) {
    if (response.data == null) {
      return Flaggy = false
    } else {
      return Likes = response.data.likes.count.count
    }
  })
  if (Flaggy == false) {
    Database.ref(`cloud/server/request/${Id}/authors`).set({ authors: Authors })
    Database.ref(`cloud/server/request/${Id}/album`).set({ img: Album, name: AlbumName })
    Database.ref(`cloud/server/request/${Id}/profile`).set({ name: Requester, desc: Description})
    Database.ref(`cloud/server/request/${Id}/likes/count`).set({ count: 2 })
    Database.ref(`cloud/server/request/${Id}/likes/${Requester}`).set({ name: Requester, desc: Description})
  }

  if (Flaggy == true) {
    Database.ref(`cloud/server/request/${Id}/likes/count`).set({ count: Likes + 1 })
    Database.ref(`cloud/server/request/${Id}/likes/profiles/${Requester}`).set({ name: Requester, desc: Description })
  }
});

App.get('/api/v1/playlist', async (Request, Response) => {
  await Axios.get(`https://jongerenparlement-default-rtdb.europe-west1.firebasedatabase.app/cloud/server/request.json`).then(async function (response) {
    Response.json(response.data)
  })
});

App.use(Handler.static(__dirname + '/public/'));
module.exports = App;