import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'setalolap-ui';
  public isLoggedin: boolean = false;


  constructor(
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
  }

}
