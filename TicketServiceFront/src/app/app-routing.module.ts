import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/auth/pages/login/login.component";
import { RegisterComponent } from "./modules/auth/pages/register/register.component";
import { ShellComponent } from "./modules/home/shell/shell.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "admin",
    loadChildren: "./modules/admin/admin.module#AdminModule"
  },
  { path: "", component: ShellComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
