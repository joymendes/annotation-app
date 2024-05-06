import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoading = new BehaviorSubject<boolean>(true);
  public readonly isLoading = this._isLoading.asObservable();

  constructor() {}

  show() {
    this._isLoading.next(true);
  }

  hide() {
    // setTimeout(() => {
      this._isLoading.next(false);
    // }, 500)
  }
}
