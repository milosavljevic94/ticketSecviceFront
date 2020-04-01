import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../model/UserDTO';
import { StorageService } from '../../services/storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {

  users : UserDTO[] = [];

  constructor(private http: HttpClient, private storageService: StorageService, private authService: AuthService) { }

  ngOnInit() {
    this.loadUsers();
  }

  public loadUsers(){
    let headers = this.authService.getHeaders();

    this.http.get<UserDTO[]>('http://localhost:8080/api/user/allUsers', {headers:headers}).subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }

  public delete(id : number) {
    let headers = this.authService.getHeaders();

    this.http.delete('http://localhost:8080/api/user/'+id, {headers:headers}).subscribe((data) => {
      this.loadUsers();
    });
  }

  


}
