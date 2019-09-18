import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    /* Otra forma de declarar lazyloading
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    */
    loadChildren: './pages/tabs/tabs.module#TabsPageModule'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
