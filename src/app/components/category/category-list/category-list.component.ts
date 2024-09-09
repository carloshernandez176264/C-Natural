import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {


  ngOnInit(): void {
    this.listCategories();
  }

  categories : Category[] = [];


  constructor(
    private categoryService: CategoryService,
    private router: Router    
  ){}

  listCategories(){
    this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    );
  }

  deleteCategoryById(id: number){

    Swal.fire({
      title: 'Estas seguro de eliminar la categoría?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if(result.isConfirmed){
        this.categoryService.deleteCategoryById(id).subscribe(
          data => {
            console.log('Category deleted');
            this.listCategories();
          }
        )
        Swal.fire(
          'Borrar',
          'La categoría ha sido eliminada',
          'success'
        )
      }
    })
      
      
    
  }

}
