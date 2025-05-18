import { useState, useRef, useEffect } from "react";

interface SubMenuItem {
  id: number;
  name: string;
  link: string;
}

interface MenuItem {
  id: number;
  name: string;
  link: string;
  hasSubmenu: boolean;
  submenus?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { id: 1, name: "SON DAKİKA", link: "#", hasSubmenu: true, submenus:[
    { id: 12, name: "Dünya'da Son Dakika", link: "#" },
    { id: 11, name: "Türkiye'de Son Dakika", link: "#" },
    { id: 13, name: "İstanbul'da Son Dakika", link: "#" },
    { id: 14, name: "Ankara'da Son Dakika", link: "#" },
    { id: 15, name: "İzmir'de Son Dakika", link: "#" },
    { id: 16, name: "Bursa'da Son Dakika", link: "#" },
    { id: 17, name: "Aydın'da Son Dakika", link: "#" },
  ] },
  { id: 2, name: "YAZARLAR", link: "#", hasSubmenu: true, submenus: [
    { id: 21, name: "Köşe Yazarları", link: "#" },
    { id: 22, name: "Konuk Yazarlar", link: "#" },
    { id: 23, name: "Yazı Dizileri", link: "#" },
    { id: 24, name: "Şiirler", link: "#" },
    { id: 25, name: "Romanlar", link: "#" },
  ]},
  { id: 3, name: "GÜNDEM", link: "#", hasSubmenu: true, submenus: [
    { id: 31, name: "İstanbul'da Gündem", link: "#" },
    { id: 32, name: "Türkiye'de Gündem", link: "#" },
    { id: 33, name: "Dünya Gündemi", link: "#" },
    { id: 34, name: "Spor Gündemi", link: "#" },
    { id: 35, name: "Magazin Gündemi", link: "#" },
    { id: 36, name: "Kültür Gündemi", link: "#" },
    { id: 37, name: "Ekonomi Gündemi", link: "#" },
  ] },
  { id: 4, name: "EKONOMİ", link: "#", hasSubmenu: true, submenus: [
    { id: 41, name: "Döviz", link: "#" },
    { id: 42, name: "Borsa", link: "#" },
    { id: 43, name: "Kredi", link: "#" },
    { id: 44, name: "Kripto", link: "#" },
    { id: 45, name: "Altın", link: "#" },
    { id: 46, name: "Faiz", link: "#" },

  ]},
  { id: 5, name: "DÜNYA", link: "#", hasSubmenu: true, submenus: [
    { id: 51, name: "Dünya Haberleri", link: "#" },
    { id: 52, name: "Savaş Haberleri", link: "#" },
    { id: 53, name: "Ekonomi Haberleri", link: "#" },
    { id: 54, name: "Siyasi Haberleri", link: "#" },
    { id: 55, name: "Sosyal Medya", link: "#" },
  ] },
  { id: 6, name: "GÜNÜN İÇİNDEN", link: "#", hasSubmenu: true, submenus: [
    { id: 61, name: "Günün Haberleri", link: "#" },
    { id: 62, name: "Günün Spor Haberleri", link: "#" },
    { id: 63, name: "Günün Ekonomi Haberleri", link: "#" },
    { id: 64, name: "Günün Kültür Haberleri", link: "#" },
    { id: 65, name: "Günün Siyasi Haberleri", link: "#" },
    { id: 66, name: "Günün Tüm Haberleri", link: "#" },
  ] },
  { id: 7, name: "SPOR", link: "#", hasSubmenu: true, submenus: [
    { id: 71, name: "Futbol", link: "#" },
    { id: 72, name: "Basketbol", link: "#" },
    { id: 73, name: "Formula 1", link: "#" },
    { id: 74, name: "Voleybol", link: "#" },
    { id: 75, name: "Tenis", link: "#" },
    { id: 76, name: "Günün Tüm Spor Haberleri", link: "#" },
  ]},
  { id: 8, name: "HAYAT", link: "#", hasSubmenu: true, submenus: [
    { id: 81, name: "Günün Haberleri", link: "#" },
    { id: 82, name: "Günün Spor Haberleri", link: "#" },
    { id: 83, name: "Günün Ekonomi Haberleri", link: "#" },
    { id: 84, name: "Günün Kültür Haberleri", link: "#" },
    { id: 85, name: "Günün Siyasi Haberleri", link: "#" },
    { id: 86, name: "Günün Tüm Haberleri", link: "#" },
  ] },
  { id: 9, name: "MAGAZİN", link: "#", hasSubmenu: true, submenus: [
    { id: 91, name: "Günün Magazin Haberleri", link: "#" },
    { id: 92, name: "Günün Spor Magazin Haberleri", link: "#" },
    { id: 93, name: "Günün Ekonomi Magazin Haberleri", link: "#" },
    { id: 94, name: "Günün Kültür Magazin Haberleri", link: "#" },
    { id: 95, name: "Günün Siyasi Magazin Haberleri", link: "#" },
    { id: 96, name: "Günün Tüm Magazin Haberleri", link: "#" },
  ] },
  { id: 10, name: "FİNANS", link: "#", hasSubmenu: true, submenus: [
    { id: 101, name: "Günün Finans Haberleri", link: "#" },
    { id: 102, name: "Günün Spor Finans Haberleri", link: "#" },
    { id: 103, name: "Günün Ekonomi Finans Haberleri", link: "#" },
  ] },
  { id: 11, name: "RESMİ İLANLAR", link: "#", hasSubmenu: true, submenus: [
    { id: 111, name: "Günün Resmi İlanları", link: "#" },
    { id: 112, name: "Günün Spor Resmi İlanları", link: "#" },
    { id: 113, name: "Günün Ekonomi Resmi İlanları", link: "#" },
    { id: 114, name: "Günün Kültür Resmi İlanları", link: "#" },
    { id: 115, name: "Günün Siyasi Resmi İlanları", link: "#" },
  ] },
];

