import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  updateForm: FormGroup;
  selectedUser: User;
  users: Array<User>;

  constructor(private fb: FormBuilder) {
    this.selectedUser = new User('', '', false, false, '0');
    this.users = new Array<User>();
    this.updateForm = this.fb.group({
      name: [ '', Validators.required ],
      email: [ '', Validators.compose([Validators.required, Validators.email])],
      anatomy: [ false ],
      geography: [ false ],
      type: [ '0', Validators.required ]
    });
    this.users.push(new User('Julio Chavez', 'chavezjulio@gmail.com', true, false, '0'));
    this.users.push(new User('Martin Gomez', 'gomez@gmail.com', false, true, '1'));
  }

  ngOnInit() {

  }

  onUpdateUser(user: User) {
    this.updateForm.controls['name'].setValue(user.name);
    this.updateForm.controls['email'].setValue(user.email);
    this.updateForm.controls['anatomy'].setValue(user.anatomy);
    this.updateForm.controls['geography'].setValue(user.geography);
    this.updateForm.controls['type'].setValue(user.type);
    this.toggleUpdateUser();
  }

  onDeleteUser(user: User) {
    this.selectedUser = user;
    this.toggleDeleteUser();
  }

  toggleUpdateUser() {
    document.getElementById('updateForm').style.display === 'none' ?
    document.getElementById('updateForm').style.display = 'block' :
    document.getElementById('updateForm').style.display = 'none';
  }

  toggleDeleteUser() {
    document.getElementById('deleteModal').style.display === 'none' ?
    document.getElementById('deleteModal').style.display = 'block' :
    document.getElementById('deleteModal').style.display = 'none';
  }

  onUpdateSubmition() {
    
  }

  onUpdateCancelation() {

  }

  deletingCancelation() {
    this.toggleDeleteUser();
  }

  updatingCancelation() {
    this.toggleUpdateUser();
  }

}
