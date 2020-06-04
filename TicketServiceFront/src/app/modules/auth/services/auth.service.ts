import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../_models/user";
import { StorageService } from "../../../core/services/storage/storage.service";
import { Router } from "@angular/router";
import { Role } from 'src/app/core/model/Role';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient, private storageService : StorageService, private router: Router) {
  
  }

  register(user){
    user.role = new Role();
    user.role.id = 1;
    user.role.roleName = "USER";
    console.log(user);
    return this.http.post<any>("http://localhost:8080/api/user/register", user);
  }


  login(username, password) {
    let user = { username: username, password: password };
    return this.http.post<any>("http://localhost:8080/login", user);

    // return this.http
    //   .post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
    //   .pipe(
    //     map(user => {
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem("currentUser", JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //       return user;
    //     })
    //   );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("currentUser");
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

  public getHeaders() : HttpHeaders{
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);
    return headers;
  }
}
