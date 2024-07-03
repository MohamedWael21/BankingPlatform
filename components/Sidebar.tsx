"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  const isActive = (route: string) => {
    return pathname === route || pathname.startsWith(`${route}/`);
  };
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer items-center gap-2 flex">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon Logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        {sidebarLinks.map((item) => (
          <Link
            href={item.route}
            key={item.label}
            className={cn("sidebar-link", {
              "bg-bank-gradient": isActive(item.route),
            })}
          >
            <div className="relative size-6">
              <Image
                src={item.imgURL}
                fill
                alt={item.label}
                className={cn({
                  "brightness-[3] invert-0": isActive(item.route),
                })}
              />
            </div>
            <p
              className={cn("sidebar-label", {
                "!text-white": isActive(item.route),
              })}
            >
              {item.label}
            </p>
          </Link>
        ))}
        <PlaidLink user={user} variant="ghost" />
      </nav>
      <Footer user={user} />
    </section>
  );
};
export default Sidebar;
