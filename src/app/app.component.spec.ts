import { TestBed } from '@angular/core/testing'; // importa el módulo de pruebas de Angular
import { provideRouter } from '@angular/router'; // importa el proveedor de rutas
import { AppComponent } from './app.component'; // importa el componente principal

describe('AppComponent', () => { // describe el componente principal
  it('should create the app', async () => { // prueba de creación de la aplicación
    await TestBed.configureTestingModule({ // configuración de la prueba
      imports: [AppComponent], // importa el componente principal
      providers: [provideRouter([])] // provee el servicio de rutas
    }).compileComponents(); // compila los componentes
    
    const fixture = TestBed.createComponent(AppComponent); // crea el componente
    const app = fixture.componentInstance; // instancia la aplicación
    expect(app).toBeTruthy(); // comprueba que la aplicación existe
  });
});
