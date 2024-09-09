import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/common/category';
import { Product } from 'src/app/common/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  id:number = 0;
  code: string = '';
  name: string = '';
  description: string = '';
  price: number |null = null;
  urlImage: string = '';
  userId: string = '1';
  categoryId: string = '1';


  selectFile! : File;
  fileName: string = '';
 
  categories: Category [] = [];

 constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,

 ){}

  ngOnInit(): void {
    this.getCategories();
    this.getProductById(this.id);
    
  }

  addProduct() {
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price?.toString() || '');
  
    // Asegúrate de que 'selectFile' sea un objeto de tipo File o Blob
    if (this.selectFile) {
      formData.append('image', this.selectFile);
    }
  
    formData.append('urlImage', this.urlImage);
    formData.append('userId', this.userId);
    formData.append('categoryId', this.categoryId);
  
    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        console.log(response);
        if (this.id == 0) {
          Swal.fire('Success', 'Producto Agregado Correctamente', 'success');
        } else {
          Swal.fire('Success', 'Producto Actualizado Correctamente', 'success');
        }
        // Navegar a la página de productos solo si es exitoso
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'An error occurred', 'error');
      }
    });
  }
  
  
   
  

  getProductById(id: number){
    this.activatedRoute.params.subscribe(
      prod => {
        let id = prod['id'];
        if(id){
          this.productService.getProductById(id).subscribe(
            product => {
              this.id = product.id;
              this.code = product.code;
              this.name = product.name;
              this.description = product.description;
              this.price = product.price;
              this.urlImage = product.urlImage;
              this.userId = product.userId;
              this.categoryId = product.categoryId;
            }
          )
        }

      }
    )
      
  }

  onFileSelected(event: any){
    this.selectFile = event.target.files[0];
    if(this.selectFile){
      this.fileName  = this.selectFile.name;
    }
  }

  getCategories(){
    return this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    );
  }

  

}
