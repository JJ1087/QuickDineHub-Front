import { Component } from '@angular/core';

@Component({
  selector: 'app-ventas-restaurante',
  templateUrl: './ventas-restaurante.component.html',
  styleUrl: './ventas-restaurante.component.css'
})

export class VentasRestauranteComponent {
  folioCounter: string = '1'; // Inicializamos con '1' como cadena
  editedProduct = '';
  editedQuantity = '';
  editedTotalCost = '';
  editedSaleDate = '';
  editedSaleLocation = '';
  sortBy: string = 'folio'; // Campo por defecto para ordenar
  sortOrder: string = 'asc'; // Dirección de orden por defecto
  private synth!: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null!;
  toggleVozAlta() {
    const enableVozAlta = document.getElementById('enableVozAlta') as HTMLInputElement;
    this.synth = window.speechSynthesis;
  
    const elementos = document.querySelectorAll('a, img, h1, p, li, h2, .title, .option, label, button, strong, th, .sales-title' );
  
    elementos.forEach(elemento => {
      elemento.addEventListener('mouseover', () => {
        if (enableVozAlta.checked) {
          if (this.synth.speaking && this.utterance) {
            this.synth.cancel();
          }
  
          let texto = '';
  
          // Verificar si el elemento es una imagen antes de acceder a 'alt'
          if (elemento instanceof HTMLImageElement) {
            texto = elemento.alt;
          } else if (elemento instanceof HTMLElement) {
            texto = elemento.innerText || elemento.textContent || '';
          }
  
          if (texto.trim() !== '') {
            this.utterance = new SpeechSynthesisUtterance(texto);
            this.synth.speak(this.utterance);
          }
        }
      });
    });
  }
  toggleAddSaleForm(): void {
    const addSaleForm = document.getElementById('addSaleForm');
    if (addSaleForm) {
      addSaleForm.style.display = (addSaleForm.style.display === 'none' || addSaleForm.style.display === '') ? 'block' : 'none';
      // Limpiar el formulario al mostrarlo
      (document.getElementById('saleForm') as HTMLFormElement).reset();
    }
  }

  addSale(event: Event): void {
    event.preventDefault();

    const product = (document.getElementById('product') as HTMLInputElement).value;
    const quantity = (document.getElementById('quantity') as HTMLInputElement).value;
    const totalCost = (document.getElementById('totalCost') as HTMLInputElement).value;
    const saleDate = (document.getElementById('saleDate') as HTMLInputElement).value;
    const saleLocation = (document.getElementById('saleLocation') as HTMLInputElement).value;

    if (product && quantity && totalCost && saleDate && saleLocation) {
      const salesTable = document.getElementById('salesTable') as HTMLTableElement;
      const newRow = salesTable.insertRow(1);

      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);
      const cell4 = newRow.insertCell(3);
      const cell5 = newRow.insertCell(4);
      const cell6 = newRow.insertCell(5);
      const cell7 = newRow.insertCell(6);

      cell1.innerHTML = product;
      cell2.innerHTML = quantity;
      cell3.innerHTML = "$" + totalCost;
      cell4.innerHTML = saleDate;
      cell5.innerHTML = saleLocation;
      this.folioCounter = (parseInt(this.folioCounter) + 1).toString();
      cell6.innerHTML = this.folioCounter;
      cell7.innerHTML = '<span class="edit-icon" onclick="editSale(this)">✏️</span>';
    }

