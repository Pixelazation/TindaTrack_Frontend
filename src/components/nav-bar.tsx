import { NavigationMenu, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Link } from 'react-router';

export default function NavBar() {
  return (
    <NavigationMenu className='w-full justify-between px-8 py-4 shadow-lg'>

      <NavigationMenuLink asChild>
        <Link to="/">
          TindaTrack
        </Link>
      </NavigationMenuLink>

      <div className='flex flex-row'>
        <NavigationMenuLink asChild>
          <Link to="/">
            Map
          </Link>
        </NavigationMenuLink>
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
      </div>
      
    </NavigationMenu>
  )
}