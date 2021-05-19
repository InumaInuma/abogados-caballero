import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { ItemComponent } from './pages/item/item.component';
import { PorfolioComponent } from './pages/porfolio/porfolio.component';

const routes: Routes = [
  { path: 'home', component: PorfolioComponent },
  { path: 'about', component: AboutComponent },
  { path: 'item', component: ItemComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
