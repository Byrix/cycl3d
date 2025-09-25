import { Icon } from "@iconify/react";
import { type ComponentChildren, toChildArray } from "preact";

const Navbar = ({ children }: { children: ComponentChildren }) => {
  return (
    <nav class="w-screen h-[5vh] bg-base-200 navbar">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex={0} role="button" class="btn btn-ghost lg:hidden">
            <Icon icon="material-symbols:menu-rounded" className="size-8" />
          </div>
          <ul
            tabindex={0}
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2"
          >
            {toChildArray(children).map((child) => (
              <li>{child}</li>
            ))}
          </ul>
        </div>
        <a href="/" class="btn btn-ghost text-4xl">
          cycl<span class="text-primary -ml-1">3d</span>
        </a>
      </div>
      <div class="navbar-end hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          {toChildArray(children).map((child) => (
            <li>{child}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
