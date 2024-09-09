import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products: Product []=[];
  category: Category[] = [];

  constructor(
    private productService: ProductService,
  ){}
  
  
  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(){
    this.productService.getProducts().subscribe(
      data => this.products = data
    );
  }  

  deleteProductById(id:number){

    Swal.fire({
      title: 'Estas seguro de eliminar el producto?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire(
          'Borrar',
          'El producto ha sido eliminado',
          'success'
        )
      }
    })

    this.productService.deleteProductById(id).subscribe(
      data => {
        console.log('Product deleted');        
        this.listProducts();
      }
    );
  }


  

}
