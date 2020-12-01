const base_url = "https://api.football-data.org/v2/competitions/2021/standings";
const key_api = "d041edeed0074d3f8b00708ddd9861b8";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(base_url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          console.log(data);
          var articlesHTML = `
          <table class="responsive-table">
          <thead>
              <tr><th>Pos</th><th>Logo</th><th>Team</th><th>Games</th><th>Win</th><th>Draw</th><th>Lost</th><th>Points</th></tr>
          </thead>
          <tbody>`;
          data.standing[0].table.forEach(function(article) {
            articlesHTML += `
            <tr>
            <td><b>${article.position}</b></td>
            <td><img alt="logo-tim-liga" width="36px" height="36px" src="${article.team.crestUrl}"></td>
            <td>
            <a href="./article.html?id=${article.team.id}">
            ${article.team.name} </a></td>
            <td>${article.playedGames}</td>
            <td>${article.won}</td>
            <td>${article.draw}</td>
            <td>${article.lost}</td>
            <td>${article.points}</td>
        </tr>`;
          });
          articlesHTML += `
                  </tbody>
                </table>`;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url,{
        method: "GET",
        headers: {
            "X-Auth-Token": key_api
        }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      var articlesHTML = `
          <table class="responsive-table">
          <thead>
              <tr><th>Pos</th><th>Logo</th><th>Team</th><th>Games</th><th>Win</th><th>Draw</th><th>Lost</th><th>Points</th></tr>
          </thead>
          <tbody>`;
          data.standings[0].table.forEach(function(article) {
            articlesHTML += `
            <tr>
            <td><b>${article.position}</b></td>
            <td><img width="36px" height="36px" src="${article.team.crestUrl}"</td>
            <td>
            <a href="./article.html?id=${article.team.id}">
            ${article.team.name}</a></td>
            <td>${article.playedGames}</td>
            <td>${article.won}</td>
            <td>${article.draw}</td>
            <td>${article.lost}</td>
            <td>${article.points}</td>
        </tr>`;
          });
          articlesHTML += `
                  </tbody>
                </table>`;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}
const base_url_teams = "https://api.football-data.org/v2/teams/"
function getArticleById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url_teams + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var articleHTML = `
            <div class="row">
              <div class="col s12 m6">
                <div class="card">
                  <div class="card-image">
                    <img src="${data.crestUrl}">
                    </div>
                  <div class="card-content">
                  <span class="card-title">${data.name}</span>
                  <table>
                  <thead>
                    <tr>
                        <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Phone: ${data.phone}</td></tr>
                    <tr><td> ${data.website}</td></tr>
                    <tr><td>Address: ${data.address}</td></tr>
                    <tr><td> ${data.email}</td></tr>
                    <tr><td> ${data.email}</td></tr>
                    <tr><td> Founded: ${data.founded}</td></tr>
                    <tr><td> Venue: ${data.venue}</td></tr>
                  </tbody>
                  </div>
                </div>
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url_teams + idParam, {
        method: "GET",
        headers: {
            "X-Auth-Token": key_api
    }
  })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
          <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <div class="card-image">
                <img src="${data.crestUrl}">
                </div>
              <div class="card-content">
              <span class="card-title">${data.name}</span>
              <table>
              <thead>
                <tr>
                    <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Phone: ${data.phone}</td></tr>
                <tr><td> ${data.website}</td></tr>
                <tr><td>Address: ${data.address}</td></tr>
                <tr><td> ${data.email}</td></tr>
                <tr><td> Founded: ${data.founded}</td></tr>
                <tr><td> Venue: ${data.venue}</td></tr>
              </tbody>
              </div>
            </div>
          </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedArticles() {
  getAll().then(function(articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function(article) {
      
      articlesHTML += `
      <div class="card">
           <a href="./article.html?id=${article.id}&saved=true">
            <div class="card-image waves-effect waves-block waves-light">
               <img class="responsive-img" width="36px" height="36px"  src="${article.crestUrl}" />
            </div>
           </a>
           <div class="card-content">
             <span class="card-title truncate">${article.name}</span>
              
          </div>
        </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = parseInt(urlParams.get("id"));
  
  return getById(idParam).then(function(article) {
    articleHTML = '';
    console.log(article);
    var articleHTML = `
    <div class="card">
           <a href="./article.html?id=${article.id}">
            <div class="card-image waves-effect waves-block waves-light">
               <img src="${article.crestUrl}" />
            </div>
           </a>
           <div class="card-content">
             <span class="card-title truncate">${article.name}</span>
          </div>
        </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
    return article;
  });
}

const base_url_match = "https://api.football-data.org/v2/competitions/PL/matches?matchday=6";

function getMatch(){
 if("caches" in window){
  caches.match(base_url).then(function(response){
    if (response){
      response.json().then(function(data){
        console.log(data)
        let dataMatch = `
        <h5>Match Day : ${data.filters.matchday}</h5>
        <table class="centered">
        <thead>
          <tr>
              <th>Home Team</th>
              <th>Score</th>
              <th>Away Team</th>
          </tr>
        </thead>
        <tbody>`;
        data.matches.forEach(function(match) {
          dataMatch += `
          <tr>
            <td><a href="./article.html?id=${match.homeTeam.id}">${match.homeTeam.name}</td>
            <td>${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}  </td>
            <td><a href="./article.html?id=${match.awayTeam.id}">${match.awayTeam.name}</td>
          </tr>` 
                 
        });
        dataMatch += `
          </tbody>
      </table>`
        document.getElementById("match").innerHTML = dataMatch;
      })
    }//batas response
  })//batas match caches
 }//batas caches
  

      fetch(base_url_match,{
        method: "GET",
        headers: {
            "X-Auth-Token": key_api
        }
    })
      .then(status)
      .then(json)
      .then(function(data){
        console.log(data);
        let dataMatch = `
        <h5>Match Day : ${data.filters.matchday}</h5>
        <table class="centered">
        <thead>
          <tr>
              <th>Home Team</th>
              <th>Score</th>
              <th>Away Team</th>
          </tr>
        </thead>
        <tbody>`;
        data.matches.forEach(function(match) {
          dataMatch += `
          <tr>
            <td><a href="./article.html?id=${match.homeTeam.id}">${match.homeTeam.name}</td>
            <td>${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}  </td>
            <td><a href="./article.html?id=${match.awayTeam.id}">${match.awayTeam.name}</td>
          </tr>` 
                 
        });
        dataMatch += `
          </tbody>
      </table>`
        document.getElementById("match").innerHTML = dataMatch;
      });
}