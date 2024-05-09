import { Pressable } from "react-native";
import React from "react";
import { Link, usePathname } from "expo-router";
import { openURL } from "expo-linking";
import { useAuth } from "@/hooks";
import { useCallbackUrlStore } from "@/store/useCallbackUrl.store";
import { usePopupWindowStore } from "@/store/usePopupWindow.store";

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
  const { status } = useAuth();
  const callback = useCallbackUrlStore();
  const { authModalRef } = usePopupWindowStore();

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

          callback.setUrl({
            prev: pathname,
            auth: to,
          });

          authModalRef.current?.open();
          console.log("open");
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
