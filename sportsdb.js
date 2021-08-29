const searchTeam = () => {
    //get searching team by name
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clear data
    searchField.value = '';
    //if there is no searching item
    if (searchText == '') {
        window.alert('Please enter your favorite team name!');
    }
    else {
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchTeam(data.teams))
    }
}

const displaySearchTeam = async teams => {
    const searchResult = document.getElementById('search-result');
    //clear data
    searchResult.textContent = '';
    if (searchResult.length == 0) {

    }
    else {
        teams.forEach(team => {
            //console.log(team);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
             <div onclick="loadTeamDetail('${team.idTeam}')" class="card border-success" style="height: 400px;">
                 <img width="200px" height="200px" src="${team.strTeamBadge}" class="card-img-top" alt="...">
                 <div class="card-body">
                    <h5 class="card-title">Name: ${team.strAlternate}</h5>
                    <h6 class="card-text">Country : ${team.strCountry}</h6>
                 </div>
             </div>`;
            searchResult.appendChild(div);
        });
    }
}

const loadTeamDetail = async teamId => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayTeamDetail(data.teams[0]);
}

const displayTeamDetail = team => {
    console.log(team);
    const teamDetails = document.getElementById('team-details');
    const div = document.createElement('div');
    //clear data
    teamDetails.textContent = '';
    div.classList.add('card');
    div.innerHTML = `
    <img width="200px" src="${team.strTeamBadge}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Team: ${team.strTeam}</h5>
        <h6 class="card-text">Country: ${team.strCountry}</h6>
        <h6 class="card-text">League: ${team.strLeague}</h6>
        <h6 class="card-text">Sport: ${team.strSport}</h6>
        <h6 class="card-text">Stadium: ${team.strStadium}</h6>
        <h6 class="card-text">Gender: ${team.strGender}</h6>
    </div>
    `;
    teamDetails.appendChild(div);
}