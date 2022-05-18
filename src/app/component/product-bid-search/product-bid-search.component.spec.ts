import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductBidSearchComponent } from './product-bid-search.component';
import { ProductService } from '../../service/product.service';
import { BidService } from '../../service/bid.service';
import { UserService } from '../../service/user.service';
import { EventBroadcastService } from '../../service/share/event-broadcast.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetail } from '../../entity/product-detail'
import { of } from 'rxjs';
import { ProductBidDetail } from 'src/app/entity/product-bid-detail';
import { BuyerDetail } from '../../entity/Buyer-detail';
import { SellerDetail } from '../../entity/seller-detail';
import { AuthToken } from '../../entity/authToken';
import {ApiResponse} from '../../entity/apiResponse';
describe('ProductBidSearchComponent', () => {
  let component: ProductBidSearchComponent;
  let fixture: ComponentFixture<ProductBidSearchComponent>;
  beforeEach(async () => {
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
    productDetail.productId = "p1";
    productDetail.productName = "Painting Horse";
    productDetail.shortDescription = "a good painting";
    productDetail.detailDescription = "a very good painting";
    productDetail.category = "Ornament";
    productDetail.sellerEmail = "akash@gmail.com";
    productDetail.startingPrice = 1298.76;
    productDetail.bidEndDate = new Date("2012-04-23");
    productDetail.userDetail = sellerDetail;
    productDetailList.push(productDetail);

    const productBidDetailList: ProductBidDetail[] = [];
    const productBidDetail: ProductBidDetail = new ProductBidDetail();
    productBidDetail.id = "";
    productBidDetail.bidAmount = 1345.34;
    productBidDetail.product = productDetail;
    productBidDetail.userDetail = buyerDetail;

  

    const productService = jasmine.createSpyObj('ProductService', ['getAllProductBySeller']);
    const bidService = jasmine.createSpyObj('BidService', ['getAllProductBid']);
     const getAllProductBySellerSpy = productService.getAllProductBySeller.and.returnValue(of(new ApiResponse(productDetailList)));
    const getAllProductBidSpy = bidService.getAllProductBid.and.returnValue(of(new ApiResponse(productBidDetailList)));
    const authToken: AuthToken = new AuthToken("aswer2345dfgggd876tTy", sellerEmail, "Seller");
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify(authToken);
    });
    await TestBed.configureTestingModule({
      declarations: [ProductBidSearchComponent],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: ProductService, useValue: productService },
        UserService,
        { provide: BidService, useValue: bidService },
        EventBroadcastService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBidSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the product ', () => {
    expect(component.productDetailArray.length).toBe(1);
  });

});
