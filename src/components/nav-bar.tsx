import { NavigationMenu, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Truck } from 'lucide-react';
import { Link } from 'react-router';

export default function NavBar() {
  return (
    <NavigationMenu className='w-full justify-between px-8 py-4 shadow-lg'>

      <NavigationMenuLink asChild>
        <Link to="/">
          <div className="flex flex-row items-center gap-2 font-bold text-xl text-primary">
            <Truck className="text-primary" /> <span>TindaTrack</span>
          </div>
        </Link>
      </NavigationMenuLink>

      <div className='flex flex-row font-semibold'>
        {/* <NavigationMenuLink asChild>
          <Link to="/">
            Map
          </Link>
        </NavigationMenuLink> */}
        <NavigationMenuLink asChild>
          <Link to="/items">
            Items
          </Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link to="/salesmen">
            Salesmen
          </Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link to="/accounts">
            Accounts
          </Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link to="/orders">
            Orders
          </Link>
        </NavigationMenuLink>
      </div>
      
    </NavigationMenu>
  )
}