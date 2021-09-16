import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authority } from "@shared/models/authority.enum";
import { WhiteLabelingComponent } from "./white-labeling.component";

const routes: Routes = [
  {
    path: "white-labeling",
    component: 
      WhiteLabelingComponent,
    data: {
      auth: [Authority.TENANT_ADMIN],
      title: "White Labeling",
      breadcrumb: {
        label: "White Labeling",
        icon: "brush",
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class WhiteLabelingRoutingModule { }

