import { Component, OnInit } from "@angular/core";
import { LogoComponent } from "@app/shared/components/logo.component";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "tb-white-labeling",
  templateUrl: "./white-labeling.component.html",
  styleUrls: ["./white-labeling.component.scss"],
})
export class WhiteLabelingComponent implements OnInit {
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}
  ngOnInit(): void {}

  labelText = "Drop file here or click to upload";
  imgFile: string;

  whiteLabel = this.fb.group({
    image: ["", Validators.required],
  });

  // get uf() {
  //   return this.whiteLabel.controls;
  // }

  // processFile(event) {
  //   var img = this.whiteLabel.controls["image"].value;
  //   this.labelText = img;
  //   console.log(img);
  //   event.preventDefault();
  // }

  onDragOver(event) {
    event.preventDefault();
  }

  // From drag and drop
  async onDropSuccess(event) {
    event.preventDefault();
    // await this.getBase64(event.dataTransfer.files[0]);
    await this.onImageLeft(event.dataTransfer.files[0]);
  }

  onImageLeft(file: File) {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgFile = reader.result as string;
      this.whiteLabel.patchValue({
        imgSrc: reader.result,
      });
      var img = this.whiteLabel.controls["image"].value;
      this.labelText = img.replace(/^.*\\/, "");
      console.log("1 " + this.imgFile);
    };
    console.log("2 " + this.imgFile);
  }

  getBase64(file) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
        this.imgFile = reader.result as string;
        this.whiteLabel.patchValue({
          imgSrc: reader.result,
        });
      };
      reader.readAsDataURL(file);
      var img = this.whiteLabel.controls["image"].value;
      this.labelText = img.replace(/^.*\\/, "");
    });
  }

  // From click
  onImageChange(e) {
    var img = this.whiteLabel.controls["image"].value;
    this.labelText = img.replace(/^.*\\/, "");

    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.whiteLabel.patchValue({
          imgSrc: reader.result,
        });
        console.log("1 " + this.imgFile);
      };
      console.log("2 " + this.imgFile);
    }
  }

  upload() {
    console.log(this.whiteLabel.value);
    this.httpClient
      .post("http://localhost:8888/file_upload.java", this.whiteLabel.value)
      .subscribe((response) => {
        alert("Image has been uploaded.");
      });
  }

  // uploadFile($event) {
  //   console.log($event.target.files[0]);
  // }

  // changeLogo() {

  // }
}






