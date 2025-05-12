let currentSortColumn = '';
let isAscending = true;

async function loadItems() {
    try {
        const res = await fetch('api/get_items.php');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const items = await res.json();
        displayItems(items);
    } catch (error) {
        console.error('Hiba a termékek betöltésekor:', error);
        alert('Hiba a termékek betöltésekor. Kérlek, próbáld újra később.');
    }
}

function displayItems(items) {
    const tbody = document.querySelector('#itemTable tbody');
    tbody.innerHTML = '';
    items.forEach(item => {
        const tr = document.createElement('tr');
        let rowClass = '';
        const lejaratDate = new Date(item.lejarat);
        const now = new Date();
        const oneWeekLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

        if (lejaratDate <= now || item.mennyiseg < 10) {
            rowClass = 'danger';
        } else if (lejaratDate <= oneWeekLater || item.mennyiseg < 100) {
            rowClass = 'warning';
        }

        tr.innerHTML = `
            <td class="${rowClass}">${item.id}</td>
            <td class="${rowClass}">${item.nev}</td>
            <td class="${rowClass}">${item.gyarto}</td>
            <td class="${rowClass}">${item.lejarat}</td>
            <td class="${rowClass}">${item.ar}</td>
            <td class="${rowClass}">${item.mennyiseg}</td>
            <td class="${rowClass}">${item.parcella}</td>
            <td class="${rowClass}">
                <button onclick="openModifyForm('${item.id}')">Módosítás</button>
                <button onclick="deleteItem('${item.id}')">Törlés</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function sortTable(columnName) {
    if (currentSortColumn === columnName) {
        isAscending = !isAscending;
    } else {
        currentSortColumn = columnName;
        isAscending = true;
    }

    fetch('api/get_items.php')
        .then(res => res.json())
        .then(items => {
            items.sort((a, b) => {
                if (columnName === 'lejarat') {
                    const dateA = new Date(a[columnName]);
                    const dateB = new Date(b[columnName]);
                    return isAscending ? dateA - dateB : dateB - dateA;
                } else if (columnName === 'mennyiseg' || columnName === 'ar') {
                    return isAscending ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
                } else {
                    return isAscending ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName]);
                }
            });
            displayItems(items);
        });
}

function openModifyForm(itemId) {
    showInterface('modositas');
    document.getElementById('updateItemId').value = itemId;
    // Itt lehetne az űrlapot feltölteni az adott termék adataival, ha szükséges
}

async function addItem() {
    const nev = document.getElementById('newItemNev').value;
    const gyarto = document.getElementById('newItemGyarto').value;
    const lejarat = document.getElementById('newItemLejarat').value;
    const ar = document.getElementById('newItemAr').value;
    const mennyiseg = document.getElementById('newItemMennyiseg').value;
    const parcella = document.getElementById('newItemParcella').value;

    const data = new URLSearchParams();
    data.append('nev', nev);
    data.append('gyarto', gyarto);
    data.append('lejarat', lejarat);
    data.append('ar', ar);
    data.append('mennyiseg', mennyiseg);
    data.append('parcella', parcella);

    try {
        const res = await fetch('api/add_item.php', {
            method: 'POST',
            body: data
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        if (result.error) {
            alert('Hiba: ' + result.error);
        } else {
            alert(result.message);
            loadItems();
            showInterface('termekek', document.querySelector('#menu button:first-child'));
        }
    } catch (error) {
        console.error('Hiba a termék hozzáadásakor:', error);
        alert('Hiba a termék hozzáadásakor. Kérlek, próbáld újra később.');
    }
}

async function updateItem() {
    const id = document.getElementById('updateItemId').value;
    const nev = document.getElementById('updateNev').value;
    const gyarto = document.getElementById('updateGyarto').value;
    const lejarat = document.getElementById('updateLejarat').value;
    const ar = document.getElementById('updateAr').value;
    const mennyiseg = document.getElementById('updateMennyiseg').value;
    const parcella = document.getElementById('updateParcella').value;

    const data = new URLSearchParams();
    data.append('id', id);
    if (nev) data.append('nev', nev);
    if (gyarto) data.append('gyarto', gyarto);
    if (lejarat) data.append('lejarat', lejarat);
    if (ar) data.append('ar', ar);
    if (mennyiseg) data.append('mennyiseg', mennyiseg);
    if (parcella) data.append('parcella', parcella);

    try {
        const res = await fetch('api/update_item.php', {
            method: 'POST',
            body: data
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        if (result.error) {
            alert('Hiba: ' + result.error);
        } else {
            alert(result.message + '. Érintett sorok: ' + result.rowsAffected);
            loadItems();
            showInterface('termekek', document.querySelector('#menu button:first-child'));
        }
    } catch (error) {
        console.error('Hiba a termék módosításakor:', error);
        alert('Hiba a termék módosításakor. Kérlek, próbáld újra később.');
    }
}

async function deleteItem(id) {
    try {
        const res = await fetch(`api/delete_item.php?id=${id}`, {
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();

        if (result.error) {
            alert('Hiba: ' + result.error);
        } else {
            alert(result.message + '. Érintett sorok: ' + result.rowsAffected);
            loadItems();
            showInterface('termekek', document.querySelector('#menu button:first-child'));
        }
    } catch (error) {
        console.error('Hiba a termék törlésekor:', error);
        alert('Hiba a termék törlésekor. Kérlek, próbáld újra később.');
    }
}

function showInterface(id, clickedButton = null) {
    console.log(`showInterface meghívva: id=${id}`);
    const interfaces = document.querySelectorAll('.interface');
    interfaces.forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    const buttons = document.querySelectorAll('#menu button');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    if (id === 'raktar-attekintes') {
        console.log('generateParcellaValaszto meghívása');
        generateParcellaValaszto();
    }
}

function generateParcellaValaszto() {
    console.log('generateParcellaValaszto meghívva');
    const parcellaValaszto = document.getElementById('parcella-valaszto');
    parcellaValaszto.innerHTML = '';

    const rows = ['A', 'B'];
    const cols = [1, 2, 3, 4, 5];

    rows.forEach(row => {
        cols.forEach(col => {
            const baseParcella = `${row}${col}`;
            const cellDiv = document.createElement('div');
            cellDiv.textContent = baseParcella;
            cellDiv.addEventListener('click', () => showPolcTermekek(baseParcella));
            parcellaValaszto.appendChild(cellDiv);
        });
    });
}

async function showPolcTermekek(baseParcella) {
    console.log(`showPolcTermekek meghívva: baseParcella=${baseParcella}`);
    const polcTermekekDiv = document.getElementById('polc-termekek');
    polcTermekekDiv.innerHTML = `<h2>${baseParcella} polcai:</h2><div style="display: flex; gap: 20px;"></div>`;
    const polcContainer = polcTermekekDiv.querySelector('div'); // Létrehozunk egy konténert a polcoknak

    try {
        console.log('fetch hívás indítása a grid_view.php-ra');
        const res = await fetch('api/grid_view.php');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const itemsByPolc = await res.json();
        console.log('grid_view.php válasza:', itemsByPolc);

        let vanTermek = false; // Jelzi, hogy volt-e termék a parcellában

        for (let i = 1; i <= 4; i++) {
            const polcNev = `${baseParcella}-${i}`;
            if (itemsByPolc.hasOwnProperty(polcNev)) {
                const termekDiv = document.createElement('div'); // Létrehozunk egy div-et minden polcnak
                termekDiv.innerHTML = `<h3>${i}. polc</h3><ul></ul>`;
                const termekListaUL = termekDiv.querySelector('ul');
                const termekLista = itemsByPolc[polcNev];

                if (termekLista && termekLista.length > 0) {
                    termekLista.forEach(termek => {
                        const li = document.createElement('li');
                        li.textContent = `${termek.nev} (${termek.mennyiseg} db)`;
                        termekListaUL.appendChild(li);
                    });
                    vanTermek = true;
                    polcContainer.appendChild(termekDiv); // Hozzáadjuk a polcot a konténerhez
                } else {
                    const li = document.createElement('li');
                    li.textContent = 'Nincs termék ezen a polcon.';
                    termekListaUL.appendChild(li);
                    polcContainer.appendChild(termekDiv); // Üres polcot is hozzáadjuk
                }
            } else {
                const termekDiv = document.createElement('div');
                termekDiv.innerHTML = `<h3>${i}. polc</h3><ul><li>Nincs termék ezen a polcon.</li></ul>`;
                polcContainer.appendChild(termekDiv); // Nem létező polcot is hozzáadjuk
            }
        }

        if (!vanTermek && polcContainer.children.length === 0) {
            polcTermekekDiv.innerHTML += '<p>Nincs termék ebben a parcellában.</p>';
        }

    } catch (error) {
        console.error('Hiba a termékek betöltésekor:', error);
        polcTermekekDiv.innerHTML = '<p>Hiba a termékek betöltésekor.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    showInterface('termekek', document.querySelector('#menu button:first-child'));
});