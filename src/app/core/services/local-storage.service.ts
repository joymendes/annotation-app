import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(PLATFORM_ID) protected platformId: Object,
  ) { }

  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.getItem(key);
    } else {
      return EMPTY;
    }
  }

  removeItem(key: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key)
    }
    return true;
  }

  removeAll(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear()
    }
    return true;
  }
}
