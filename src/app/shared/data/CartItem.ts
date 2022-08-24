export interface CartItem {
  CartId: number;
  UserId: number;
  Username: string;
  BookId: number;
  Quantity: number
  CartTotal: number;
  DiscountPer: number;
  IsActive: boolean;
  NetPay: number;
  Title: string
}