import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role} from '../../model/Role';
import { StorageService } from '../../services/storage/storage.service';


@Component({
  selector: 'app-roles-admin',
  templateUrl: './roles-admin.component.html',
  styleUrls: ['./roles-admin.component.scss']
})
export class RolesAdminComponent implements OnInit {

  roles: Role[] = [];
  roleCreate: Role = new Role();

  constructor(private http: HttpClient, private storageService: StorageService) { }
  
  ngOnInit() {
    this.loadRoles();
  }

  public loadRoles(){
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);
    
    this.http.get<Role[]>('http://localhost:8080/api/role/allRole',{ headers: headers }).subscribe((data) => {
      this.roles = data;
      console.log(data);
      
    });
  }


  public delete(id : number) {
    console.log(id);

    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.delete('http://localhost:8080/api/role/'+id, {headers:headers}).subscribe((data) => {
      alert("Role deleted!");
      this.loadRoles();
    },
    error => {
      alert("Role deleted!");
      this.loadRoles();
    });
  }

  public update(id : number) {
    
    let roleUpdate = new Role();
    roleUpdate.id = id;
    roleUpdate.roleName = (<HTMLInputElement>document.getElementById("id"+id)).value; 
    console.log(roleUpdate);
    
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.put('http://localhost:8080/api/role/updateRole', roleUpdate,{headers:headers}).subscribe((data) => {
      alert("Role updated!");
      this.loadRoles();
    },
    error => {
      alert("Role updated!");
      this.loadRoles();
    });
  }

  public create(id : number) {
    
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.post('http://localhost:8080/api/role/addRole',this.roleCreate, {headers:headers}).subscribe((data) => {
      alert("Role created!");
      this.roleCreate = new Role();
      this.loadRoles();
    },
    error => {
      alert("Role created!");
      this.roleCreate = new Role();
      this.loadRoles();
    });
  }

}
