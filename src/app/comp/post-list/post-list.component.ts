import { Component, OnInit } from '@angular/core'; // importa los módulos de componentes e inicialización
import { PostsService } from '../../service/posts.service'; // importa el servicio de posts
import { Post } from 'src/app/models/post.model'; // importa el modelo de post
import { ModalController, IonGrid } from '@ionic/angular/standalone'; // importa el controlador de modales
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component'; // importa el componente de modal de confirmación
import { Router } from '@angular/router'; // importa el servicio de rutas
import { CommonModule } from '@angular/common'; // importa el módulo de componentes comunes
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonButton, 
  IonIcon, 
  IonFab, 
  IonFabButton,
  IonImg,
  IonNote,
  IonRow,
  IonCol
} from '@ionic/angular/standalone'; // importa los componentes de Ionic

@Component({
  selector: 'app-post-list', // selector del componente
  templateUrl: './post-list.component.html', // template del componente
  standalone: true, // componente independiente
  imports: [IonGrid, IonRow, 
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonImg,
    IonNote,
    IonCol
  ]  
}) // decorador de componente
export class PostListComponent implements OnInit { // componente de lista de posts
  posts: Post[] = []; // lista de posts vacía

  constructor(
    private postsService: PostsService, // inyecta el servicio de posts
    private modalCtrl: ModalController, // inyecta el controlador de modales   
    private router: Router // inyecta el servicio de rutas
  ) {}

  async ngOnInit() { // inicializa el componente
    await this.loadPosts(); // carga los posts
  }

  private async loadPosts() { // carga los posts
    try { // intenta
      this.posts = await this.postsService.getPosts(); // carga los posts
    } catch (error) { // maneja el error
      console.error('Error loading posts:', error); // imprime el error en consola
      this.posts = []; // limpia los posts
    }
  }

  async deletePost(post: Post) { // elimina un post
    const modal = await this.modalCtrl.create({ // crea un modal
      component: ConfirmModalComponent, // componente del modal
      componentProps: { postTitle: post.title } // pasa el título del post al modal
    });
    
    await modal.present(); // muestra el modal
    
    const { data } = await modal.onWillDismiss(); // espera a que se cierre el modal
    if (data?.confirmed) { // si se confirma
      try { // intenta
        await this.postsService.deletePost(post.id); // elimina el post
        this.posts = this.posts.filter(p => p.id !== post.id); // filtra los posts
      } catch (error) { // maneja el error
        console.error('Error deleting post:', error); // imprime el error en consola
      }
    }
  }

  navigateToCreate() { // navega a la creación de posts
    this.router.navigate(['/create']); // redirige a la creación de posts
  }
}