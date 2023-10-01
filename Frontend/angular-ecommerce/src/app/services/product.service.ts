import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrl = environment.luv2shopApiUrl + '/products';

    private categoryUrl = environment.luv2shopApiUrl + '/product-category';

    constructor(private httpClient: HttpClient) {
    }

    getProduct(theProductId: number): Observable<Product> {
        const productUrl = `${ this.baseUrl }/${ theProductId }`;
        return this.httpClient.get<Product>(productUrl);
    }

    getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProduct> {
        const searchUrl = `${ this.baseUrl }/search/findByCategoryId?id=${ theCategoryId }`
            + `&page=${ thePage }&size=${ thePageSize }`;
        return this.httpClient.get<GetResponseProduct>(searchUrl);
    }

    getProductList(theCategoryId: number): Observable<Product[]> {
        const searchUrl = `${ this.baseUrl }/search/findByCategoryId?id=${ theCategoryId }`;
        return this.getProducts(searchUrl);
    }

    searchProduct(theKeyword: string): Observable<Product[]> {
        const searchUrl = `${ this.baseUrl }/search/findByNameContaining?name=${ theKeyword }`;
        return this.getProducts(searchUrl);
    }

    searchProductsPaginate(thePage: number,
                           thePageSize: number,
                           theKeyword: string): Observable<GetResponseProduct> {

        const searchUrl = `${ this.baseUrl }/search/findByNameContaining?name=${ theKeyword }`
            + `&page=${ thePage }&size=${ thePageSize }`;
        return this.httpClient.get<GetResponseProduct>(searchUrl);
    }

    private getProducts(searchUrl: string): Observable<Product[]> {
        return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
            map(response => response._embedded.products)
        );
    }

    getProductCategories(): Observable<ProductCategory[]> {
        return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
            map(response => response._embedded.productCategory)
        );
    }

}

interface GetResponseProduct {
    _embedded: {
        products: Product[];
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number,
    }
}

interface GetResponseProductCategory {
    _embedded: {
        productCategory: ProductCategory[];
    }
}

