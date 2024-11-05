import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { Marca } from '../models/marca';
import { MarcaService } from '../services/marca.service';

@Component({
  selector: 'app-marca',
  standalone: true,
  imports: [
    TableModule, 
    DialogModule, 
    ButtonModule, 
    ToolbarModule, 
    CommonModule, 
    FormsModule, 
    ToastModule, 
    ConfirmDialogModule,
    SidebarComponent,
    CardModule
  ],
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MarcaComponent implements OnInit {
  marcas: Marca[] = [];
  marca!: Marca;
  marcaDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private MarcaService: MarcaService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadMarcas();
  }

  loadMarcas(): void {
    this.MarcaService.getMarca().subscribe(
      (data) => {
        console.log('Marcas cargadas:', data);
        this.marcas = data;
      },
      (error) => {
        console.error('Error al cargar las marcas', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las marcas', life: 3000 });
      }
    );
  }

  openNew() {
    this.marca = { id: 0, nombre: '' };
    this.submitted = false;
    this.marcaDialog = true;
  }

  hideDialog() {
    this.marcaDialog = false;
    this.submitted = false;
  }

  saveMarca() {
    this.submitted = true;

    if (this.marca.nombre.trim()) {
      if (this.marca.id) {
        // Actualizar marca existente
        this.MarcaService.updateMarca(this.marca).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca actualizada', life: 3000 });
          this.loadMarcas();
        });
      } else {
        // Crear nueva marca
        this.MarcaService.createMarca(this.marca).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca creada', life: 3000 });
          this.loadMarcas();
        });
      }

      this.marcaDialog = false;
      this.marca = { id: 0, nombre: '' };
    }
  }

  editMarca(marca: Marca) {
    this.marca = { ...marca };
    this.marcaDialog = true;
  }

  deleteMarca(marca: Marca) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar esta Marca?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.MarcaService.deleteMarca(marca.id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca eliminada', life: 3000 });
            this.loadMarcas();
          },
          (error: Event) => {
            console.error('Error al eliminar la marca', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la marca', life: 3000 });
          }
        );
      }
    });
  }
}