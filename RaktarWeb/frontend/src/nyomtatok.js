const loading = async () => {
  const response = await fetch("http://localhost:5500/nyomtatok");
  if (!response.ok) { throw new Error("Hiba történt..."); }
  const json = await response.json();
  return json;
}

const lista = (data) => {
  const szamozatlanLista = document.createElement("ul");
  data.forEach(nyomtato => {
    const li = document.createElement("li");
    li.textContent = `${nyomtato.name}, ${nyomtato.price} Ft, ${nyomtato.szines ? "Színes" : "Fekete-fehér"}`;
    szamozatlanLista.appendChild(li);
  });
  document.getElementById("app").appendChild(szamozatlanLista);
}

const init = async () => {  
  const data = await loading();
  lista(data);
}

document.addEventListener("DOMContentLoaded", init);
