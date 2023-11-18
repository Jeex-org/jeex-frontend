"use client";
import { FC, useCallback, useEffect } from "react";

import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";

import { Article } from "@/components/Article/Article";

type PushLoaderProps = {};

export const PushLoader: FC<PushLoaderProps> = () => {
  // Creating a random signer from a wallet, ideally this is the wallet you will connect
  const signer = ethers.Wallet.createRandom();

  // Initialize wallet user
  // 'CONSTANTS.ENV.PROD' -> mainnet apps | 'CONSTANTS.ENV.STAGING' -> testnet apps
  const connectToUser = useCallback(async () => {
    const userAlice = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.PROD,
    });
    // console.log("🚀 ~ connectToUser ~ userAlice:", userAlice);

    // userAlice.channel.create({options})
    const response = await userAlice.channel.create({
      name: "Test Channel",
      description: "Test Description",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC",
      url: "https://push.org",
    });
    console.log("🚀 ~ connectToUser ~ response:", response);

    // List inbox notifications
    const inboxNotifications = await userAlice.notification.list("INBOX");
    console.log("🚀 ~ connectToUser ~ inboxNotifications:", inboxNotifications);
  }, []);

  useEffect(() => {
    connectToUser();
  }, []);

  return (
    <Article title="Push Protocol" backUrl="/" isProtected>
      PUSH
    </Article>
  );
};
