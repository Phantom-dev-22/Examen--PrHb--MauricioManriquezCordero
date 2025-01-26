import { Component, EventEmitter, Output } from '@angular/core'; // importa los módulos de componentes y eventos
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // importa los módulos de formularios
import { PostsService } from '../../service/posts.service'; // importa el servicio de posts
import { Camera, CameraResultType } from '@capacitor/camera'; // importa el módulo de cámara de Capacitor
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonInput, 
  IonTextarea, 
  IonButton, 
  IonIcon, 
  IonImg, IonText, IonButtons, IonLabel } from '@ionic/angular/standalone'; // importa los componentes de Ionic
import { CommonModule } from '@angular/common'; // importa el módulo de componentes comunes
import { Router } from '@angular/router'; // importa el servicio de rutas

@Component({
  selector: 'app-post-form', // selector del componente
  templateUrl: './post-form.component.html', // template del componente
  standalone: true, // componente independiente
  imports: [IonLabel, IonButtons, IonText, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonInput, 
    IonTextarea, 
    IonButton, 
    IonIcon, 
    IonImg,
    ReactiveFormsModule, 
    CommonModule
  ]
})
export class PostFormComponent { // componente de formulario de post
  @Output() formSubmitted = new EventEmitter<void>(); // emite un evento de formulario enviado - por medio de un output
  postForm: FormGroup; // formulario de post
  capturedImage: string | undefined; // imagen capturada

  constructor(
    private fb: FormBuilder, // inyecta el constructor de formularios
    private postsService: PostsService, // inyecta el servicio de posts
    private router: Router // inyecta el servicio de rutas
  ) {
    this.postForm = this.fb.group({ // crea un formulario
      title: ['', [Validators.required, Validators.minLength(5)]], // validaciones 5 caracteres mínimo
      description: ['', [Validators.required, Validators.minLength(20)]] // validaciones 20 caracteres mínimo
    });
  }

  goBack() { // regresa a la lista de posts
    this.router.navigate(['/posts']); // redirige a la lista de posts
  }

  async takePicture() { // captura la imagen
    const image = await Camera.getPhoto({ // captura la imagen
      quality: 90, // calidad de la imagen
      allowEditing: false, // no permite editar la imagen
      resultType: CameraResultType.Base64 // captura la imagen en base64
    });
    
    this.capturedImage = `data:image/jpeg;base64,${image.base64String}`; // guarda la imagen capturada
  }

  async onSubmit() { 
    if (this.postForm.valid && this.capturedImage) { // si el formulario es válido y hay una imagen capturada
      const newPost = { // crea un nuevo post
        id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`, // id único
        ...this.postForm.value, // copia los valores del formulario
        date: new Date().toISOString(), // fecha actual
        image: this.capturedImage // imagen capturada
      };

      await this.postsService.savePost(newPost); // espera a que se guarde el post

      this.postForm.reset(); // limpia el formulario
      this.capturedImage = undefined; // limpia la imagen capturada
      this.formSubmitted.emit(); // emite el evento de formulario enviado
      //this.formSubmitted.emit(); // descartado
      //this.router.navigate(['/posts']); // descartado
    }
  }

  get title() { 
    return this.postForm.get('title');  // obtiene el título del formulario
  }

  get description() { 
    return this.postForm.get('description');  // obtiene la descripción del formulario
  }
}