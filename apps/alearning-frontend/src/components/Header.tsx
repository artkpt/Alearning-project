import { useContext, useState } from "react";
import { Button } from "./BaseComponents/Button";
import { Input } from "./BaseComponents/Input";
import { Link, redirect} from "react-router";
import { useNavigate } from "react-router-dom";
import { ActionIcon } from "./ActionIcon";
import { LinkButton } from "./BaseComponents/LinkButton";
import AuthContext from "../features/auth/contexts/AuthProvider";
import { useAuthStore } from "../../store/auth/authStore";
export function Header({ className = "" }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const items = [
    { label: "Edit", key: "edit", action: () => {} },
    { label: "Delete", key: "delete", action: () => {} },
    {
      label: "Log Out",
      key: "Logout",
      action: () => {
        logout();
        navigate("/login");
      },
    },
  ];
  const [openMenu, setOpenMenu] = useState(false);
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Notes",
      link: "/notes",
    },
  ...(user?.role === "admin"
    ? [
        {
          name: "Admin Dashboard",
          link: "/admin",
        },
      ]
    : []),
  ];

  const menuOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <header
        className={`flex items-center justify-between min-h-16 px-4 py-4 border-b  border-main-contrast gap-2 flex-nowrap ${className}`}
      >
        <button
          className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md text-grey-600 shrink-0 hover:bg-gray-50 cursor-pointer"
          onClick={menuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <img
          src="/logo.jpg"
          alt="logo"
          width="773"
          height="752"
          className="w-8 h-8 shrink-0"
        />
        <div className="grow shrink flex gap-2 justify-between">
          <h1 className="hidden sm:block font-sans text-xl font-semibold cursor-pointer">
            <Link to="/">Alearning</Link>
          </h1>
          <Input type="text" name="search" />
        </div>
        {/* {!auth.userId && <LinkButton to="/login">Sign in</LinkButton>} */}
        {!user && <LinkButton to="/login">Sign in</LinkButton>}
        {/* {auth.userId && <ActionIcon icon="profile" items={items} />} */}
        {user && (
          <>
            <ActionIcon icon="profile" items={items} />
            {user && user.username}
          </>
        )}
      </header>
      {/* Sidebar */}
      {openMenu && (
        <div className="fixed inset-0 flex">
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpenMenu(false)}
          />

          {/* sidebar */}
          <div className="relative w-64 bg-white h-full shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <ul className="space-y-2">
              {menuList.map((menu) => {
                return (
                  <li key={menu.name}>
                    <Link
                      to={menu.link}
                      onClick={() => setOpenMenu(false)}
                      className="block px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      {menu.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
