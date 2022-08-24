import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { menuList as staticMenuList } from '../../data/menus';
import {JwtHelperService} from '@auth0/angular-jwt';


@Component({
  selector: 'll-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() topFixed: boolean;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean;
  menuList = [];
  isLessThenLargeDevice;
  username:string;
  exp:any;
  constructor(private breakpointObserver: BreakpointObserver,
    private router:Router) {}

  ngOnInit(): void {
    debugger
    // if (this.jwtHelper.isTokenExpired(localStorage.getItem('mnd:actkn'))) {
    //   localStorage.setItem('mnd:uid',null);
    //            localStorage.setItem('mnd:uname', null);
    //            this.username=null;
    // } else {
    //   // token valid
    //   this.username=localStorage.getItem('mnd:uname');
    // }
     this.exp=localStorage.getItem('mnd:exp');
    if (this.tokenExpired(localStorage.getItem('mnd:actkn'))) {
     // if ( this.exp < (new Date().getTime() + 1) / 1000) {
        
      // token expired
      localStorage.setItem('mnd:uid',null);
            localStorage.setItem('mnd:uname', null);
            this.username=null;
            this.router.navigate(['/']);

    } else {
      this.username=localStorage.getItem('mnd:uname');

    }
   // this.username=localStorage.getItem('mnd:uname');
    this.menuList = staticMenuList;
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
     
    });
  }
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }
  onLogout(): void {
   
    localStorage.setItem('mnd:uid', "");
    localStorage.setItem('mnd:actkn', "");
    localStorage.setItem('mnd:uname', "");
     localStorage.setItem('mnd:phone',"");
      localStorage.setItem('mnd:isActive', "");
      this.username=null;
     // window.location.reload();
    this.router.navigate(['/']);
  }
}
