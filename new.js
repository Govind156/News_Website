const API_KEY="b855512bf46a41c09c4400234a120917"
const URL="https://newsapi.org/v2/everything?q="

//window load per fetchNews function call hoga
window.addEventListener('load',()=>fetchNews("India"))

function homestate(){
    window.location.reload();
}
// https://newsapi.org/v2/everything?q=tesla&from=2024-07-31&sortBy=publishedAt&apiKey=b855512bf46a41c09c4400234a120917
async function fetchNews(query){
    
    //fetch function promise return karege toh humko wait karne hoge isliye await use kiye hai
    //string template k use kar ke fetch ko proper url dene hoge
    const response=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    //response.json b promise return karege isliye await use karne hoge
    const json=await response.json()
    console.log(json);
    const sortedArticles = sortByDateDescending(json.articles);
    bindData(sortedArticles);
    // bindData(json.articles);
}
//try
// Function to sort articles by date in descending order (latest first)
function sortByDateDescending(articles) {
    return articles.sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateB - dateA;  // Newest to Oldest
    });
}
// Sort articles by date (latest first)
// const sortedArticles = sortByDateDescending(articles);

//try

function bindData(sortedArticles){
    const templateCardContainer=document.getElementById("template-card-container")
    const cardsContainer=document.getElementById("cards-container")
    cardsContainer.innerHTML=""
    sortedArticles.forEach(article=>{
        if(!article.urlToImage) return
        const cardclone=templateCardContainer.content.cloneNode(true)
        fillDataInCard(cardclone,article)
        cardsContainer.appendChild(cardclone)
    })
}

 function fillDataInCard(cardclone, article){
    const cardtitle=cardclone.querySelector('#news-title')
    const cardsource=cardclone.querySelector('#news-source')
    const carddesc=cardclone.querySelector('#news-desc')
    const cardimg=cardclone.querySelector('#news-img')
    const date=new Date(article.publishedAt).toLocaleString('en-US',{timeZone:"asia/jakarta"})
    cardimg.src=article.urlToImage
    cardtitle.innerHTML=article.title;
    cardsource.innerHTML=`${article.source}  |   ${date}`
    carddesc.innerHTML=article.description; 

    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank")
    })
 }


 let currentSelectedNav=null;
 function onNavclick(id){
    fetchNews(id)
    const navItem=document.getElementById(id)
    currentSelectedNav?.classList.remove('active')
    currentSelectedNav=navItem
    currentSelectedNav.classList.add('active')
    search_input.value=""
}

let search_input=document.getElementById('search-input')
let search_button=document.getElementById('search-button')
search_button.addEventListener('click',()=>{
    const query=search_input.value
    fetchNews(query)
    currentSelectedNav?.classList.remove('active')
})