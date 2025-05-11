async function loadItems() {
    const res = await fetch('api/get_items.php');
    const items = await res.json();
    const tbody = document.querySelector('#itemTable tbody');
    tbody.innerHTML = '';
    items.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>
          <button onclick="deleteItem(${item.id})">Törlés</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  async function addItem() {
    const name = document.getElementById('newItemName').value;
    const qty = document.getElementById('newItemQty').value;
    await fetch('api/add_item.php', {
      method: 'POST',
      body: new URLSearchParams({ name, qty })
    });
    loadItems();
  }
  
  async function deleteItem(id) {
    await fetch('api/delete_item.php?id=' + id);
    loadItems();
  }
  
  window.onload = loadItems;
  