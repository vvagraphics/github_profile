const APIURL = 'https://api.github.com/users/'

// function getUser(username){
//     axios(APIURL + username)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
// }

// async function getUser(username){
//     const res = await axios(APIURL + username)
//     // console.log(res.data)
// }
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

async function getUser(username){
    try {
        const { data } = await axios(APIURL + username)
        // console.log(data)
        createUserCard(data)
        getRepos(username)
    } catch (err) {
        // console.log(err)
        if(err.response.status == 404){
            createErrorCard('No profile with this username')
        }
        
    }
    
}

async function getRepos(username){
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')
        // console.log(data)
        addReposToCard(data)
    } catch (err) {
        // console.log(err)
        if(err.response.status == 404){
            createErrorCard('Problem finding that repo')
        }
        
    }
}

function createUserCard(user){
    const cardHTML = `<div class="card">
        <div><img src="${user.avatar_url}" alt="${user.name}" class="avatar"></div>
    
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers} <strong>Followers</strong></li>        
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>

        <div id="repos">
            <a href="#" class="repo">Repo 1</a>
            <a href="#" class="repo">Repo 1</a>
            <a href="#" class="repo">Repo 1</a>
        </div>
    </div></div>`
    main.innerHTML = cardHTML

}

function createErrorCard(msg){
    const cardHTML = `
    <div class="card">
    <h1>${msg}</h1></div>
    `
    main.innerHTML = cardHTML
}

function addReposToCard(repos){
    const reposElem = document.getElementById('repos')

    repos
    .slice(0, 5)
    .forEach(repo => {
        const repoElem = document.createElement('a')
        repoElem.classList.add('repo')
        repoElem.href = repo.html_url
        repoElem.target = '_blank'
        repoElem.innerText = repo.name

        reposElem.appendChild(repoElem)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = search.value
    if (user) {
        getUser(user)
        search.value = ''
    }
})