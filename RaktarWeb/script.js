let currentSortColumn = '';
let isAscending = true;

async function loadItems() {
    try {
        const res = await fetch('api/get_items.php');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const items = await res.json();
        displayItems(items); // Use displayItems to show data
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
            showInterface('termekek');
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
            showInterface('termekek');
        }
    } catch (error) {
        console.error('Hiba a termék módosításakor:', error);
        alert('Hiba a termék módosításakor. Kérlek, próbáld újra később.');
    }
}

async function deleteItem(id) {
    const data = new URLSearchParams();
    data.append('id', id);

    try {
        const res = await fetch('api/delete_item.php', {
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
            showInterface('termekek');
        }
    } catch (error) {
        console.error('Hiba a termék törlésekor:', error);
        alert('Hiba a termék törlésekor. Kérlek, próbáld újra később.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    showInterface('termekek');
});