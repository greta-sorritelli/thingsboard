import { Component, OnInit } from "@angular/core";
import { LogoComponent } from "@app/shared/components/logo.component";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup } from "@material-ui/core";

@Component({
  selector: "tb-white-labeling",
  templateUrl: "./white-labeling.component.html",
  styleUrls: ["./white-labeling.component.scss"],
})
export class WhiteLabelingComponent implements OnInit {

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}
  ngOnInit(): void {}

  labelText = "Drop file here or click to upload";
  imgFile = "";

  whiteLabel = this.fb.group({
    imgSrc: ["", Validators.required],
  });

  // From drag and drop
  onDragOver(event) {
    event.preventDefault();
  }

  onDropSuccess(event) {
    event.preventDefault();
    this.onImageLeft(event.dataTransfer.files[0]);
  }

  async onImageLeft(file: File) {
    await this.getBase64(file);
    this.labelText = file.name;
  }

  // From click
  async onImageChange(e) {
    if (e.target.files && e.target.files.length) {
      var file = e.target.files[0];
    }
    await this.getBase64(file);
    this.labelText = e.target.files[0].name;
  }

  // Reading image
  async getBase64(file) {
    var reader = new FileReader();
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      this.labelText = "Errore, riprova."
    }
    var promise = new Promise(function (resolve) {
      reader.onload = () => {
        resolve(reader.result);
      };
    });
    let res = "";
    var thenedPromise = promise.then(function (value) {
      res = value as string;
    }); 
    await thenedPromise;
    this.imgFile = res;
  }

  upload() {
    console.log(this.whiteLabel.value);
    this.httpClient
      .post("http://localhost:8888/file_upload.java", this.whiteLabel.value)
      .subscribe((response) => {
        alert("Image has been uploaded.");
      });
  }

  // changeLogo() {
  // }
}
