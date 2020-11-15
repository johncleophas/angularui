import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorisationGuard } from './providers/authorisation.guard';

const userModule = () => import('./modules/user/user.module').then(x => x.UserModule);
const homeModule = () => import('./modules/home/home.module').then(x => x.HomeModule);
const subscriptionModule = () => import('./modules/subscription/subscription.module').then(x => x.SubscriptionModule);

const routes: Routes = [
  { path: '', loadChildren: homeModule, canActivate: [AuthorisationGuard] },
  { path: 'user', loadChildren: userModule},
  { path: 'subscription', loadChildren: subscriptionModule, canActivate: [AuthorisationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
