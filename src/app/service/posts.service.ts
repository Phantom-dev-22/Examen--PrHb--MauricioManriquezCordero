import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Post } from '../models/post.model';

@Injectable({ // Esto es un decorador que indica que la clase es un servicio
  providedIn: 'root' // Esto es para que el servicio sea un singleton
})
export class PostsService {  // Creamos la clase del servicio
  private storageKey = 'community-posts'; // Creamos una propiedad privada para el nombre de la clave de almacenamiento

  async getPosts(): Promise<Post[]> { // Creamos un método asíncrono que devuelve una promesa de un array de Post
    const { value } = await Preferences.get({ key: this.storageKey }); // Obtenemos el valor de la clave de almacenamiento
    return value ? JSON.parse(value) : []; // Si hay un valor, lo parseamos, si no, devolvemos un array vacío
  }

  async savePost(post: Post): Promise<void> {   // Creamos un método asíncrono que recibe un post y devuelve una promesa vacía
    const posts = await this.getPosts(); // Obtenemos los posts
    posts.push(post); // Añadimos el post al array
    await Preferences.set({ // Guardamos los posts en el almacenamiento
      key: this.storageKey, // Usamos la clave de almacenamiento
      value: JSON.stringify(posts) // Convertimos los posts a JSON
    });
  }

  async deletePost(postId: string): Promise<void> { // Creamos un método asíncrono que recibe un id de post y devuelve una promesa vacía
    let posts = await this.getPosts(); // Obtenemos los posts
    posts = posts.filter(p => p.id !== postId); // Filtramos los posts para eliminar el post con el id recibido
    await Preferences.set({ // Guardamos los posts en el almacenamiento
      key: this.storageKey, // Usamos la clave de almacenamiento
      value: JSON.stringify(posts) // Convertimos los posts a JSON
    });
  }
}

