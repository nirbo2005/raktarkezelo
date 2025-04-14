const loading = async () => {
  const response = await fetch("http://localhost:5500/egerek");
  if (!response.ok) { throw new Error("Hiba történt..."); }
  const json = await response.json();
  return json;
}

const tablazat = (data) => {
  const tablazat = document.createElement("table");
  const HeaderSor = document.createElement("tr");
  const headers = ["Név", "Ár", "Gamer"];
  headers.forEach(headerText => {
    const headerCella = document.createElement("th");
    headerCella.textContent = headerText;
    HeaderSor.appendChild(headerCella);
  });
  tablazat.appendChild(HeaderSor);

  data.forEach(egér => {
    const sor = document.createElement("tr");

    const nevCella = document.createElement("td");
    nevCella.textContent = egér.name;
    sor.appendChild(nevCella);

    const arCella = document.createElement("td");
    arCella.textContent = egér.price;
    sor.appendChild(arCella);

    const gamerCella = document.createElement("td");
    gamerCella.textContent = egér.gamer ? "Igen" : "Nem";
    sor.appendChild(gamerCella);

    tablazat.appendChild(sor);
  });

  document.getElementById("app").appendChild(tablazat);
}

const init = async () => {  
  const data = await loading();
  tablazat(data);
}

document.addEventListener("DOMContentLoaded", init);
