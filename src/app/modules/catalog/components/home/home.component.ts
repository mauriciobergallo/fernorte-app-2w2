import { Component } from '@angular/core';

@Component({
  selector: 'fn-home-catalog',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showReports = false;
  showGraph = false;

  public isCollapsedReports = false;
  public isCollapsedCharts = false;


  toggleCollapseReports() {
    this.isCollapsedReports = !this.isCollapsedReports;
    this.isCollapsedCharts = false;
  }

  
  toggleCollapseCharts () {
    this.isCollapsedCharts = !this.isCollapsedCharts;
    this.isCollapsedReports = false;
  }

}
