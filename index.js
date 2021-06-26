const fecthData = async (SearchTerm)=>{
    const response = await axios.get('http://www.omdbapi.com/',{
        params : {
            apikey: '1e3ddfa3',
            s : SearchTerm
        }
    });
    if(response.data.Error){
        return [];
    }
    return response.data.Search ;
};
const CommomConfig = {
  Update(movie){
    let src = movie.Poster === 'N/A' ? '':movie.Poster ;
    return `
    <img src = "${src}">
    <h1>${movie.Title}</h1>
    (${movie.Year})
    `;
},

inputValue(movie){
  return `${movie.Title}`;
}
}
Wrapper({
    ...CommomConfig,
    itemInfo(movie){
      document.querySelector('.tutorial').classList.add('is-hidden');
      MovieInfo(movie,document.querySelector('.left-summary'),'left');
    },
    root : document.querySelector('.left-autocomplete'),
})
Wrapper({
  ...CommomConfig,
  itemInfo(movie){
    document.querySelector('.tutorial').classList.add('is-hidden');
    MovieInfo(movie,document.querySelector('.right-summary'),'right');
  },
  root : document.querySelector('.right-autocomplete'),
});
let leftSide ;
let rightSide ;
const MovieInfo = async (movie,target,side) =>{
   const response = await axios.get('http://www.omdbapi.com/',{
       params:{
           apikey:'1e3ddfa3',
           i : `${movie}`
       }
   });
   target.innerHTML = MovieUpdate(response.data);
   if(side === 'left'){
     leftSide = target ;
   }
   else {
     rightSide = target ;
   }
   if(leftSide&&rightSide){
     backChange();
   }
}
const MovieUpdate = (data)=>{
    // const dollars = parseInt(data.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
    const Metascore = parseInt(data.Metascore);
    const imdbRating = parseFloat(data.imdbRating);
    const imdbVotes = parseInt(data.imdbVotes.replace(/,/g,''));
    const Runtime = parseInt(data.Runtime.slice(0,-4));
    const Awards = data.Awards.split(' ').reduce((prev,cur)=>{
     const value = parseInt(cur);
     if(isNaN(value)){
       return prev ;
     }
     return prev+value ;
    },0);
    return  `
    <article class="media">
  <figure class="media-left">
    <p class="image ">
      <img src=${data.Poster}>
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
    <h1>${data.Title}</h1>
    <h4>${data.Genre}</h4>
    <p>${data.Plot}</p>
    </div>
    </div>
    </article>
    <div class="container">
  <div class="notification is-primary" data-value = ${Awards}>
    <p class = "title">${data.Awards}</p>
    <p class = "subtitle">Awards</p>
  </div>
</div>

<div class="container">
  <div class="notification is-primary" data-value = ${Metascore}>
    <p class = "title">${data.Metascore}</p>
    <p class = "subtitle">Meta Score</p>
  </div>
</div>
<div class="container">
  <div class="notification is-primary" data-value = ${imdbRating}>
    <p class = "title">${data.imdbRating}</p>
    <p class = "subtitle">IMDB Rating</p>
  </div>
</div>
<div class="container">
  <div class="notification is-primary" data-value = ${imdbVotes}>
    <p class = "title">${data.imdbVotes}</p>
    <p class = "subtitle">IMDB Votes</p>
  </div>
</div>
<div class="container">
  <div class="notification is-primary" data-value = ${Runtime}>
    <p class = "title">${data.Runtime}</p>
    <p class = "subtitle">Movie Runtime</p>
  </div>
</div>
    `
}
const backChange = ()=>{
  const leftopt = document.querySelectorAll('.left-summary .notification');
  const rightopt = document.querySelectorAll('.right-summary .notification');
  leftopt.forEach((element,index) => {
    const element2 = rightopt[index];
    const value1 =  isNaN(element.dataset.value)?0:parseFloat(element.dataset.value) ;
    const value2 = isNaN(element2.dataset.value)?0:parseFloat(element2.dataset.value) ;
    console.log(value1,value2);
    if(value1>value2){
      element.classList.remove('is-primary');
      element.classList.add('is-warning');
      element2.classList.remove('is-warning');
      element2.classList.add('is-primary');
    }
    else{
      element2.classList.remove('is-primary');
      element2.classList.add('is-warning');
      element.classList.remove('is-warning');
      element.classList.add('is-primary');
    }
  });
}
// <div class="container">
//   <div class="notification is-primary" data-value = ${dollars}>
//     <p class = "title">${data.BoxOffice}</p>
//     <p class = "subtitle">Box Office</p>
//   </div>
// </div>