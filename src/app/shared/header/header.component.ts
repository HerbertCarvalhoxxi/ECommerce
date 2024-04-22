import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() searchChange = new EventEmitter<string>();

  onSearchInput(event: any): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }

  navigate() {
    this.router.navigate(['/cart'])
  }

  navigateToHome() {
    this.router.navigate(['/'])
  }

  constructor(private router: Router){}

}
