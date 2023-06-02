import { Component, inject } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
//export class CreateProductComponent {}
export class CreateProductComponent {
  createProduct: FormGroup;
  submitted = false;
  id: string | null;
  update = false;
  private firestore: Firestore = inject(Firestore);
  constructor(
    private fb: FormBuilder,
    private _productService: ProductsService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private nav: Router
  ) {
    this.createProduct = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      prix_vente: ['', Validators.required],
      prix_achat: ['', Validators.required],
      quantite: ['', Validators.required],
      fournisseur: ['', Validators.required],
    });
    this.id = this.router.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  addEditableProduct() {
    this.submitted = true;
    if (this.createProduct.invalid) {
      return;
    }
    if (this.id === null) {
      this.update = false;
      this.ajouterProduit();
    } else {
      this.update = true;
      this.editProduct(this.id);
    }
  }
  ngOnInit() {
    this.isEdited();
  }

  ajouterProduit() {
    this.submitted = true;
    if (this.createProduct.invalid) return;

    const product: any = {
      nom: this.createProduct.value.nom,
      date: this.createProduct.value.date.toString(),
      description: this.createProduct.value.description,
      prix_vente: this.createProduct.value.prix_v.toString(),
      prix_achat: this.createProduct.value.prix_c.toString(),
      quantite: this.createProduct.value.quantite.toString(),
      fournisseur: this.createProduct.value.fournisseur,
    };

    this._productService.addProduct(product);
  }
  editProduct(id: string) {
    const product: any = {
      nom: this.createProduct.value.nom,
      date: this.createProduct.value.date.toString(),
      description: this.createProduct.value.description,
      prix_vente: this.createProduct.value.prix_v.toString(),
      prix_achat: this.createProduct.value.prix_c.toString(),
      quantite: this.createProduct.value.quantite.toString(),
      fournisseur: this.createProduct.value.fournisseur,
    };
    this._productService
      .updateDoc(id, product)
      .then((documentReference: DocumentReference) => {
        console.log('document updated seccessfuly!!');
        this.nav.navigate(['/list-product']);
        this.toastr.success('update succes 👌', 'Update Product', {
          progressBar: true,
          timeOut: 3000,
          progressAnimation: 'increasing',
        });
      });
  }

  isEdited() {
    if (this.id !== null) {
      this._productService.getProduct(this.id).then((doc) => {
        console.log(doc.data());
        const pro: any = doc.data();
        this.createProduct.setValue(pro);
      });
    }
  }
}
