import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './component/list-product/list-product.component';
import { CreateProductComponent } from './component/create-product/create-product.component';
const routes: Routes = [
  { path: '', redirectTo: 'list-product', pathMatch: 'full' },

  { path: 'create-product', component: CreateProductComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'edit-product/:id', component: CreateProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
