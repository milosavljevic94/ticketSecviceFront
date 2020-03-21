import { Component } from "@angular/core";
import { AuthService } from "./modules/auth/services/auth.service";
import { StorageService } from "src/app/core/services/storage/storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ticket-service-app";

  constructor(private authService: AuthService,
    private storageService: StorageService) { }

  public logOut() {
      this.authService.logout();
      this.storageService.removeToken();
  }
}
