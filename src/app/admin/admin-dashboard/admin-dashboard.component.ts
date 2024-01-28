import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  chartOptions: EChartsOption = {};
  chartOptionsBar: EChartsOption = {};
  statsData : any ; 
  ageData : any ; 
  coursesData : any ; 


  constructor(private adminService : AdminService) {}

  async ngOnInit() {
    let statsData = await this.getStatsData(); 
    this.coursesData = statsData['coursesData']
    this.ageData = statsData['ageData']

    this.initializePieChart();
    this.initializeBarChart() ; 
  }

  getStatsData() : Promise<any> {
    return new Promise((resolve ,reject ) => {
      this.adminService.stats().subscribe(
        (response : any) => {
          let data : any =  {} ; 
          
          data['coursesData'] = response.values[0].map( (elem : any) =>  {
            return { value : elem.user_count , name : elem.courses}
          })

          data['ageData'] = response.values[1].map( (elem : any) =>  {
            return { value : elem.user_count , name : elem.age}
          })


          resolve(data); 

        }, 
        (error) => {
          reject(error); 
        }

      )
    }); 
  }

  private initializePieChart() {

    this.chartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: 'Course Student Distribution',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: this.coursesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }


  private initializeBarChart(): void {
    this.chartOptionsBar = {
      title: {
        text: 'Age vs Studen count'
      },
      xAxis: {
        type: 'category',
        data: this.ageData.map( (elem : any) => elem.name ), 
        name : "Age"
      },
      yAxis: {
        type: 'value', 
        name : "User Count"
      },
      series: [{
        data: this.ageData.map( (elem : any) => elem.value ),
        type: 'bar', 
  
      }]
    };
  }

  
}

