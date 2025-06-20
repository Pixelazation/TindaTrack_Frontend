import { useState } from 'react';
import type { Purchase } from '../../types/purchase';
import { Button } from '../ui/button';
import { Check, Edit, Trash } from 'lucide-react';
import { Input } from '../ui/input';

interface Props {
  index: number;
  purchase: Purchase;
  onUpdate?: (index: number, updated: Purchase) => void;
  onDelete: (purchase: Purchase) => void;
}

export default function PurchaseItem({ index, purchase, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState<boolean>(false);

  const [quantity, setQuantity] = useState<number>(purchase.quantity);
  const [unitPrice, setUnitPrice] = useState<number>(purchase.unitPrice);

  const totalAmount = quantity * unitPrice;
  const item = purchase.item;

  function handleSave() {
    const updated = { ...purchase, quantity, unitPrice, totalAmount: totalAmount };
    console.log(updated);
    onUpdate?.(index, updated);
    setEditing(false);
  }

  return (
    <div className="grid grid-cols-8 items-center gap-4 text-xs">
      <div className="flex flex-col col-span-3">
        <span className="text-sm">{item.name}</span>
        <span className="text-gray-600">{item.itemCode}</span>
      </div>

      {editing ? (
        <>
          <Input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.valueAsNumber)}
          />
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.valueAsNumber)}
          />
          <span className="font-medium col-span-2">
            PHP {(unitPrice * quantity).toFixed(2)}
          </span>
          <Button type="button" variant="outline" onClick={handleSave}>
            <Check />
          </Button>
        </>
      ) : (
        <>
          <span className="text-gray-600">
            PHP {unitPrice.toFixed(2)}
          </span>
          <span className="text-gray-600">{quantity}</span>
          <span >PHP {totalAmount.toFixed(2)}</span>
          <Button type="button" variant="outline" onClick={() => setEditing(true)}>
            <Edit />
          </Button>
          <Button type="button" variant="destructive" onClick={() => onDelete(purchase)}>
            <Trash />
          </Button>
        </>
      )}
    </div>
  );
}
