import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../model/UserDTO';
import { StorageService } from '../../services/storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {

  users : UserDTO[] = [];

  constructor(private http: HttpClient, private storageService: StorageService) { }

  ngOnInit() {
    this.loadUsers();
  }

  public loadUsers(){
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.get<UserDTO[]>('http://localhost:8080/api/user/allUsers', {headers:headers}).subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }

  public delete(id : number) {
    console.log(id);

    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.delete('http://localhost:8080/api/user/'+id, {headers:headers}).subscribe((data) => {
      alert("User deleted!");
      this.loadUsers();
    },
    error => {
      alert("User deleted!");
      this.loadUsers();
    });
  }


}
