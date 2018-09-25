import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import * as $ from 'jquery';

@Component({
  selector: 'app-account-invitation',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
  providers: []
})
export class RegistryComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor() {
  }  
}
