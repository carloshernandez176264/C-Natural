import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCart } from 'src/app/common/item-cart';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  id: number = 0;
  name: string = '';
  description:string= '';
  price!: number;
  urlImage: string = '';
  quantity: number = 0;

  ngOnInit(): void {
    this.getProductById();
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router,    
  ){}


  getProductById(){
    this.activatedRoute.params.subscribe(
      product => {
        let id = product['id'];
        this.productService.getProductById(id).subscribe(
          res => {            
            this.name = res.name;
            this.description = res.description;
            this.urlImage = res.urlImage;
            this.price = res.price;
          }
        );
      }
    )    
  }

  addCart(id:NumberFormatStyle){
    let item = new ItemCart(id, this.name,this.quantity, this.price);

    this.cartService.addItemCart(item);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Producto añadido Correctamente al carrito",
      showConfirmButton: false,
      timer: 1800
    });
    this.router.navigate(['/cart']);    
  }

}
