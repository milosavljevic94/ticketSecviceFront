import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AuthenticationModule } from "./modules/auth/auth.module";
import { ShellModule } from "./modules/home/shell.module";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { AdminModule } from "./modules/admin/admin.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { MatGoogleMapsAutocompleteModule } from "@angular-material-extensions/google-maps-autocomplete";
import { AgmCoreModule } from "@agm/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DatePipe } from '@angular/common'


import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AuthenticationModule,
    ShellModule,
    HttpClientModule,
    CoreModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatGoogleMapsAutocompleteModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyASA1PH4V5-ZK3mRpFF5Yn2ZbtnMl7UnIc"
    }),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
