import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestingService } from '../services/requesting.service';
import { Client } from '../classes/client';
import { ServerResponse } from '../classes/server-response';
declare const $: any;

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  onDelete: boolean;
  clientList: Array<Client>;
  filteredList: Array<Client>;
  clientToDelete: Client;
  searchBarInput: string;
  noSearch: boolean;

  constructor(private requester: RequestingService) { 
    this.clientList = new Array<Client>();
    this.filteredList = new Array <Client>();
    this.clientToDelete = new Client (0, "", "");
    this.noSearch = true;
    this.onDelete = false;
  }

  ngOnInit() {
    $(document).foundation();
    this.RequestClientList();
  }

  ToggleDeleteModal(id: number, name: string, mail: string) {
    this.clientToDelete = new Client (id, name, mail);
    this.onDelete = true;
  }

  DeleteClient() {
    this.requester.DeleteClient(this.clientToDelete.id).subscribe(
      (serverResponse: ServerResponse) => {
        if (serverResponse.statusCode === 200) {
          this.clientList = [];
          this.RequestClientList();
        } else {
          alert(serverResponse.message);
        }
      }
    );
    this.onDelete = false;
  }

  RequestClientList() {
    this.requester.ReadClients().subscribe(
      (serverResponse: ServerResponse) => {
        if(serverResponse.statusCode === 200) {
          serverResponse.message.forEach(
            (client: Client) => {
              this.clientList.push(new Client(client.id, client.mail, client.name, client.extraIds));
            }
          );
        }
      }
    );
  }

  onSearch() {
    if (this.searchBarInput !== "") this.noSearch = false; else this.noSearch = true;
    this.filteredList = this.clientList.filter(
      (client: Client) => {
        return client.name.match(this.searchBarInput) || 
        client.id.toString().match(this.searchBarInput) || 
        client.mail.match(this.searchBarInput) || 
        client.extraIds.toString().match(this.searchBarInput);
      }
    );
  }

  CloseDeletingConfirmationMessage() {
    this.onDelete = false;
  }

}