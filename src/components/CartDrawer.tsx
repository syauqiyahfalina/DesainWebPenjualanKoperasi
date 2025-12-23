import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from './ui/sheet';
import { Separator } from './ui/separator';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.discount 
      ? item.price - (item.price * item.discount / 100)
      : item.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Keranjang Belanja ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <ShoppingBag className="w-16 h-16 mb-4" />
            <p>Keranjang belanja kosong</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              {items.map((item) => {
                const itemPrice = item.discount 
                  ? item.price - (item.price * item.discount / 100)
                  : item.price;

                return (
                  <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="mb-1 line-clamp-1">{item.name}</h4>
                      <p className="text-green-600 mb-2">
                        Rp {itemPrice.toLocaleString('id-ID')}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 ml-auto text-red-500 hover:text-red-600"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pajak (10%)</span>
                  <span>Rp {tax.toLocaleString('id-ID')}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-green-600">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <SheetFooter>
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
