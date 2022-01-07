import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {
    isAuth: boolean;

    constructor(private authService: AuthService, private router: Router) { 
        this.isAuth = authService.isUserAuthenticated;
    }

    logout() {
        this.authService.logout()
        this.router.navigateByUrl('');
    }

    ngOnInit(): void {}

}
