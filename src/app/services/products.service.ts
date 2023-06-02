import { Injectable, Component, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  DocumentReference,
  CollectionReference,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, where } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private firestore: Firestore = inject(Firestore);

  productCollection: CollectionReference;
  constructor(private toastr: ToastrService, private router: Router) {
    this.productCollection = collection(this.firestore, 'Products');
  }

  addProduct(product: any) {
    if (!product) return;
    addDoc(this.productCollection, product)
      .then((documentReference: DocumentReference) => {
        console.log('document added seccessfuly!!');
        this.router.navigate(['/list-product']);
        this.toastr.success('add succes 👌', 'Toastr fun!', {
          progressBar: true,
          timeOut: 3000,
          progressAnimation: 'increasing',
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  getProduct(id: string) {
    const docRef = doc(this.firestore, 'Products', id);
    const docSnap = getDoc(docRef);
    return docSnap;
  }

  updateDoc(id: string, data: any): Promise<any> {
    //return this.firestore.collection('empleados').doc(id).update(data);
    return setDoc(doc(this.firestore, 'Product', id), data);
  }
}
