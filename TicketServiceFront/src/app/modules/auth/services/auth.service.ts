import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../_models/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) {
  
  }

  register(user){
    return <any> this.http.post("http://localhost:8080/register", user);
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
  }
}
