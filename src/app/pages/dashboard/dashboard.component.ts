import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { OnInit } from '@angular/core';

import { DashboardService }
from '../../services/dashboard.service';

import {
  ChartData,
  ChartOptions,
  ChartType
} from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent
implements OnInit {


  constructor(
  private dashboardService:
  DashboardService
) {}

ngOnInit(): void {

  this.dashboardService
  .getDashboardData()
  .subscribe({

    next: (data) => {

      this.totalMovies =
      data.totalMovies;

      this.totalDirectors =
      data.totalDirectors;

      this.totalProducers =
      data.totalProducers;

      this.averageRating =
      data.averageRating;

    },

    error: (err) => {

      console.log(err);

    }

  });

}
  totalMovies = 0;

totalDirectors = 0;

totalProducers = 0;

averageRating = 0;

  // Pie Chart

  pieChartType: 'doughnut' = 'doughnut';

  pieChartData: ChartData<'doughnut'> = {
    labels: [
      'Action',
      'Drama',
      'Comedy',
      'Horror'
    ],
    datasets: [
      {
        data: [10, 20, 15, 5]
      }
    ]
  };

  pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    }
  };

}