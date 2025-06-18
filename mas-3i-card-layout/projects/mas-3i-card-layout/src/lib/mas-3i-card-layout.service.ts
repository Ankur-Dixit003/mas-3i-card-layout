import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { ResolutionMode } from '@makinomachineinc/components';
import { GridLayoutSetting, MachineSortSetting, UIConfig } from '@makinomachineinc/mas-3i-models';
import { EnvironmentService } from '@makinomachineinc/mas-3i-environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CardLayoutService {

  // machineSortSettings: MachineSortSetting[] = [];
  gridLayoutSettings: GridLayoutSetting = new GridLayoutSetting({gridLayoutCols: 4});
  defaultGridLayoutSettings: GridLayoutSetting = new GridLayoutSetting({gridLayoutCols: 4});

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/Json'
    })
  }

  constructor(private _http: HttpClient, private environmentService: EnvironmentService) { }

  getUISettings() {
    const getUIConfigURL: URL = new URL(`http://${this.environmentService.environment().dmApiIp}:16003`);
    getUIConfigURL.pathname = 'api/UIConfig';

    return this._http.get<UIConfig[]>(getUIConfigURL.toString(), this.httpOptions);
  }

  // parseMachineForDisplay(machineCards:any) {
  //   machineCards.sort((a:any,b:any)=> {
  //     const sortA = this.machineSortSettings.find(setting => setting.customerName === a.customerMachineName)?.sortNumber ?? Infinity;
  //     const sortB = this.machineSortSettings.find(setting => setting.customerName === b.customerMachineName)?.sortNumber ?? Infinity;

  //     //Sorting by number
  //     if(sortA !== sortB){
  //       return sortA-sortB;
  //     }

  //     //If number is not available, sorting by customerMachineName
  //     return a.customerMachineName.localeCompare(b.customerMachineName);
  //   })
  // }

  @HostListener('window:resize', ['$event'])
  public _setGridAreas() {
    if (document.documentElement.clientWidth < 700) {
      this.setAreaStyle('SD');
    }
    else if (document.documentElement.clientWidth >= 700 && document.documentElement.clientWidth < 1264) {
    }
    else if (document.documentElement.clientWidth >= 1264) {
      this.setAreaStyle('FHD');
    }
  }

  public resolutionMode: ResolutionMode = undefined;

  private setAreaStyle(resolutionMode: any) {
    this.resolutionMode = resolutionMode;
    switch (resolutionMode) {
      case 'SD':
        if (this.defaultGridLayoutSettings.gridLayoutCols as number > 2 || !this.gridLayoutSettings.gridLayoutCols) {
          this.gridLayoutSettings.gridLayoutCols = 2;
        }
        break;
      case 'HD':
        if (this.defaultGridLayoutSettings.gridLayoutCols as number > 4 || !this.gridLayoutSettings.gridLayoutCols) {
          this.gridLayoutSettings.gridLayoutCols = 4;
        }
        break;
      case 'FHD':
      default:
        this.ResetUISettings();
        break;
    }
  }

  public ResetUISettings() {
    if (this.gridLayoutSettings != this.defaultGridLayoutSettings) {
      this.gridLayoutSettings = _.cloneDeep(this.defaultGridLayoutSettings);
    }
  }
}
