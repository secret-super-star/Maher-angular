import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryClient } from './category-client.service';
import { UserClient } from './user-client.service';
import { ProviderClient } from './provider-client.service';
import { SettingClient } from './setting-client.service';
import { SupportClient } from './support-client.service';
import { AppointmentClient } from './appointment-client.service';
import { PlanClient } from './plan-client.service';
import { ReviewClient } from './review-client.service';
import { CountryClient } from './country-client.service';

const SERVICES = [
  CategoryClient,
  UserClient,
  ProviderClient,
  AppointmentClient,
  SettingClient,
  SupportClient,
  PlanClient,
  ReviewClient,
  CountryClient
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class NetworkModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NetworkModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
