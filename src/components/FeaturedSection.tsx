import { TrendingUp, Award, Package } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function FeaturedSection() {
  const features = [
    {
      icon: Award,
      title: 'Produk Berkualitas',
      description: 'Semua produk telah melalui kontrol kualitas ketat',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: TrendingUp,
      title: 'Harga Terjangkau',
      description: 'Langsung dari produsen tanpa perantara',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Package,
      title: 'Pengiriman Cepat',
      description: 'Dikirim dalam 1-3 hari kerja',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="flex items-start gap-4 p-6">
              <div className={`p-3 rounded-lg ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
