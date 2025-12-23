import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <h2 className="mb-4">
            Dukung Produk Lokal,
            <br />
            Kembangkan Ekonomi Bersama
          </h2>
          <p className="mb-8 text-green-50 text-lg">
            Belanja produk berkualitas dari anggota koperasi kami. 
            Setiap pembelian Anda membantu meningkatkan kesejahteraan masyarakat lokal.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="secondary" className="gap-2">
              Mulai Belanja
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-green-600">
              Tentang Kami
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
