import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  productCounts: Record<string, number>;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  productCounts,
}: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="mb-4">Kategori Produk</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'Semua' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('Semua')}
          className="gap-2"
        >
          Semua
          <Badge variant="secondary">{productCounts['Semua'] || 0}</Badge>
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => onCategoryChange(category)}
            className="gap-2"
          >
            {category}
            <Badge variant="secondary">{productCounts[category] || 0}</Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}
