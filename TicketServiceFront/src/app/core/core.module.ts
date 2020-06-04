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
import { AddressComponent } from './components/address/address.component';
import { ManifestationsComponent } from './components/manifestations/manifestations.component';
import { ManifestationComponent } from './components/manifestation/manifestation.component';
import { UserTicketsComponent } from './components/user-tickets/user-tickets.component';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { RolesAdminComponent } from './components/roles-admin/roles-admin.component';
import { LocationsAdminComponent } from './components/locations-admin/locations-admin.component';
import { LocationUpdateAdminComponent } from './components/location-update-admin/location-update-admin.component';
import { ReservationsAdminComponent } from './components/reservations-admin/reservations-admin.component';
import { TicketsAdminComponent } from './components/tickets-admin/tickets-admin.component';
import { ManifestationsAdminComponent } from './components/manifestations-admin/manifestations-admin.component';
import { TicketReportsComponent } from './components/ticket-reports/ticket-reports.component';
import { SectorsAdminComponent } from './components/sectors-admin/sectors-admin.component';
import { ManifestationNamePipe } from './pipes/ManifestationNamePipe';

@NgModule({
  declarations: [AddressComponent, ManifestationsComponent, ManifestationComponent, UserTicketsComponent, UserReservationsComponent, HomePageComponent, UsersAdminComponent, RolesAdminComponent, LocationsAdminComponent, LocationUpdateAdminComponent, ReservationsAdminComponent, TicketsAdminComponent, ManifestationsAdminComponent, TicketReportsComponent, SectorsAdminComponent, ManifestationNamePipe],
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
  ]
})
export class CoreModule {}
