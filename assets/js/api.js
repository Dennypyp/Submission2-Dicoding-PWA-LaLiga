const baseUrl = "https://api.football-data.org/v2";
const apiToken = "99aabc83daa040e8bdcc0720b451a301";
const idLiga = 2014;

const endpoint_klasemen = `${baseUrl}/competitions/${idLiga}/standings?standingType=TOTAL`;
const endpoint_detailClub = `${baseUrl}/teams/`;
const endpoint_detailPemain = `${baseUrl}/players/`;

const tipeClub = "team";
const tipePemain = "player";
const dbFavClub = "favorite_team";
const dbFavPemain = "pemain_favorit";

function status(response) {
    if (response.status !== 200) {
        console.log("Status di api.js -> Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error di api.js -> Error : " + error);
}

function fetchAPI(endpoint) {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": apiToken
        }
    });
}

function getKlasemen() {
    return new Promise(function (resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_klasemen).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        getHasilKlasemen(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_klasemen)
            .then(status)
            .then(json)
            .then(function (data) {
                getHasilKlasemen(data);
                resolve(data);
            })

            .catch(error);
    });
}



function getTeamDetail(idTeam) {
    return new Promise(function (resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detailClub + idTeam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        getHasilClub(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_detailClub + idTeam)
            .then(status)
            .then(json)
            .then(function (data) {
                getHasilClub(data);
                resolve(data);
            })
            .catch(error);
    });
}



function getDetilPemain(idPemain) {
    return new Promise(function (resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detailPemain + idPemain).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        getHasilDetilPemain(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_detailPemain + idPemain)
            .then(status)
            .then(json)
            .then(function (data) {
                getHasilDetilPemain(data);
                resolve(data);
            })
            .catch(error);
    });
}

function tabFavorit(type) {
    if (type == tipeClub) {
        getAllFavorites(dbFavClub).then(function (data) {
            getHasilClubFavorit(data);
        });
    }
    else if (type == tipePemain) {
        getAllFavorites(dbFavPemain).then(function (data) {
            getHasilPemainFavorit(data);
        });
    }
}

function getFavoriteById(ID, type) {
    if (type == tipeClub) {
        getById(ID, dbFavClub).then(function (data) {
            getHasilClub(data);
        });
    }
    else if (type == tipePemain) {
        getById(ID, dbFavPemain).then(function (data) {
            getHasilDetilPemain(data);
        })
    }
}