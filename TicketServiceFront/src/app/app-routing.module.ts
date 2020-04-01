import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/auth/pages/login/login.component";
import { RegisterComponent } from "./modules/auth/pages/register/register.component";
import {AddressComponent} from "./core/components/address/address.component";
import {ManifestationsComponent} from "./core/components/manifestations/manifestations.component";
import {ManifestationComponent} from "./core/components/manifestation/manifestation.component";
import {UserReservationsComponent} from "./core/components/user-reservations/user-reservations.component";
import {UserTicketsComponent} from "./core/components/user-tickets/user-tickets.component";
import {HomePageComponent} from "./core/components/home-page/home-page.component";
import {UsersAdminComponent} from "./core/components/users-admin/users-admin.component";
import {RolesAdminComponent} from "./core/components/roles-admin/roles-admin.component";
import {LocationsAdminComponent} from "./core/components/locations-admin/locations-admin.component";
import {LocationUpdateAdminComponent} from "./core/components/location-update-admin/location-update-admin.component";
import {ReservationsAdminComponent} from "./core/components/reservations-admin/reservations-admin.component";
import {TicketsAdminComponent} from "./core/components/tickets-admin/tickets-admin.component";
import {ManifestationsAdminComponent} from "./core/components/manifestations-admin/manifestations-admin.component";
import {TicketReportsComponent} from "./core/components/ticket-reports/ticket-reports.component";
import {SectorsAdminComponent} from "./core/components/sectors-admin/sectors-admin.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "admin/address", component: AddressComponent },
  { path: "admin/roles", component: RolesAdminComponent },
  { path: "admin/users", component: UsersAdminComponent },
  { path: "admin/locations", component: LocationsAdminComponent },
  { path: "admin/tickets", component: TicketsAdminComponent },
  { path: "admin/manifestations", component: ManifestationsAdminComponent },
  { path: "admin/manifestations/:id/sectors", component: SectorsAdminComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin/update/location/:id", component: LocationUpdateAdminComponent},
  { path: "admin/reservations", component: ReservationsAdminComponent},
  { path: "manifestations", component: ManifestationsComponent },
  { path: "manifestation/:id", component: ManifestationComponent },
  { path: "tickets", component: UserTicketsComponent },
  { path: "ticketReport/:type/:id", component: TicketReportsComponent },
  { path: "reservations", component: UserReservationsComponent },
  {
    path: "admin",
    loadChildren: "./modules/admin/admin.module#AdminModule"
  },
  { path: "", component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
