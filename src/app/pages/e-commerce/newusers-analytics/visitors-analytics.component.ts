import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'newusers-analytics',
  styleUrls: ['./visitors-analytics.component.scss'],
  templateUrl: './visitors-analytics.component.html',
})
export class ECommerceVisitorsAnalyticsComponent implements OnDestroy {
  private alive = true;

  chartLegend: {iconColor: string; title: string}[];

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.setLegendItems(theme.variables.visitorsLegend);
      });
  }

  setLegendItems(visitorsLegend): void {
    this.chartLegend = [
      {
        iconColor: visitorsLegend.firstIcon,
        title: 'New Users',
      }
    ];
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
