import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./pages/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RegisterComponent } from "./pages/register/register.component";
import { RouterModule } from "@angular/router";
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  providers: [AuthService]
})
export class AuthenticationModule {}
