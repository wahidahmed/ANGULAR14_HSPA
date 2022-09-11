import { Injectable } from '@angular/core';
import { IUser } from '../Models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

constructor() { }

addUser(userInfo: IUser){
  let users=[];
  let oldUsers=localStorage.getItem('Users');
  console.log('oldUsers',oldUsers);
  if(oldUsers){
    users=JSON.parse(oldUsers);
    users=[...users,userInfo];
  }
  else {
    users=[userInfo];
  }
  localStorage.setItem('Users', JSON.stringify(users) );
}

}
