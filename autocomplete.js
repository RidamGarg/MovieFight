const Wrapper = ({root,Update,itemInfo,inputValue})=>{
   root.innerHTML = `
<label><b>Search</b></label><br>
<div class="dropdown">
<input type="text"> 
      <div class="dropdown-menu">
        <div class="dropdown-content results">

        </div>
        </div>
      </div>
`
const dropdown = root.querySelector('.dropdown');
const chart = root.querySelector('.results');
const input = root.querySelector('input');

const onTime = async (event)=>{
    const items = await fecthData(event.target.value);
    if(!items.length){
        dropdown.classList.remove('is-active');
        return ;
    }
    dropdown.classList.add('is-active');
    chart.innerHTML = "";
    for(let item of items){
        const a = document.createElement('a');
        a.innerHTML = Update(item);
        a.classList.add('dropdown-item');
        chart.appendChild(a);
        a.addEventListener('click',async()=>{
            dropdown.classList.remove('is-active');
            input.value = inputValue(item);
             itemInfo(item.imdbID);
        });
        }
}
input.addEventListener('input',debounce(onTime));
window.addEventListener('click',(event)=>{
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
});
}