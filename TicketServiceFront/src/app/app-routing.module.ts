import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/auth/pages/login/login.component";
import { RegisterComponent } from "./modules/auth/pages/register/register.component";
import { ShellComponent } from "./modules/home/shell/shell.component";
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

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "admin/address", component: AddressComponent },
  { path: "admin/roles", component: RolesAdminComponent },
  { path: "admin/users", component: UsersAdminComponent },
  { path: "admin/locations", component: LocationsAdminComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin/update/location/:id", component: LocationUpdateAdminComponent},
  { path: "manifestations", component: ManifestationsComponent },
  { path: "manifestation/:id", component: ManifestationComponent },
  { path: "tickets", component: UserTicketsComponent },
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
