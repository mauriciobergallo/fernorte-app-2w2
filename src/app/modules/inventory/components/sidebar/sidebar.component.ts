import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fn-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  ngOnInit(): void {
    let credential = JSON.parse(localStorage.getItem('credentials') || 'N/N');
    this.actualRole = credential.role[1];
  }
  actualRole: string = '';
}
