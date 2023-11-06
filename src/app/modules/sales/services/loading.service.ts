import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loader: boolean = false;
  constructor() { }

  loading(): boolean {
    return this.loader = !this.loader;
  }

  viewLoader(): boolean {
    return this.loader;
  }

}
