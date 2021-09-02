import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StockImage } from 'src/app/shared/models/stockImage';

@Component({
  selector: 'app-stock-image',
  templateUrl: './stock-image.component.html',
  styleUrls: ['./stock-image.component.scss']
})
export class StockImageComponent implements OnInit {
  stockImage: StockImage;
  imageName: string = "";
  @Input() editStockImage: StockImage;
  @Output() addStockImage: EventEmitter<StockImage> = new EventEmitter<StockImage>();
  @Output() editStockImageEvent: EventEmitter<StockImage> = new EventEmitter<StockImage>();
  @Output() cancelImageAdd = new EventEmitter();
  invalidFile = false;
  invalidSize = false;


  fileArray: string | ArrayBuffer;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.editStockImage) {
      this.imageName = this.editStockImage.name
      this.fileArray = this.editStockImage.imageData
    }
  }
  public openImageUploadDialog(uploadImageFileInput) {
    uploadImageFileInput.click();
  }

  public async onFileLoaded(event) {
    this.invalidFile = false;
    this.invalidSize = false;
    const file = (<HTMLInputElement>event.target).files[0];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(file.type)) {
      this.invalidFile = true;
      return;
    }
    if (file.size > 6291456) {
      this.invalidSize = true;
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.fileArray = reader.result;
    }

    //this.fileArray = 


    event.target.value = "";
  }

  public getImage() {
    if (!(this.fileArray as string).includes('data:')) {
      let objectURL = 'data:image/png;base64,' + this.fileArray as string;
      let image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      return image;
    }
    let image = this.sanitizer.bypassSecurityTrustUrl(this.fileArray as string);
    return image;
  }

  public setName(event) {
    this.imageName = event.target.value;
  }

  public addImage() {
    let stockImageToAdd: StockImage = {
      imageData: this.fileArray as string,
      name: this.imageName
    };
    if (this.editStockImage === undefined) {
      this.addStockImage.emit(stockImageToAdd);
    } else {
      this.editStockImageEvent.emit(stockImageToAdd);
    }

  }

  public cancel() {
    this.cancelImageAdd.emit()
  }

  public deleteImage(){
    this.fileArray =undefined;
  }

}
