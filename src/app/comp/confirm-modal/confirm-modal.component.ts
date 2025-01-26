import { Component, Input } from '@angular/core'; // importa los módulos de componentes e input
import { ModalController } from '@ionic/angular'; // importa el controlador de modales
import { IonicModule } from '@ionic/angular'; // importa el módulo de Ionic

@Component({
  selector: 'app-confirm-modal', // selector del componente
  templateUrl: './confirm-modal.component.html', // template del componente
  standalone: true, // componente independiente
  imports: [IonicModule] // importa el módulo de Ionic
})
export class ConfirmModalComponent { // componente de modal de confirmación
  @Input() postTitle!: string; // título del post - por medio de un input

  constructor(private modalCtrl: ModalController) {} // inyecta el controlador de modales

  confirm() { // confirma la acción
    this.modalCtrl.dismiss({ confirmed: true }); // cierra el modal
  }

  cancel() { // cancela la acción
    this.modalCtrl.dismiss({ confirmed: false }); // cierra el modal
  }
}
