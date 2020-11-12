import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  status=false;
  constructor(private dataService: DataService,private router:Router) { }

  ngOnInit(): void {
  }
  isScrolled = false;

@HostListener("window:scroll")
scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
}
showSearchBar(){
this.status =!this.status;
}
signOut(){
  this.dataService.signOut()
}
}