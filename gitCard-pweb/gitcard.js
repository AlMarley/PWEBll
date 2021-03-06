const getGitHubInfo = function (username) {
    var url = 'https://api.github.com/users/' + username;
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            let ajax = JSON.parse(this.responseText);
            setAvatar({ name: username, imgAvatar: ajax.avatar_url });
            setName(ajax.name);
            setCounters({ username, repositories: ajax.public_repos, gists: ajax.public_gists, followers: ajax.followers });            
            hideMessenger();
            document.getElementById('git-body').classList.remove('ocultar');

        }
    };

    ajax.onloadend = function () {
        if (this.status == 404) {
            console.log('404');
            hideCard();
            setMensagem('Não existente');
        }
    }
    
    hideCard();
    setMensagem('Loading...');
    ajax.open('GET', url, true);
    ajax.send();

};
const viewCard = function () {
    document.getElementById('git-body').classList.remove('ocultar');
}
const hideCard = function () {
    document.getElementById('git-body').classList.add('ocultar');
}
const setMensagem = function (msg) {
    const msgDiv = document.querySelector('#msg');
    msgDiv.style = '';
    msgDiv.querySelector('h2').innerText = msg;
}
const hideMessenger = function () {
    document.getElementById('msg').style = 'display: none';
    viewCard();
}
const setCounters = function ({username, repositories, gists, followers}) {
    const status = document.querySelectorAll('.status li a');
    const URL_REPO = `https://github.com/${username}?tab=repositories`;
    const URL_GISTS = `https://gist.github.com/${username}`;
    const URL_FOLLOWERS = `https://github.com/${username}?tab=followers`;
    status.forEach(function(child) {
        if (child.id == 'repositories') {
            child.href = URL_REPO;
            child.querySelector('strong').innerText = repositories;
        } else if (child.id == 'gist') {
            child.href = URL_GISTS;
            child.querySelector('strong').innerText = gists;
        } else if (child.id == 'followers') {
            child.href = URL_FOLLOWERS;
            child.querySelector('strong').innerText = followers;
        }
        
    });
}
const setAvatar = function ({imgAvatar, name}) {
    const avatar = document.querySelector('.avatar img');
    avatar.src = imgAvatar;
    avatar.alt = name;
}
const setName = function (name) {
    document.querySelector('.content h1').innerText = name;
}
document.getElementById('buscar-github').addEventListener('click', function (e) {
    const userName = document.getElementById('usuario-github');
    
    if (userName.value !== null) {
        getGitHubInfo(userName.value);
    }
})


