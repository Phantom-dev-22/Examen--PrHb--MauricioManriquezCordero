import { Routes } from '@angular/router'; // importa los módulos de rutas
import { PostListComponent } from './comp/post-list/post-list.component'; // importa los componentes de lista de posts y formulario de post
import { PostFormComponent } from './comp/post-form/post-form.component'; // importa los componentes de lista de posts y formulario de post

export const routes: Routes = [ // rutas de la aplicación
  { path: '', redirectTo: '/posts', pathMatch: 'full' }, // ruta de redirección
  { path: 'posts', component: PostListComponent }, // ruta de lista de posts
  { path: 'create', component: PostFormComponent } // ruta de creación de post
];