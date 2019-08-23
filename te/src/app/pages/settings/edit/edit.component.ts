import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { ToastService } from '../../../@core/utils/toast.service';
import { CategoryClient } from '../../../@core/network/category-client.service';
import { Category } from '../../../@core/models/category/category';
import { SettingClient } from '../../../@core/network/setting-client.service';
import { Setting } from '../../../@core/models/setting/setting';

@Component({
  selector: 'edit-setting',  
  templateUrl: './edit.component.html',
})
export class EditSettingComponent implements OnInit {    
  updatedSettings: any = {};
  settings: Array<Setting> = [];
  showProgress: boolean = false;
  showProgressButton: boolean = false;  
  
  constructor(private client: SettingClient, private route: ActivatedRoute, private router: Router, private toastService: ToastService) {
    
  }  
  
  ngOnInit() {    
    this.getSettings();
  }
  
  getSettings() {
    this.client.list().subscribe(
      (response) => { 
        this.settings = response;
        for(let i=0; i<this.settings.length; i++) {
          this.updatedSettings[this.settings[i].key] = this.settings[i].value;
        }
      }
    );
  } 
  
  updateSetting() {
    console.log(this.updatedSettings);

    this.showProgressButton = true;

    const formData: FormData = new FormData();
    
    for (let key in this.updatedSettings) {
      formData.append(key, this.updatedSettings[key]);    
    }
    
    this.client.store(formData).subscribe(
      res => {
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.SUCCESS, 'Updated', 'Question updated successfully!');        
      },
      err => {          
        this.showProgressButton = false;
        this.toastService.showToast(NbToastStatus.DANGER, 'Failed', err.error.message);        
      }
    );
  }
  
  formatKey(key) {
    return key.replace(/\_/g, " ");
  }
}
