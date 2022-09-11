import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

authUser(user:any){
  let userArray=[];
  if(localStorage.getItem('Users')){
    userArray=JSON.parse(localStorage.getItem('Users'));
  }

  return userArray.find((p: { username: any;password:any })=>p.username===user.userName && p.password===user.password);
}

}
