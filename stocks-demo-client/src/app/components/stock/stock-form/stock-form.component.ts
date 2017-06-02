import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Stock} from "../../../model/stock";
import {ActivatedRoute, Router} from "@angular/router";
import {StockService} from "../../../service/stock.service";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup;

  stock: Stock = new Stock(0, '', 0, 0, '', []);

  categories = ['IT', '互联网', '金融'];

  constructor(public routeInfo: ActivatedRoute, public route: Router, public stockService: StockService) { }

  ngOnInit() {
    let stockId = this.routeInfo.snapshot.params['id'];

    let fb = new FormBuilder();

    this.formModel = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      desc: [''],
      categories: fb.array([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ], this.categorySelectValidator)
    });

    this.stockService.getStock(stockId).subscribe(
      data => {
        this.stock = data;
        this.formModel.reset({
          name: data.name,
          price: data.price,
          desc: data.desc,
          categories: [
            data.categories.indexOf(this.categories[0]) != -1,
            data.categories.indexOf(this.categories[1]) != -1,
            data.categories.indexOf(this.categories[2]) != -1,
          ]
        })
      }
    );
  }

  categorySelectValidator(control: FormArray) {
    let valid = false;
    control.controls.forEach(control => {
      if (control.value) {
        valid = true;
      }
    });

    if (valid) {
      return null;
    } else {
      return {categoriesLength: true}
    }
  }

  cancle() {
    this.route.navigateByUrl('/stock');
  }

  save() {
    let chineseCategories = [];
    let index = 0;
    for (let i = 0; i < 3; i++) {
      if (this.formModel.value.categories[i]){
        chineseCategories[index++] = this.categories[i];
      }
    }
    this.formModel.value.categories = chineseCategories;
    this.formModel.value.rating = this.stock.rating;
    console.log(this.formModel.value)
    this.route.navigateByUrl('/stock');
  }

}
