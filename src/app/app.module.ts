import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquadComponent } from './pages/squad/squad.page';
import { SeasonsComponent } from './pages/seasons/seasons.page';
import { ChallengesComponent } from './pages/challenges/challenges.page';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { AuthService } from './auth/services/auth.service';
import { AuthCallbackComponent } from './auth/components/auth-callback/auth-callback.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreComponent } from './pages/store/store.page';
import { LayoutService } from './services/layout.service';
import { ActivesquadComponent } from './pages/squad/active-squad/active-squad.page';
import { TrainingComponent } from './pages/squad/training/training.page';
import { ClubComponent } from './pages/squad/club/club.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PitchPlayerCardModule } from 'pitch-player-card'
import { StoreHttpService } from './services/http/store.http-service';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { TimeagoModule } from 'ngx-timeago';

import { BuyPageComponent } from './pages/store/buy/buy.page';
import { MatchComponent } from './pages/match/match.page';
import { CurrentSeasonPage } from './pages/seasons/current-season/current-season.page';
import { MatchHistoryPage } from './pages/seasons/match-history/match-history.page';
import { HomePage } from './pages/home/home.page';
import { ThousandSuffixesPipe } from './pipes/thousand-suffixes.pipe';
import { OpenPackPopupComponent } from './components/open-pack-popup/open-pack-popup.component';
import { UnauthorizedInterceptor } from './auth/interceptors/unauthorized.interceptor';
import { SubstitutionDialogComponent } from './components/substitution-dialog/substitution-dialog.component';

import { AuthModule, OidcSecurityService, OpenIdConfiguration, AuthWellKnownEndpoints, OidcConfigService, ConfigResult } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PlayerSelectorDialogComponent } from './components/player-selector-dialog/player-selector-dialog.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatchLineupPlayerCardComponent } from './components/match-lineup-player-card/match-lineup-player-card.component';
import { MatchLineupSquadComponent } from './components/match-lineup-squad/match-lineup-squad.component';



@NgModule({
  declarations: [
    AppComponent,
    SquadComponent,
    SeasonsComponent,
    ChallengesComponent,
    StoreComponent,
    AuthCallbackComponent,
    ActivesquadComponent,
    TrainingComponent,
    ClubComponent,
    ThousandSuffixesPipe,
    BuyPageComponent,
    MatchComponent,
    CurrentSeasonPage,
    MatchHistoryPage,
    HomePage,
    OpenPackPopupComponent,
    SubstitutionDialogComponent,
    PlayerSelectorDialogComponent,
    MatchLineupPlayerCardComponent,
    MatchLineupSquadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    PitchPlayerCardModule,
    InfiniteScrollModule,
    FormsModule,
    AuthModule.forRoot(),
    TimeagoModule.forRoot(),
    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    LayoutService,
    StoreHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true,
    }],
  entryComponents: [OpenPackPopupComponent, SubstitutionDialogComponent, PlayerSelectorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService, private oidcConfigService: OidcConfigService) {
    this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {
      const config: OpenIdConfiguration = {
        stsServer: environment.identityEndpoint,
        client_id: "cbf24cc4a1bb79e441a5b5937be6dd84",
        redirect_url: environment.appUri + "/auth-callback",
        post_logout_redirect_uri: environment.appUri,
        response_type: "id_token",
        scope: "openid",
        post_login_route: "",
        log_console_debug_active: true,
        log_console_warning_active: true,
        storage: localStorage,
        disable_iat_offset_validation: true
      };

      this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
    });
  }
}

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.load_using_custom_stsServer(
      `${environment.identityEndpoint}/.well-known/openid-configuration`
    );
}