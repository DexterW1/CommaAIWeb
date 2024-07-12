"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, HeartFilledIcon } from "@/components/icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { CiUser } from "react-icons/ci";
import { TbHelp } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import NavbarProfile from "./ui/NavbarProfile";
import User from "./ui/User";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Image
              style={{
                cursor: "pointer",
              }}
              width={45}
              height={45}
              src="/svgs/comma.svg"
              alt="comma ai logo"
            />
            <p className="text-small font-bold md:text-medium">
              COMMA Web Challenge
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 sm:flex">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden gap-2 sm:flex">
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                size="sm"
                src="images/avatar.png"
              />
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={["user"]}
              variant="faded"
              aria-label="Dropdown menu with icons"
            >
              <DropdownItem className="opacity-100" key="user">
                <User />
              </DropdownItem>
              <DropdownItem key="profile" startContent={<CiUser />}>
                Profile
              </DropdownItem>
              <DropdownItem
                showDivider
                key="settings"
                startContent={<CiSettings />}
              >
                Settings
              </DropdownItem>
              <DropdownItem key="help" startContent={<TbHelp />}>
                Help Center
              </DropdownItem>
              <DropdownItem key="logout" startContent={<CiLogout />}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                size="sm"
                src="images/avatar.png"
              />
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={["user"]}
              variant="faded"
              aria-label="Dropdown menu with icons"
            >
              <DropdownItem className="opacity-100" key="user">
                <User />
              </DropdownItem>
              <DropdownItem key="profile" startContent={<CiUser />}>
                Profile
              </DropdownItem>
              <DropdownItem
                showDivider
                key="settings"
                startContent={<CiSettings />}
              >
                Settings
              </DropdownItem>
              <DropdownItem key="help" startContent={<TbHelp />}>
                Help Center
              </DropdownItem>
              <DropdownItem key="logout" startContent={<CiLogout />}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        {/* <NavbarMenuToggle /> */}
      </NavbarContent>
    </NextUINavbar>
  );
};
