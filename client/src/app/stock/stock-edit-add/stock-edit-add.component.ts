import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StockAccessory } from 'src/app/shared/models/stockAccessory';
import { StockImage } from 'src/app/shared/models/stockImage';
import { StockItem } from 'src/app/shared/models/stockItem';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-edit-add',
  templateUrl: './stock-edit-add.component.html',
  styleUrls: ['./stock-edit-add.component.scss']
})
export class StockEditAddComponent implements OnInit {
  errors: string[];
  success: boolean = false;
  form: FormGroup;
  images: Array<StockImage> = [];
  accessories: Array<StockAccessory> = [];
  showImageAddComponent = false;
  showAccessoryAddComponent = false;
  stockAccessoryEdit: StockAccessory;
  stockImageEdit: StockImage;
  @Input() editStockItemId: number;
  stockItemEdit: StockItem;


  constructor(private route: ActivatedRoute,private fb: FormBuilder, private sanitizer: DomSanitizer, private stockService: StockService,private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.editStockItemId = +this.route.snapshot.paramMap.get('id');
    if (this.editStockItemId) {
      this.stockService.getStockItem(this.editStockItemId).subscribe(res => {
        this.stockItemEdit = res;
        this.stockItemEdit.vIN = res.vin;
        this.createAndFillForm();
        this.accessories = this.stockItemEdit.accessories;
        this.images = this.stockItemEdit.stockImages;
      })
    }
  }

  public addImage(stockImage: StockImage) {
    this.images.push(stockImage);
    this.showImageAddComponent = false;
  }

  public updateImage(stockImage: StockImage) {
    this.showImageAddComponent = false;
    const index = this.images.indexOf(this.stockImageEdit, 0);
    if (index > -1) {
      this.images[index] = stockImage;
    }
    this.stockImageEdit = undefined;
  }

  public addAccessory(stockAccessory: StockAccessory) {
    this.accessories.push(stockAccessory);
    this.showAccessoryAddComponent = false;
  }

  public editStockAccessory(stockAccessory: StockAccessory) {
    this.showAccessoryAddComponent = false;
    const index = this.accessories.indexOf(this.stockAccessoryEdit, 0);
    if (index > -1) {
      this.accessories[index] = stockAccessory;
    }
    this.stockAccessoryEdit = undefined;
  }

  public getImage(fileArray: string) {
    if (!fileArray.includes('data:')) {
      let objectURL = 'data:image/png;base64,' + fileArray;
      let image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      return image;
    }
    else{
      let image = this.sanitizer.bypassSecurityTrustUrl(fileArray as string);
      return image;
    }
    
  }

  public showImageAdd() {
    this.showImageAddComponent = true;
  }

  public hideImageAdd() {
    this.showImageAddComponent = false;
    this.stockImageEdit = undefined;
  }
  public editImage(image: StockImage) {
    this.stockImageEdit = image;
    this.showImageAddComponent = true;
  }

  public showAccessoryAdd() {
    this.showAccessoryAddComponent = true;
  }

  public hideAccessoryAdd() {
    this.showAccessoryAddComponent = false;
    this.stockAccessoryEdit = undefined;
  }

  public deleteImage(image: StockImage) {
    const index = this.images.indexOf(image, 0);
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }

  public deleteAccessory(acc: StockAccessory) {
    const index = this.accessories.indexOf(acc, 0);
    if (index > -1) {
      this.accessories.splice(index, 1);
    }
  }
  public editAccessory(acc: StockAccessory) {
    this.stockAccessoryEdit = acc;
    this.showAccessoryAddComponent = true;
  }

  createForm() {
    this.form = this.fb.group({
      registrationNumber: [null, [Validators.required]],
      make: [null, [Validators.required]],
      model: [null, [Validators.required]],
      modelYear: [null, [Validators.required, Validators.pattern('.{4,4}')]],
      mileage: [null, [Validators.required]],
      color: [null, [Validators.required]],
      vIN: [null, [Validators.required]],
      retailPrice: [null, [Validators.required]],
      costPrice: [null, [Validators.required]],
      dateCreated: [null],
      dateUpdated: [null],
    });
  }

  createAndFillForm() {
    this.form = this.fb.group({
      registrationNumber: [this.stockItemEdit.registrationNumber, [Validators.required]],
      make: [this.stockItemEdit.make, [Validators.required]],
      model: [this.stockItemEdit.model, [Validators.required]],
      modelYear: [this.stockItemEdit.modelYear, [Validators.required, Validators.pattern('.{4,4}')]],
      mileage: [this.stockItemEdit.mileage, [Validators.required]],
      color: [this.stockItemEdit.color, [Validators.required]],
      vIN: [this.stockItemEdit.vIN, [Validators.required]],
      retailPrice: [this.stockItemEdit.retailPrice, [Validators.required]],
      costPrice: [this.stockItemEdit.costPrice, [Validators.required]],
      dateCreated: [null],
      dateUpdated: [null],
    });
  }

  public mapFormToModel(value: any) {

    this.images.forEach(i => {
      i.imageData = i.imageData.replace(/^data:image\/[a-z]+;base64,/, "")
    })

    var stockItem: StockItem = {
      id: this.editStockItemId?this.editStockItemId:0,
      registrationNumber: value.registrationNumber,
      make: value.make,
      model: value.model,
      modelYear: value.modelYear as number,
      mileage: value.mileage as number,
      color: value.color,
      vIN: value.vIN,
      retailPrice: value.retailPrice,
      costPrice: value.costPrice,
      accessories: this.accessories,
      stockImages: this.images,
      dateCreated: this.stockItemEdit ? this.stockItemEdit.dateCreated : new Date() ,
      dateUpdated:this.stockItemEdit ? new Date(): new Date()

    };
    return stockItem;
  }

  onSubmit() {
    if (this.form) {
      var stockItem = this.mapFormToModel(this.form.value);
      if (this.editStockItemId) {
        this.stockService.updateStockItem(stockItem).subscribe(response => {
          this.router.navigateByUrl('/stock/list');
          this.errors = [];
          this.success = true;
        }, error => {
  
          this.errors = error.error.errors;
        });
      }
      else{
        this.stockService.addStockItem(stockItem).subscribe(response => {
          this.router.navigateByUrl('/stock/list');
          this.errors = [];
          this.success = true;
        }, error => {
  
          this.errors = error.error.errors;
        });
      }

    }
  }

}
