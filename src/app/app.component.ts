import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  public isLoading: Observable<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loaderService.hide();
    });
  }

  ngOnInit(): void {
  }
}
