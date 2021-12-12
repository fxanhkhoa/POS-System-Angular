import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './shared/enum/role.enum';
import { RoleGuard } from './shared/guard/role.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'information/home'
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./view/auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: 'information',
        loadChildren: () =>
            import('./view/information/information.module').then(
                (m) => m.InformationModule
            )
    },
    {
        path: 'shop',
        loadChildren: () =>
            import('./view/shop/shop.module').then((m) => m.ShopModule),
        canActivate: [RoleGuard],
        data: {
            roles: [Role.ADMIN]
        }
    },
    {
        path: 'product',
        loadChildren: () =>
            import('./view/product/product.module').then((m) => m.ProductModule)
    },
    {
        path: 'invoice',
        loadChildren: () =>
            import('./view/invoice/invoice.module').then((m) => m.InvoiceModule)
    },
    {
        path: '**',
        redirectTo: 'information/not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule {}
