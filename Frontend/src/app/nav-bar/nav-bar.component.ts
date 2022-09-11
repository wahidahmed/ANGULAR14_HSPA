import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private alertify:AlertifyService) { }

  loggedInUser:string;

  ngOnInit() {
  }

  loggedIn(){
    this.loggedInUser=localStorage.getItem('token');
    return this.loggedInUser;
  }

  onLogout(){
     localStorage.removeItem('token');
     this.alertify.success('you are logged out');
  }
}
