import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../../core/core.module";
import { AgmCoreModule } from "@agm/core";
import { MatGoogleMapsAutocompleteModule } from "@angular-material-extensions/google-maps-autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material";
import { ADMIN_ROUTES } from "./admin.routes";
import { RouterModule } from "@angular/router";

import { AddLocationComponent } from "./add-location/add-location.component";
import { AdminHomeComponent } from "./admin-home/admin-home.component";

@NgModule({
  declarations: [AddLocationComponent, AdminHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTES),
    CoreModule,
    AgmCoreModule,
    MatGoogleMapsAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [AddLocationComponent, AdminHomeComponent]
})
export class AdminModule {}
