export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  regular_price: string;
  sales_price: string;
  sku: string;
  stock_status: string;
  featured: boolean;
  quantity: number;
  image_name: string;
  image_des: string;
  category_id: number;
  timestamp: Date;
}
