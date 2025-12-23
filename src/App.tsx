import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedSection } from './components/FeaturedSection';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard, Product } from './components/ProductCard';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Kopi Arabika Premium Gayo',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFuc3xlbnwxfHx8fDE3NjYzODM1Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Makanan & Minuman',
    rating: 4.8,
    description: 'Kopi arabika pilihan dari dataran tinggi Gayo, aroma khas dan rasa premium',
    stock: 45,
    discount: 15,
  },
  {
    id: 2,
    name: 'Beras Organik Premium 5kg',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1717769020939-1efbc6028229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcmljZXxlbnwxfHx8fDE3NjYzODkxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Bahan Pokok',
    rating: 4.9,
    description: 'Beras organik tanpa pestisida, pulen dan bergizi tinggi',
    stock: 120,
  },
  {
    id: 3,
    name: 'Paket Sayuran Segar Harian',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzY2MzcyMTI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Bahan Pokok',
    rating: 4.7,
    description: 'Sayuran segar langsung dari petani lokal, dipetik setiap pagi',
    stock: 8,
  },
  {
    id: 4,
    name: 'Kerajinan Anyaman Bambu',
    price: 175000,
    image: 'https://images.unsplash.com/photo-1745371086773-7f911122dfd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kaWNyYWZ0JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzY2NDY1MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Kerajinan',
    rating: 4.6,
    description: 'Kerajinan tangan berkualitas tinggi dari pengrajin lokal',
    stock: 15,
    discount: 10,
  },
  {
    id: 5,
    name: 'Madu Hutan Murni 500ml',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1645549826194-1956802d83c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaG9uZXl8ZW58MXx8fHwxNzY2MzgwNTkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Makanan & Minuman',
    rating: 4.9,
    description: 'Madu asli dari hutan Indonesia, 100% murni tanpa campuran',
    stock: 32,
    discount: 20,
  },
  {
    id: 6,
    name: 'Kue Tradisional Nusantara Box',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1738225734433-9fb17ed770a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHNuYWNrc3xlbnwxfHx8fDE3NjY0NjUyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Makanan & Minuman',
    rating: 4.5,
    description: 'Aneka kue tradisional dibuat dengan resep turun temurun',
    stock: 25,
  },
  {
    id: 7,
    name: 'Kopi Robusta Specialty Grade',
    price: 98000,
    image: 'https://images.unsplash.com/photo-1675306408031-a9aad9f23308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFuc3xlbnwxfHx8fDE3NjYzODM1Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Makanan & Minuman',
    rating: 4.7,
    description: 'Kopi robusta dengan body kuat dan crema sempurna',
    stock: 0,
  },
  {
    id: 8,
    name: 'Tas Anyaman Pandan Premium',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1745371086773-7f911122dfd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kaWNyYWZ0JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzY2NDY1MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Kerajinan',
    rating: 4.8,
    description: 'Tas anyaman pandan yang elegan dan ramah lingkungan',
    stock: 18,
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const cats = new Set(mockProducts.map((p) => p.category));
    return Array.from(cats);
  }, []);

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'Semua': mockProducts.length,
    };
    categories.forEach((cat) => {
      counts[cat] = mockProducts.filter((p) => p.category === cat).length;
    });
    return counts;
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Semua' || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success(`${product.name} ditambahkan ke keranjang`);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${product.name} ditambahkan ke keranjang`);
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          discount: product.discount,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Produk dihapus dari keranjang');
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Hero />
      <FeaturedSection />

      <div className="container mx-auto px-4 py-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          productCounts={productCounts}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Tidak ada produk yang ditemukan</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Menampilkan {filteredProducts.length} produk
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Toaster position="top-right" />

      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="mb-4">Koperasi Nusantara</h3>
              <p className="text-gray-400 text-sm">
                Mendukung produk lokal berkualitas dan memberdayakan ekonomi masyarakat Indonesia.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Tautan Cepat</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white">Produk</a></li>
                <li><a href="#" className="hover:text-white">Cara Belanja</a></li>
                <li><a href="#" className="hover:text-white">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Hubungi Kami</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@koperasinusantara.id</li>
                <li>Telp: (021) 1234-5678</li>
                <li>Alamat: Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Koperasi Nusantara. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
