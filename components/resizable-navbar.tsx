"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import { useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
export default function NavBar() {
  const navItems: any[] = [
    {name:"Where Conversations Come Alive.Experience seamless real-time communication."}

  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems className=" bg-red900" items={navItems} />
          <div className="flex items-center gap-4">
            <SignInButton>
            <NavbarButton variant="secondary" className="text-lg" >login</NavbarButton>
            </SignInButton>
            <SignUpButton>
            <NavbarButton className="text-sm" variant="primary">Sign Up</NavbarButton>
            </SignUpButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <SignInButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full font-[Inter] font-bold "
              >
                Login
              </NavbarButton>
              </SignInButton>
              <SignUpButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full font-[Inter] font-bold"
              >
                Sign Up
              </NavbarButton>
              </SignUpButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
   

      {/* Navbar */}
    </div>
  );
}


