import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  id: number = 0;
  name: string = '';
  
  ngOnInit(): void {
    this.getCategoryById();
  }


  constructor (
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){}

  addCategory(){
    let category =new Category(this.id,this.name);
    this.categoryService.createCategory(category).subscribe(
      res => {
        Swal.fire('Success', 'Categoría  Agregada Correctamente ', 'success');
        this.router.navigate(['/admin/category']);
      }      
    );
  }

  getCategoryById(){
    this.activatedRoute.params.subscribe(
      category => {
        let id = category['id'];
        this.categoryService.getCategoryById(id).subscribe(
          res => {
            this.id = res.id;
            this.name = res.name;
          }
        )
      }
    )
  }

  

}
