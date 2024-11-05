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
import { TipoService } from '../services/tipo.service';
import { Tipo } from '../models/tipo';

@Component({
  selector: 'app-tipo',
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
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TipoComponent implements OnInit {
  tipos: Tipo[] = [];
  tipo!: Tipo;
  tipoDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private TipoService: TipoService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadTipos();
  }

  loadTipos(): void {
    this.TipoService.getTipo().subscribe(
      (data) => {
        console.log('Tipos cargadas:', data);
        this.tipos = data;
      },
      (error) => {
        console.error('Error al cargar las tipos', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las marcas', life: 3000 });
      }
    );
  }

  openNew() {
    this.tipo = { id: 0, nombre: '' };
    this.submitted = false;
    this.tipoDialog = true;
  }

  hideDialog() {
    this.tipoDialog = false;
    this.submitted = false;
  }

  saveMarca() {
    this.submitted = true;

    if (this.tipo.nombre.trim()) {
      if (this.tipo.id) {
        // Actualizar marca existente
        this.TipoService.updateTipo(this.tipo).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca actualizada', life: 3000 });
          this.loadTipos();
        });
      } else {
        // Crear nueva marca
        this.TipoService.createTipo(this.tipo).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca creada', life: 3000 });
          this.loadTipos();
        });
      }

      this.tipoDialog = false;
      this.tipo = { id: 0, nombre: '' };
    }
  }

  editMarca(marca: Tipo) {
    this.tipo = { ...marca };
    this.tipoDialog = true;
  }

  deleteMarca(tipo: Tipo) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar esta Marca?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.TipoService.deleteTipo(tipo.id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca eliminada', life: 3000 });
            this.loadTipos();
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
