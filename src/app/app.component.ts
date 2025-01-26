import { Component, LOCALE_ID } from '@angular/core'; // Importa los módulos de componentes y locale
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'; // Importa los componentes de Ionic
import { addIcons } from 'ionicons'; // Importa la función de agregar iconos
import { add, trash, camera, arrowBack } from 'ionicons/icons'; // Importa los iconos de Ionicons
import { registerLocaleData } from '@angular/common'; // Importa el módulo de registro de locale
import localeEsCL from '@angular/common/locales/es-CL'; // Importa el locale de español de Chile 

// Registrar locale antes de la definición del componente
registerLocaleData(localeEsCL, 'es-CL'); // Registro de locale

@Component({
  selector: 'app-root', // Selector del componente
  templateUrl: 'app.component.html', // Template del componente
  standalone: true, // Componente independiente
  imports: [IonApp, IonRouterOutlet], // Importa los componentes de Ionic
  providers: [ // Proveedores de servicios
    { provide: LOCALE_ID, useValue: 'es-CL' } // Proveedor de locale
  ]
})
export class AppComponent { // Componente principal
  constructor() { // Constructor
    addIcons({ add, trash, camera, arrowBack }); // Agrega iconos
  }
}