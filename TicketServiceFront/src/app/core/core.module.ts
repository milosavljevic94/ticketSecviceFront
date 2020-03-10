import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatTableModule,
  MatSlideToggleModule,
  MatCardModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatListModule,
  MatTabsModule
} from "@angular/material";
import { MatGoogleMapsAutocompleteModule } from "@angular-material-extensions/google-maps-autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterModule } from "@angular/router";

import { HttpService } from "./services/http/http.service";
import { StorageService } from "./services/storage/storage.service";

import { NavigationComponent } from "./components/navigation/navigation.component";
@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    MatGoogleMapsAutocompleteModule,
    MatFormFieldModule,
    RouterModule
  ],
  providers: [HttpService, StorageService],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    MatGoogleMapsAutocompleteModule,
    MatFormFieldModule,
    NavigationComponent
  ]
})
export class CoreModule {}
