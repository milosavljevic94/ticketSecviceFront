import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor() {}

  saveToken(token: string): void {
    localStorage.setItem("user-token", token);
  }

  getToken() {
    return localStorage.getItem("user-token");
  }

  removeToken() {
    localStorage.removeItem("user-token");
  }

  setLocalObject(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalObject(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
