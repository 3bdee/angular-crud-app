import { Component, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  constructor(private toastr: ToastrService) {
    const aCollection = collection(this.firestore, 'Products');
    this.items$ = collectionData(aCollection, { idField: 'id' });
  }

  deleteProduct(id: string) {
    // return this.firestore.collection('empleados').doc(id).delete();
    deleteDoc(doc(this.firestore, 'Products', id)).then(() =>
      this.toastr.error('Product has been deleted', 'Delete Product !', {
        positionClass: 'toast-bottom-right',
        progressAnimation: 'decreasing',
        progressBar: true,
      })
    );
  }
}
