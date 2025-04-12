export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    countInStock: number;
    imageUrl: string;
  }
  
  export interface OrderItem {
    product: string | Product; // Can be just the product ID or the full product
    quantity: number;
    price: number;
  }
  
  export interface ShippingAddress {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface Order {
    _id: string;
    user: string;
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    totalPrice: number;
    isDelivered: boolean;
  }
  