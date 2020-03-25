import { Component } from "@angular/core";
import { AuthService } from "./modules/auth/services/auth.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ticket-service-app";

  constructor(private authService: AuthService,
    private storageService: StorageService,
    private router: Router) { }

  public logOut() {
    this.authService.logout();
    this.storageService.removeToken();
    (<HTMLElement>document.getElementById("manifestationsUser")).hidden = true;
    (<HTMLElement>document.getElementById("ticketsUser")).hidden = true;
    (<HTMLElement>document.getElementById("reservationsUser")).hidden = true;

    (<HTMLElement>document.getElementById("addressAdmin")).hidden = true;
    (<HTMLElement>document.getElementById("locationsAdmin")).hidden = true;
    (<HTMLElement>document.getElementById("manifestationsAdmin")).hidden = true;
    (<HTMLElement>document.getElementById("reservationsAdmin")).hidden = true;
    (<HTMLElement>document.getElementById("rolesAdmin")).hidden = true;
    (<HTMLElement>document.getElementById("ticketsAdmin")).hidden = true;
    (<HTMLElement>document.getElementById("usersAdmin")).hidden = true;

    (<HTMLElement>document.getElementById("login")).hidden = false;
    (<HTMLElement>document.getElementById("register")).hidden = false;
    (<HTMLElement>document.getElementById("logout")).hidden = true;
 
    this.router.navigate(["/"]);
  }
}
