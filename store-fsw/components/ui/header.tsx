"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "./avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "./separator";
import Link from "next/link";

const Header = () => {
  const { status, data } = useSession();
  const handleLogin = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header>
      <Card className="flex items-center justify-between p-[1.875rem]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="text-left text-lg font-semibold">
              Menu
            </SheetHeader>

            {status === "authenticated" && data?.user && (
              <div className="my-4 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>

                <div>
                  <p className="font-medium">{data?.user?.name}</p>
                  <p className="text-xs opacity-45">Boas compras!</p>
                </div>
              </div>
            )}

            <Separator />

            <div className="mt-4 flex flex-col gap-3">
              {status === "unauthenticated" && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={handleLogin}
                >
                  <LogInIcon size={15} />
                  Entrar
                </Button>
              )}

              {status === "authenticated" && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={handleLogout}
                >
                  <LogOutIcon size={15} />
                  Sair
                </Button>
              )}
              <Button variant="outline" className="w-full justify-start gap-2">
                <HomeIcon size={15} />
                Ínicio
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <PercentIcon size={15} />
                Ofertas
              </Button>
              <SheetClose asChild>
                <Link href={"/catalog"}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ListOrderedIcon size={15} />
                    Catálogo
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-semibold">
          <span className="text-primary">FSW</span> Store
        </h1>

        <Button size="icon" variant="outline">
          <ShoppingCartIcon />
        </Button>
      </Card>
    </header>
  );
};

export default Header;
