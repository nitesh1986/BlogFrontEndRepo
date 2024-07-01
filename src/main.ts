import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment'
import { provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent,{providers: [
  provideHttpClient(),
]})
  .catch(err => console.error(err));

