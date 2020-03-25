import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../services/auth.service";
import { StorageService } from "src/app/core/services/storage/storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    if (this.storageService.getLocalObject("currentUser")) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          this.storageService.saveToken(data.token);
          
          this.storageService.setLocalObject("currentUser", data);
          this.router.navigate(["/manifestations"]);
          
          if(data.authorities[0].authority == "ROLE_ADMIN") {

            (<HTMLElement>document.getElementById("manifestationsUser")).hidden = true;
            (<HTMLElement>document.getElementById("ticketsUser")).hidden = true;
            (<HTMLElement>document.getElementById("reservationsUser")).hidden = true;
            
            (<HTMLElement>document.getElementById("addressAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("locationsAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("manifestationsAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("reservationsAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("rolesAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("ticketsAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("usersAdmin")).hidden = false;
            
            (<HTMLElement>document.getElementById("login")).hidden = true;
            (<HTMLElement>document.getElementById("register")).hidden = true;
            (<HTMLElement>document.getElementById("logout")).hidden = false;
              
          } else {
            (<HTMLElement>document.getElementById("manifestationsUser")).hidden = false;
            (<HTMLElement>document.getElementById("ticketsUser")).hidden = false;
            (<HTMLElement>document.getElementById("reservationsUser")).hidden = false;
            
            (<HTMLElement>document.getElementById("addressAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("locationsAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("manifestationsAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("reservationsAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("rolesAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("ticketsAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("usersAdmin")).hidden = true;
            
            (<HTMLElement>document.getElementById("login")).hidden = true;
            (<HTMLElement>document.getElementById("register")).hidden = true;
            (<HTMLElement>document.getElementById("logout")).hidden = false;
            
          }
          
          
          alert("Login successful!");
          console.log(data);
        },
        error => {
          alert("Login failed. Try again!");
          console.log(error);
        }
      );
  }
}
