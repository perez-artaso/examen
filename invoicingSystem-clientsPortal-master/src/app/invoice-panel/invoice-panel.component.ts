import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RequestingService } from '../services/requesting.service';
import { Invoice } from '../classes/invoice';
import { ServerResponse } from '../classes/server-response';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-invoice-panel',
  templateUrl: './invoice-panel.component.html',
  styleUrls: ['./invoice-panel.component.css']
})
export class InvoicePanelComponent implements OnInit, AfterViewInit {
  invoicesSelected: boolean;
  debitNotesSelected: boolean;
  creditNotesSelected: boolean;
  noInvoices: boolean;
  zeroInvoices: boolean;
  zeroDebitNotes: boolean;
  zeroCreditNotes: boolean;
  invoices: Array<Invoice>;
  debitNotes: Array<Invoice>;
  creditNotes: Array<Invoice>;

  constructor(private requester: RequestingService, private sessionManager: SessionService) { 
    this.invoices = new Array<Invoice>();
    this.debitNotes = new Array<Invoice>();
    this.creditNotes = new Array<Invoice>();
    this.noInvoices = true;
    this.zeroInvoices = true;
    this.zeroDebitNotes = true;
    this.zeroCreditNotes = true;
    this.invoicesSelected = true;
    this.debitNotesSelected = false;
    this.creditNotesSelected = false;
  }

  ngOnInit() {
    // @ts-ignore
    $(document).foundation();
    this.requester.GetInvoiceList().subscribe(
      (serverResponse: ServerResponse) => {
        if (serverResponse.statusCode === 200) {
          this.noInvoices = false;
          this.CategorizeAndStoreInvoices(serverResponse.message);
        }
      }
    );
  }

  ngAfterViewInit() {
  }

  CategorizeAndStoreInvoices(invoiceArray: Array<Invoice>) {
    invoiceArray.forEach(
      (invoice: Invoice) => {
        if (invoice.invoiceType === "FC") {
          this.zeroInvoices = false;
          this.invoices.push(invoice);
        } else if (invoice.invoiceType === "NC") {
          this.zeroCreditNotes = false;
          this.creditNotes.push(invoice);
        } else if (invoice.invoiceType === "ND") {
          this.zeroDebitNotes = false;
          this.debitNotes.push(invoice);
        }
      }
    );
  }

  RequestInvoice(invoiceId: number) {
    window.location.assign('https://localhost/invoicingServer/getInvoice/' + this.sessionManager.GetClientsId() + '/' + invoiceId + '/' + this.GetToken());
  }

  ChangeTab(tab: number) {
    if (tab === 1) {
      this.invoicesSelected = true;
      this.debitNotesSelected = false;
      this.creditNotesSelected = false;
    } else if (tab === 2) {
      this.invoicesSelected = false;
      this.debitNotesSelected = false;
      this.creditNotesSelected = true;
    } else if (tab === 3) {
      this.invoicesSelected = false;
      this.debitNotesSelected = true;
      this.creditNotesSelected = false;
    }
  }

  GetToken() {
    return localStorage.getItem("TIST");
  }
}
