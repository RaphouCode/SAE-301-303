import { Routes } from '@angular/router';
import { HomeFeatureComponent } from './features/home/home-feature/home-feature.component';
import { ProductListFeatureComponent } from './features/products/product-list-feature/product-list-feature.component';
import { ProductDetailFeatureComponent } from './features/products/product-detail-feature/product-detail-feature.component';
import { CartFeatureComponent } from './features/cart/cart-feature/cart-feature.component';
import { AuthFeatureComponent } from './features/auth/auth-feature/auth-feature.component';
import { AboutFeatureComponent } from './features/about/about-feature/about-feature.component';
import { TeamFeatureComponent } from './features/team/team-feature/team-feature.component';
import { ContactFeatureComponent } from './features/contact/contact-feature/contact-feature.component';
import { CguFeatureComponent } from './features/cgu/cgu-feature/cgu-feature.component';

export const routes: Routes = [
    { path: '', component: HomeFeatureComponent },
    { path: 'about', component: AboutFeatureComponent },
    { path: 'team', component: TeamFeatureComponent },
    { path: 'menu', component: ProductListFeatureComponent },
    { path: 'product/:id', component: ProductDetailFeatureComponent },
    { path: 'cart', component: CartFeatureComponent },
    { path: 'checkout', component: CartFeatureComponent },
    { path: 'login', component: AuthFeatureComponent },
    { path: 'register', component: AuthFeatureComponent },
    {
        path: 'boxes',
        loadComponent: () => import('./features/products/product-list-feature/product-list-feature.component').then(m => m.ProductListFeatureComponent)
    },
    {
        path: 'boxes/:id',
        loadComponent: () => import('./features/products/product-detail-feature/product-detail-feature.component').then(m => m.ProductDetailFeatureComponent)
    },
    { path: 'contact', component: ContactFeatureComponent },
    { path: 'cgu', component: CguFeatureComponent },
    { path: '**', redirectTo: '' }
];
