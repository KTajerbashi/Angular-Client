import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MockUserDataService } from './core/services/mock-user-data-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()), // Add this
    // In-memory web API configuration
    {
      provide: 'USE_IN_MEMORY_API',
      useValue: true,
    },
    MockUserDataService,
    provideRouter(
      routes,
      withComponentInputBinding(), // Bind route params to @Input()
      withInMemoryScrolling({
        // Restore scroll position
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withViewTransitions(),
    ),
    provideClientHydration(withEventReplay()),
  ],
};
