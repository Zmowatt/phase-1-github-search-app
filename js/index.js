//Declare Elements for Use

// Load Content
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    console.log("Loaded")

//Search Input
let searchForm = document.querySelector('#github-form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('#search').value;
    getUser(searchInput);
})
});

//Fetch data based on search
function getUser(input){
    fetch(`https://api.github.com/users/${input}`)
        .then(res => res.json())
        .then((data) => {
            if(!data.login){
                notFound()
            } else {
                handleData(data)
            }
        })
         .catch(error => {
            console.error("Error fetching user:", error);
            notFound(); // Call notFound() in case of an error fetching data
        });
}

function notFound(){
    let noUser = document.createElement('div')
    let userList = document.querySelector('#user-list')

    userList.innerHTML = '';

    noUser.innerHTML = '<h2 color=red>User Not Found</h2>'

    userList.appendChild(noUser);
}

function handleData(result) {
    let searchResult = document.createElement('li');
    let userList = document.querySelector('#user-list');
    let githubContainer = document.querySelector('#github-container');
    let repoList = document.querySelector('#repos-list')


    userList.innerHTML = '';
    repoList.innerHTML = '';

    searchResult.className = "search-result";
    searchResult.innerHTML = `
    <h2>${result.login}</h2>
    <img src="${result.avatar_url}"/>
    <h3><a href="${result.html_url}">Come Check Out My Page</a></h3>
    <h3 id=repos>Click Here to Open Repositories</h3>
    `
    userList.appendChild(searchResult);

    let repos = searchResult.querySelector('#repos')

    repos.addEventListener("click", () => openRepo(result.login))
}

function openRepo(username){
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json())
        .then((data) => {
            data.forEach((repo) => handleRepos(repo))
            // console.log(data)
        })
}

function handleRepos(result){
    let repos = document.createElement('li')
    let repoList = document.querySelector('#repos-list')

    repoList.innerHTML = '';
    repos.innerHTML = `
    <li>${result.name}</li>
    `;    
    repoList.appendChild(repos);
    // console.log(result)
}


// Click --> getData --> Filters based on click result 

// click getData returnData filterData filterBasedOnSearch returnRelatedData pushToObject