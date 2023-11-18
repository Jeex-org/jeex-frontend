"use client";
import { FC } from "react";
import { Article } from "@/components/Article/Article";

import { PageDirection, LightNode } from "@waku/interfaces";
import { useWaku, useContentPair } from "@waku/react";

import handleCommand from "@/features/waku/command";
import Room from "@/features/waku/Room";
import { Message } from "@/features/waku/Message";

import { useMessages, usePersistentNick } from "@/features/waku/hooks";

const startTime = new Date();
// Only retrieve a week of history
startTime.setTime(Date.now() - 1000 * 60 * 60 * 24 * 7);
const endTime = new Date();

type WakuLoaderProps = {};

export const WakuLoader: FC<WakuLoaderProps> = () => {
  const { node } = useWaku<LightNode>();
  console.log("🚀 ~ node:", node);
  const { decoder } = useContentPair();
  const [messages, pushLocalMessages] = useMessages({
    node,
    decoder,
    options: {
      pageSize: 5,
      pageDirection: PageDirection.FORWARD,
      timeFilter: {
        startTime,
        endTime,
      },
    },
  });
  console.log("🚀 ~ messages:", messages);

  const [nick, setNick] = usePersistentNick();

  const onCommand = (text: string): void => {
    handleCommand(text, node, setNick).then(({ command, response }) => {
      const commandMessages = response.map((msg) => {
        return Message.fromUtf8String(command, msg);
      });
      pushLocalMessages(commandMessages);
    });
  };

  return (
    <Article title="Waku" backUrl="/">
      <Room nick={nick} messages={messages} commandHandler={onCommand} />
    </Article>
  );
};
