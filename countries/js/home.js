
async function render(){
    let innertext=''
    let countries= await fetch('https://restcountries.com/v3.1/all')
    .then((res)=>res.json())
    .then(countries=>{
     countries.forEach((country)=>{
         let html=`<a  href="../html/counntry?name=${country.name.common}" class="country-card">
                  <img src="${country.flags.svg}">
                  <h4 class="card-title">${country.name.common}</h4>
                  <div class="card-info">
                    <p><b>Population: </b>${country.population}</p>
                    <p><b>region: </b>${country.region}</p>
                    <p><b>capital: </b>${country.capital}</p>        
                  </div>
              </a>`

              innertext=innertext+html;
        
     })
    })
    document.querySelector('.container-grid').innerHTML=innertext;
}

render();



