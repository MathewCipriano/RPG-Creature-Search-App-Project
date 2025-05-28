const API_BASE = 
  "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

const input     = document.getElementById("search-input");
const button    = document.getElementById("search-button");

const nameEl    = document.getElementById("creature-name");
const idEl      = document.getElementById("creature-id");
const weightEl  = document.getElementById("weight");
const heightEl  = document.getElementById("height");
const typesEl   = document.getElementById("types");

const hpEl      = document.getElementById("hp");
const atkEl     = document.getElementById("attack");
const defEl     = document.getElementById("defense");
const spAtkEl   = document.getElementById("special-attack");
const spDefEl   = document.getElementById("special-defense");
const speedEl   = document.getElementById("speed");


function clearAll() {
  nameEl.textContent    = "";
  idEl.textContent      = "";
  weightEl.textContent  = "";
  heightEl.textContent  = "";
  typesEl.innerHTML     = "";
  hpEl.textContent      = "";
  atkEl.textContent     = "";
  defEl.textContent     = "";
  spAtkEl.textContent   = "";
  spDefEl.textContent   = "";
  speedEl.textContent   = "";
}


button.addEventListener("click", async (e) => {
  e.preventDefault();
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  clearAll();

  try {

    const res = await fetch(API_BASE + query);
    if (!res.ok) throw new Error("Not found");
    const data = await res.json();

    
    nameEl.textContent   = data.name.toUpperCase();     
    idEl.textContent     = `#${data.id}`;                
    weightEl.textContent = `Weight: ${data.weight}`;     
    heightEl.textContent = `Height: ${data.height}`;     


    hpEl.textContent     = data.stats[0].base_stat;     
    atkEl.textContent    = data.stats[1].base_stat;      
    defEl.textContent    = data.stats[2].base_stat;     
    spAtkEl.textContent  = data.stats[3].base_stat;     
    spDefEl.textContent  = data.stats[4].base_stat;     
    speedEl.textContent  = data.stats[5].base_stat;      

   
    typesEl.innerHTML = "";
    data.types.forEach((t) => {
      const span = document.createElement("span");
      span.textContent = t.name.toUpperCase();          
      typesEl.appendChild(span);
    });

  } catch {
  
    alert("Creature not found");
  }
});