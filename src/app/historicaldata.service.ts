import { Injectable } from '@angular/core';
import { UsersData } from './dashboard-form/dashboard-form.component';

@Injectable({
  providedIn: 'root'
})
export class HistoricaldataService {

  usrsData: UsersData[] = [];
  constructor() { }

  getHeroes(): UsersData[] {
    return this.usrsData;
  }
}
