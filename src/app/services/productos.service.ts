import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];
  productosFiltrado: Producto[] = [];


  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    //una promesa necesito ejecutar cierto codigo hasta que algo se resuelva
    return new Promise<void>((resolve, reject) => {
      this.http.get('https://antoni-ac-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.producto = resp;
          this.cargando = false;
          resolve();
        });
    });

  }


  getProducto(id: string) {
    return this.http.get(`https://antoni-ac-default-rtdb.firebaseio.com/productos/${id}.json`);
  }



  buscarProducto(termino: string) {
    if (this.producto.length === 0) {
      //cargar productos
      this.cargarProductos().then(() => {
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      //aplicar el filtro
      this.filtrarProductos(termino);
    }
  }


  private filtrarProductos(termino: string) {


    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.producto.forEach(prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
