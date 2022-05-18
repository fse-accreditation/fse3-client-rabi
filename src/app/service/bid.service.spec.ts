import { TestBed } from '@angular/core/testing';
import { BidService } from './bid.service';
import { HttpClientModule } from '@angular/common/http';
import {  ConfigService} from './share/config.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductDetail } from 'src/app/entity/product-detail'
import { ProductBidDetail } from 'src/app/entity/product-bid-detail';
import { BuyerDetail } from 'src/app/entity/Buyer-detail';
import { SellerDetail } from 'src/app/entity/seller-detail';
describe('BidService', () => {
  let service: BidService;
  let httpController: HttpTestingController;
	let url = 'http://localhost:50000';
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
    service = TestBed.inject(BidService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from getAllProductBid ', () => {
		
    const productId="p1";
    const sellerEmail = "akash@gmail.com";
    const productDetailList: ProductDetail[] = [];
    const buyerDetail: BuyerDetail = new BuyerDetail();
    buyerDetail.firstName = "Rajatavo";
    buyerDetail.address = "21/b GH Lane";
    buyerDetail.city = "Kolkata";
    buyerDetail.email = "rajatavo@gmail.com";
    buyerDetail.lastName = "Dutta";
    buyerDetail.phone = "9987652311";
    buyerDetail.pin = "700023";
    buyerDetail.state = "West Bengal";
    buyerDetail.userType = "Buyer";

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

    const productDetail: ProductDetail = new ProductDetail();
    productDetail.productId = productId;
    productDetail.productName = "Painting Horse";
    productDetail.shortDescription = "a good painting";
    productDetail.detailDescription = "a very good painting";
    productDetail.category = "Ornament";
    productDetail.sellerEmail = "akash@gmail.com";
    productDetail.startingPrice = 1298.76;
    productDetail.bidEndDate = new Date("2012-04-23");
    productDetail.userDetail = sellerDetail;
    productDetailList.push(productDetail);

    let productBidDetailList: ProductBidDetail[] = [];
    const productBidDetail: ProductBidDetail = new ProductBidDetail();
    productBidDetail.id = "";
    productBidDetail.bidAmount = 1345.34;
    productBidDetail.product = productDetail;
    productBidDetail.userDetail = buyerDetail;
    productBidDetailList=[productBidDetail];
    
    service.getAllProductBid(productId).subscribe((res) => {
        expect(res).toEqual(productBidDetailList);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/e-auction/api/v1/seller/show-bids/${productId}`,
    });

    req.flush(productBidDetailList);
  });
});
