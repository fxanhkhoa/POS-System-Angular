import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './information.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
    declarations: [
        InformationComponent,
        HomeComponent,
        AboutComponent,
        NotFoundComponent,
        ForbiddenComponent
    ],
    imports: [CommonModule, InformationRoutingModule, SharedModule]
})
export class InformationModule {}