const HIDE_SUBMENU_DELAY = 150; // milliseconds

export default function NavigationMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<{[key: number]: HTMLLIElement | null}>({});
  const submenuRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterItemOrSubmenu = (id: number) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setActiveMenu(id);
  };

  const handleMouseLeaveItemOrSubmenu = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, HIDE_SUBMENU_DELAY);
  };

  // Calculate positions for rendering submenus
  const getSubmenuPosition = (id: number) => {
    // Using the ref for the <li> which is menuRefs.current[id]
    // or the <a> tag via getElementById if that's preferred.
    // The original code used getElementById for the <a> tag.
    const menuItemLinkElement = document.getElementById(`menu-item-${id}`);
    if (menuItemLinkElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const menuItemRect = menuItemLinkElement.getBoundingClientRect();
      return {
        top: navRect.bottom, // Position below the navigation bar
        left: menuItemRect.left // Align with the left of the menu item link
      };
    }
    // Fallback position, though ideally the elements should always be found
    const navBottom = navRef.current ? navRef.current.getBoundingClientRect().bottom : 60;
    const fallbackLeft = menuRefs.current[id] ? menuRefs.current[id]!.getBoundingClientRect().left : 0;
    return { top: navBottom, left: fallbackLeft };
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeMenu === null) return;

      const menuItemElement = menuRefs.current[activeMenu];
      const submenuElement = submenuRefs.current[activeMenu];

      if (
        menuItemElement && !menuItemElement.contains(event.target as Node) &&
        (!submenuElement || !submenuElement.contains(event.target as Node))
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);


  return (
    <div className="relative">
      <nav className="bg-white shadow-md sticky top-0 z-10" ref={navRef}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-news-dark hover:text-news-red p-2"
              >
                {mobileMenuOpen ? (
                  <span className="text-2xl">✕</span>
                ) : (
                  <span className="text-2xl">☰</span>
                )}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block w-full">
              <ul className="flex space-x-1 py-4 overflow-x-auto justify-center">
                {menuItems.map((item) => (
                  <li
                    key={item.id}
                    className="relative"
                    ref={(el) => { menuRefs.current[item.id] = el; }}
                    onMouseEnter={() => handleMouseEnterItemOrSubmenu(item.id)}
                    onMouseLeave={handleMouseLeaveItemOrSubmenu}
                  >
                    <a
                      href={item.link}
                      id={`menu-item-${item.id}`} // ID used by getSubmenuPosition
                      className="px-2 py-2 text-sm font-bold text-news-dark hover:text-news-red whitespace-nowrap inline-block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empty div for spacing in mobile view */}
            <div className="md:hidden"></div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {menuItems.map((item) => (
                <div key={item.id}>
                  <button
                    className="w-full text-left px-3 py-2 text-base font-medium text-news-dark hover:text-news-red hover:bg-gray-50 rounded-md"
                    onClick={() => {
                      if (item.hasSubmenu) {
                        setOpenMobileMenu(openMobileMenu === item.id ? null : item.id);
                      } else {
                        // Handle navigation for items without submenu if needed
                        setMobileMenuOpen(false); // Optionally close main mobile menu
                      }
                    }}
                  >
                    {item.name} {item.hasSubmenu && (openMobileMenu === item.id ? "▲" : "▼")}
                  </button>

                  {/* Mobile Submenu */}
                  {item.hasSubmenu && openMobileMenu === item.id && (
                    <div className="pl-6">
                      {item.submenus?.map((subitem) => (
                        <a
                          key={subitem.id}
                          href={subitem.link}
                          className="block px-3 py-2 text-sm text-news-dark hover:text-news-red hover:bg-gray-50 rounded-md"
                          onClick={() => setMobileMenuOpen(false)} // Close mobile menu on subitem click
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Desktop Submenus - Rendered outside of the navigation container */}
      <div className="hidden md:block">
        {menuItems.map((item) =>
          item.hasSubmenu && activeMenu === item.id && (
            <div
              key={`submenu-${item.id}`}
              ref={(el) => { submenuRefs.current[item.id] = el; }}
              className="absolute z-50 min-w-[200px] bg-white shadow-lg rounded-md p-2"
              style={{
                ...getSubmenuPosition(item.id)
              }}
              onMouseEnter={() => handleMouseEnterItemOrSubmenu(item.id)}
              onMouseLeave={handleMouseLeaveItemOrSubmenu}
            >
              <ul>
                {item.submenus?.map((subitem) => (
                  <li key={subitem.id}>
                    <a
                      href={subitem.link}
                      className="block px-4 py-2 text-sm text-news-dark hover:bg-gray-100 hover:text-news-red rounded-md"
                    >
                      {subitem.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
}