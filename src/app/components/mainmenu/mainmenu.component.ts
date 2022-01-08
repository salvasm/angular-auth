import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {
    isAuth: boolean;

    constructor(private authService: AuthService, private router: Router, private ls: LocalStorageService) { 
        this.isAuth = authService.isUserAuthenticated;
    }

    logout() {
        this.ls.remove('token');
        this.router.navigateByUrl('');
    }

    ngOnInit(): void {}

}
