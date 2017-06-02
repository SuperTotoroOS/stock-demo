import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { MainSidebarComponent } from './layout/main-sidebar/main-sidebar.component';
import { ContentWrapperComponent } from './layout/content-wrapper/content-wrapper.component';
import { MainFooterComponent } from './layout/main-footer/main-footer.component';
import { ControlSidebarComponent } from './layout/control-sidebar/control-sidebar.component';

import { StockFormComponent } from './components/stock/stock-form/stock-form.component';
import { StockManagerComponent } from './components/stock/stock-manager/stock-manager.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {WebSocketService} from './service/web-socket.service';
import {StockService} from './service/stock.service';
import { StockFilterPipe } from './pipe/stock-filter.pipe';
import { StarsComponent } from './components/stars/stars.component';

const routeConfig: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'stock', component: StockManagerComponent},
  {path: 'stock/:id', component: StockFormComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    MainFooterComponent,
    ControlSidebarComponent,
    StockFormComponent,
    StockManagerComponent,
    DashboardComponent,
    StockFilterPipe,
    StarsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routeConfig, {useHash : true})
  ],
  providers: [WebSocketService, StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
