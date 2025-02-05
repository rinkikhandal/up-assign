import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { SignLog } from "../subComponents/SignLog";
import { UserAuth } from "../Context/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const [navItems, setNavItems] = useState([
    { name: "Dashboard", href: "/", current: true },
    { name: "Counter", href: "/counter", current: false },
    { name: "Editor", href: "/editor", current: false },
    { name: "UserForm", href: "/user-form", current: false },
  ]);

  const { user, localUser, logOut } = UserAuth();

  const handleNavbarClick = (e, href) => {
    if (href === "/") {
      return; // Allow navigation
    }

    if (!user && !localUser) {
      e.preventDefault();
      e.stopPropagation(); // Stop event from bubbling up
      openOverlay("SignIn");
    }
  };

  // Update `current` based on the current URL path
  useEffect(() => {
    setNavItems((prevNav) =>
      prevNav.map((item) => ({
        ...item,
        current: item.href === location.pathname,
      }))
    );
  }, [location.pathname]);

  const [overlay, setOverlay] = useState({ isOpen: false, type: "" });

  const openOverlay = (type) => setOverlay({ isOpen: true, type });
  const closeOverlay = () => setOverlay({ isOpen: false, type: "" });

  const handleLogoutClick = () => {
    logOut();
  };

  return (
    <>
      {/* Conditionally render SignIn or Login popup */}
      {overlay.isOpen ? (
        <SignLog closeOverlay={closeOverlay} type={overlay.type} />
      ) : (
        ""
      )}
      <Disclosure
        as="nav"
        className="z-50 fixed left-0 right-0 top-0 h-auto full-width bg-white drop-shadow-xl"
      >
        <div className="mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://upliance.ai/cdn/shop/files/purple_upliance.png?height=42&v=1705328918"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden lg:ml-6 lg:block">
                <div className="flex space-x-4 text-xs ">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => handleNavbarClick(e, item.href)}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-500 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              <section>
                {localUser || user ? (
                  <div className="flex gap-1">
                    <p
                      className="text-neutral-500 text-sm hover:text-neutral-800 py-2 px-5 font-semibold sm:text-base cursor-pointer"
                      onClick={handleLogoutClick}
                    >
                      Log Out
                    </p>
                    <p className="p-3 bg-neutral-800 text-white rounded-full cursor-pointer">
                      {user && user.displayName
                        ? user.displayName
                            .split(" ")
                            .map((name) => name[0])
                            .join(" ") // Get initials
                        : localUser && localUser.firstName && localUser.lastName
                        ? localUser.firstName[0] + " " + localUser.lastName[0]
                        : ""}
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <button
                      className="bg-neutral-800 text-white py-2 px-5 border-2 border-solid border-neutral-800 hover:bg-transparent hover:text-black transition-all rounded-sm text-sm sm:text-base cursor-pointer"
                      onClick={() => openOverlay("SignIn")}
                    >
                      Sign-in
                    </button>
                    <button
                      className="text-neutral-500 text-sm hover:text-neutral-800 py-2 px-5 font-semibold sm:text-base cursor-pointer"
                      onClick={() => openOverlay("LogIn")}
                    >
                      Login
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>

        <DisclosurePanel className="lg:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 text-xs">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavbarClick}
                title={
                  item.name !== "Dashboard"
                    ? "protected route please log In"
                    : "unProtected route"
                }
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
};
