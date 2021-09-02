import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  isUserLoggedIn = false;
  constructor(private router: Router,private accountService: AccountService) {
    this.accountService.loggedInEvent.subscribe(res =>{
      if (localStorage.getItem('token')) {
        this.isUserLoggedIn = true;
      }
    });
   }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isUserLoggedIn = true;
    }
  }

  logout(){
    this.isUserLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('role');
    this.router.navigateByUrl('/');
  }

}
