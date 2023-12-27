import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link, usePathname } from "expo-router";
import { openURL } from "expo-linking";
import { useAuthContext } from "@/hooks";

type Props = {
  auth: boolean;
  to: string;
  isLink: boolean;
};
const ProtectedAuthLink: React.FC<React.PropsWithChildren<Props>> = ({
  auth,
  isLink,
  to,
  children,
}) => {
  const { status, modalAuthRef, callBack } = useAuthContext();
  const pathname = usePathname();
  return (
    <Link
      //@ts-ignore
      href={auth && status !== "authenticated" ? "/auth/login" : to}
      onPress={(e) => {
        if (isLink) {
          e.preventDefault();
          openURL(to);
          return;
        } else if (auth && status !== "authenticated") {
          e.preventDefault();

          callBack.setCallback({
            prev: pathname,
            auth: to,
          });

          modalAuthRef.current?.open();
          return;
        }
      }}
      asChild
    >
      <Pressable>{children}</Pressable>
    </Link>
  );
};

export default ProtectedAuthLink;
