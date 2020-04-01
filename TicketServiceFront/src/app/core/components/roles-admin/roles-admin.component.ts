import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../../model/Role';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../../modules/auth/services/auth.service';


@Component({
  selector: 'app-roles-admin',
  templateUrl: './roles-admin.component.html',
  styleUrls: ['./roles-admin.component.scss']
})
export class RolesAdminComponent implements OnInit {

  roles: Role[] = [];
  roleCreate: Role = new Role();

  constructor(private http: HttpClient, private storageService: StorageService, private authService: AuthService) { }

  ngOnInit() {
    this.loadRoles();
  }

  public loadRoles() {

    let headers = this.authService.getHeaders();

    this.http.get<Role[]>('http://localhost:8080/api/role/allRole', { headers: headers }).subscribe((data) => {
      this.roles = data;
      console.log(data);
    });
  }


  public delete(id: number) {
    if (!this.reservedRoleValidation(id,"delete",(<HTMLInputElement>document.getElementById("id" + id)).value)) {
      this.loadRoles();
      return;
    }

    let headers = this.authService.getHeaders();

    this.http.delete('http://localhost:8080/api/role/' + id, { headers: headers }).subscribe((data) => {
      this.loadRoles();
    });
  }

  public update(id: number) {

    let roleUpdate = new Role();
    roleUpdate.id = id;
    roleUpdate.roleName = (<HTMLInputElement>document.getElementById("id" + id)).value;
    console.log(roleUpdate.roleName);
    
    if (!this.validation(roleUpdate)) {
      this.loadRoles();
      return;
    }

    if (!this.reservedRoleValidation(id,"update",roleUpdate.roleName)) {
      this.loadRoles();
      return;
    }

    let headers = this.authService.getHeaders();

    this.http.put('http://localhost:8080/api/role/updateRole', roleUpdate, { headers: headers }).subscribe((data) => {
      alert("Role updated!");
      this.loadRoles();
    });
  }

  public create(id: number) {

    if (!this.validation(this.roleCreate))
      return;

    if (!this.reservedRoleValidation(id,"create",this.roleCreate.roleName)) {
      return;
    }

    let headers = this.authService.getHeaders();

    this.http.post('http://localhost:8080/api/role/addRole', this.roleCreate, { headers: headers }).subscribe((data) => {
      this.roleCreate = new Role();
      this.loadRoles();
    });
  }

  public validation(roleToCheck: Role) {

    if (roleToCheck.roleName === "") {
      alert("Role name can not be empty!");
      return false;
    }

    return true;
  }

  public reservedRoleValidation(id: number, operation: string, roleName: string) {
    if(operation === "create" && (id == 1 || id == 2)){
      alert("Role '" + roleName + "'already exists!");
      return false;
    } else if(id == 1 || id == 2) {
      alert("You can not " + operation + " role '" + roleName + "', because it is reserved role!");
      return false;
    } else {
      return true;
    }
  }

}
