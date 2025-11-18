import { Routes } from '@angular/router';
import { PizzalistComponent } from './components/system/pizzalist/pizzalist.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CartComponent } from './components/user/cart/cart.component';
import { UsersComponent } from './components/admin/users/users.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { PizzasComponent } from './components/admin/pizzas/pizzas.component';
import { StatsComponent } from './components/admin/stats/stats.component';
import { MyordersComponent } from './components/user/myorders/myorders.component';

export const routes: Routes = [

  { path: 'pizzalist', component: PizzalistComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },

  { path: 'users', component: UsersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'myorders', component: MyordersComponent },

  { path: 'pizzas', component: PizzasComponent },
  { path: 'stats', component: StatsComponent },

  { path: '', redirectTo: '/pizzalist', pathMatch: 'full'},
  { path: '**', component: NotfoundComponent},

];