    this.toggleAddSaleForm();
  }

  filterTable(): void {
    const input1 = document.getElementById("search") as HTMLInputElement;
    const filter1 = input1.value.toUpperCase();
  
    const input2 = document.getElementById("search2") as HTMLInputElement;
    const filter2 = input2.value.toUpperCase();
  
    const input3 = document.getElementById("search3") as HTMLInputElement;
    const filter3 = input3.value.toUpperCase();
  
    const input4 = document.getElementById("search4") as HTMLInputElement;
    const filter4 = input4.value.toUpperCase();
  
    const table = document.getElementById("salesTable") as HTMLTableElement;
    const tr = table.getElementsByTagName("tr");
  
    const columnIndex1 = (document.getElementById("searchColumn") as HTMLSelectElement).value;
    const columnIndex2 = (document.getElementById("searchColumn2") as HTMLSelectElement).value;
    const columnIndex3 = (document.getElementById("searchColumn3") as HTMLSelectElement).value;
    const columnIndex4 = (document.getElementById("searchColumn4") as HTMLSelectElement).value;
  
    for (let i = 1; i < tr.length; i++) {
      const td1 = tr[i].getElementsByTagName("td")[parseInt(columnIndex1, 10)];
      const td2 = tr[i].getElementsByTagName("td")[parseInt(columnIndex2, 10)];
      const td3 = tr[i].getElementsByTagName("td")[parseInt(columnIndex3, 10)];
      const td4 = tr[i].getElementsByTagName("td")[parseInt(columnIndex4, 10)];
  
      if (td1 && td2 && td3 && td4) {
        const shouldShowRow = (
          td1.innerHTML.toUpperCase().indexOf(filter1) > -1 &&
          td2.innerHTML.toUpperCase().indexOf(filter2) > -1 &&
          td3.innerHTML.toUpperCase().indexOf(filter3) > -1 &&
          td4.innerHTML.toUpperCase().indexOf(filter4) > -1
        );
  
        tr[i].style.display = shouldShowRow ? "" : "none";
      }
    }
  }
  
  
  

  editSale(element: HTMLElement): void {
    const row = element.parentNode?.parentNode as HTMLTableRowElement;
    const cells = row.getElementsByTagName('td');

    // Llenar el formulario de edición con los datos de la fila seleccionada
    this.editedProduct = cells[0].innerHTML;
    this.editedQuantity = cells[1].innerHTML;
    this.editedTotalCost = cells[2].innerHTML.replace('$', '');
    this.editedSaleDate = cells[3].innerHTML;
    this.editedSaleLocation = cells[4].innerHTML;

    // Marcar la fila como seleccionada
    row.classList.add('selected-row');

    // Mostrar el formulario de edición
    const editSaleForm = document.getElementById('editSaleForm');
    if (editSaleForm) {
      editSaleForm.style.display = 'block';
    }
  }

  saveEditedSale(event: Event): void {
    console.log('Guardando cambios...');
    event.preventDefault();

    // Obtener la fila seleccionada para editar
    const selectedRow = document.querySelector('.selected-row') as HTMLTableRowElement;

    if (selectedRow) {
      // Actualizar los valores en la fila
      const cells = selectedRow.cells;
      cells[0].innerHTML = this.editedProduct;
      cells[1].innerHTML = this.editedQuantity;
      cells[2].innerHTML = "$" + this.editedTotalCost;
      cells[3].innerHTML = this.editedSaleDate;
      cells[4].innerHTML = this.editedSaleLocation;

      // Ocultar el formulario de edición
      const editSaleForm = document.getElementById('editSaleForm');
      if (editSaleForm) {
        editSaleForm.style.display = 'none';
      }
      // Desmarcar la fila
      selectedRow.classList.remove('selected-row');
    }
  }

  cancelEdit(): void {
    // Lógica para cancelar la edición y ocultar el formulario de edición
    const editSaleForm = document.getElementById('editSaleForm');
    if (editSaleForm) {
      editSaleForm.style.display = 'none';
    }

    // Desmarcar la fila
    const selectedRow = document.querySelector('.selected-row');
    if (selectedRow) {
      selectedRow.classList.remove('selected-row');
    }
  }

  cancelAdd(): void {
    // Lógica para cancelar la adición y ocultar el formulario de adición
    const addSaleForm = document.getElementById('addSaleForm');
    if (addSaleForm) {
      addSaleForm.style.display = 'none';
    }
  }
}