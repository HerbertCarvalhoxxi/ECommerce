export interface ProductResponse {
  data: {
    allProducts: Product[];
  };
}

export interface Product {
  id: string;
  name: string;
  price_in_cents: number;
  image_url: string;
  sales: number;
  created_at: string;
  category: string;
  description: string;
}
