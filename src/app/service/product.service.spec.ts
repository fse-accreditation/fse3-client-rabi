import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import {  ConfigService} from './share/config.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductDetail } from 'src/app/entity/product-detail'
import { SellerDetail } from 'src/app/entity/seller-detail';

describe('ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;
	let url = 'http://localhost:50000';
  const email="akash@gmail.com";
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ConfigService

      ]
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from getAllProduct ', () => {
		const productDetailList: ProductDetail[] = [];
    const productDetail: ProductDetail = new ProductDetail();
    const sellerEmail = "akash@gmail.com";
    const sellerDetail: SellerDetail = new SellerDetail();
    sellerDetail.firstName = "Akash";
    sellerDetail.address = "32/c B.N.M Lane";
    sellerDetail.city = "Kolkata";
    sellerDetail.email = sellerEmail;
    sellerDetail.lastName = "Das";
    sellerDetail.phone = "9999876545";
    sellerDetail.pin = "700035";
    sellerDetail.state = "West Bengal";
    sellerDetail.userType = "Seller";

    productDetail.productId = "p1";
    productDetail.productName = "Painting Horse";
    productDetail.shortDescription = "a good painting";
    productDetail.detailDescription = "a very good painting";
    productDetail.category = "Ornament";
    productDetail.sellerEmail = sellerEmail;
    productDetail.startingPrice = 1298.76;
    productDetail.bidEndDate = new Date("2012-04-23");
    productDetail.userDetail = sellerDetail;
    productDetailList.push(productDetail);
    
    service.getAllProductBySeller(email).subscribe((res) => {
        expect(res).toEqual(productDetailList);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/e-auction/api/v1/seller/get-allproduct/${email}`,
    });

    req.flush(productDetailList);
  });
});
