import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router) { }
  model: any = {};
  loginForm: FormGroup;
  ngOnInit() {
  }
  get f() { return this.loginForm.controls; }
  login() {
        if(this.model.username == "admin" && this.model.password == "admin"){
        	this.router.navigate(['']);
        }
    }
}
