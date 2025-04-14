const loading = async () => {
  const response = await fetch("http://localhost:5500/monitorok");
  if (!response.ok) { throw new Error("Hiba történt..."); }
  const json = await response.json();
  return json;
}

const lista = (data) => {
  const szamozottLista = document.createElement("ol");
  data.forEach(monitor => {
    const li = document.createElement("li");
    li.textContent = `${monitor.name}, ${monitor.price} Ft, ${monitor.available ? "Elérhető" : "Nem elérhető"}`;
    szamozottLista.appendChild(li);
  });
  document.getElementById("app").appendChild(szamozottLista);
}

const init = async () => {  
  const data = await loading();
  lista(data);
}

document.addEventListener("DOMContentLoaded", init);
