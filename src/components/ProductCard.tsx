import { ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  stock: number;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            -{product.discount}%
          </Badge>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <Badge className="absolute top-2 left-2 bg-orange-500">
            Stok Terbatas
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge className="absolute top-2 left-2 bg-gray-500">
            Habis
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="mb-2">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>
        <h3 className="mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            {product.discount ? (
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 line-through">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                <span className="text-green-600">
                  Rp {discountedPrice.toLocaleString('id-ID')}
                </span>
              </div>
            ) : (
              <span className="text-green-600">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Beli
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
