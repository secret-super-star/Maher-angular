import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';

import {
  ECommerceVisitorsAnalyticsComponent,
} from './newusers-analytics/visitors-analytics.component';
import {
  ECommerceVisitorsAnalyticsChartComponent,
} from './newusers-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import { ECommerceLegendChartComponent } from './legend-chart/legend-chart.component';

import { CountryOrdersComponent } from './category-wise-quiz/country-orders.component';
import { CountryOrdersChartComponent } from './category-wise-quiz/chart/country-orders-chart.component';

import { ECommerceChartsPanelComponent } from './quiz-attempts/charts-panel.component';
import { OrdersChartComponent } from './quiz-attempts/charts/orders-chart.component';
import { ProfitChartComponent } from './quiz-attempts/charts/profit-chart.component';
import { ChartPanelHeaderComponent } from './quiz-attempts/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './quiz-attempts/chart-panel-summary/chart-panel-summary.component';
import { ChartModule } from 'angular2-chartjs';

import { TrafficRevealCardComponent } from './daily-active-users/traffic-reveal-card.component';
import { TrafficBarComponent } from './daily-active-users/front-side/traffic-bar/traffic-bar.component';
import { TrafficFrontCardComponent } from './daily-active-users/front-side/traffic-front-card.component';
import { TrafficCardsHeaderComponent } from './daily-active-users/traffic-cards-header/traffic-cards-header.component';
import { TrafficBackCardComponent } from './daily-active-users/back-side/traffic-back-card.component';
import { TrafficBarChartComponent } from './daily-active-users/back-side/traffic-bar-chart.component';



@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule    
  ],
  declarations: [
    ECommerceComponent,    
    ECommerceChartsPanelComponent,
    ECommerceLegendChartComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    ProfitChartComponent,    
    TrafficRevealCardComponent,
    TrafficBarChartComponent,
    TrafficFrontCardComponent,
    TrafficBackCardComponent,
    TrafficBarComponent,
    TrafficCardsHeaderComponent,
    CountryOrdersComponent,    
    CountryOrdersChartComponent,    
    ECommerceVisitorsAnalyticsComponent,
    ECommerceVisitorsAnalyticsChartComponent,    
  ],
  providers: [    
  ],
})
export class ECommerceModule { }
