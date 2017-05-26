import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import {MdButtonModule, MdCheckboxModule,MdInputModule, MaterialModule} from '@angular/material';
import { HomeComponent } from './home/home.component';

import {NuccoreService} from './services/nuccore.service';

import {GenomesService} from './services/genomes.service';

import {xml2js} from 'xml2js';

const resourceURL :string = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=";

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule, MdCheckboxModule,MdInputModule, MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [NuccoreService, GenomesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
