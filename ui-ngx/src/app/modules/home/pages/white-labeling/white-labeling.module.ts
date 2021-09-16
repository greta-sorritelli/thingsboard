import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { HomeComponentsModule } from "@home/components/home-components.module";
import { WhiteLabelingRoutingModule } from "./white-labeling-routing.module";
import { WhiteLabelingComponent } from "./white-labeling.component";

@NgModule({
  declarations: [WhiteLabelingComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeComponentsModule,
    WhiteLabelingRoutingModule,
  ],
})
export class WhiteLabelingModule {}
