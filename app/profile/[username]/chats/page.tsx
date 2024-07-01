"use client"

import React, { useState } from 'react';
import type { ChannelFilters, ChannelOptions, ChannelSort, UserResponse } from 'stream-chat';
import { Channel, Chat } from 'stream-chat-react';
import { EmojiPicker } from 'stream-chat-react/emojis';

import data from '@emoji-mart/data';
import { init, SearchIndex } from 'emoji-mart';

import 'stream-chat-react/dist/css/v2/index.css';
import '../../../../styles/index.css';

import {
  ChannelInner,
  CreateChannel,
  MessagingSidebar,
  MessagingThreadHeader,
  SendButton,
} from '../../../../components';

import { GiphyContextProvider, useThemeContext } from '../../../../context';

import { useConnectUser, useChecklist, useMobileView, useUpdateAppHeightOnResize } from '../../../../hooks';

import type { StreamChatGenerics } from '../../../../types';
import { getChannelListOptions } from 'channelListOptions';
import { getImage } from 'assets';
import { auth } from 'config/firebase.config';

init({ data });


const WrappedEmojiPicker = () => {
  const { theme } = useThemeContext();

  return <EmojiPicker pickerProps={{ theme }} />;
};

const Page = () => {

  const user = auth.currentUser;
  const [isCreating, setIsCreating] = useState(false);

  const apiKey = process.env.REACT_APP_STREAM_KEY;
  const userToken = process.env.REACT_APP_USER_TOKEN;
  const targetOrigin = (process.env.REACT_APP_TARGET_ORIGIN as string);

  const noChannelNameFilter = true;
  const skipNameImageSet = false;

  const channelListOptions = getChannelListOptions(!!noChannelNameFilter, user ? user!.displayName! : "Ronald");
  if(!user) return null;

  const userToConnect: UserResponse<StreamChatGenerics> = {
    id: user!.displayName!,
    name: user ? user!.displayName!: undefined,
    image: user ? user!.photoURL!: undefined,
    privacy_settings: {
      typing_indicators: {
        enabled: false,
      },
    },
  };

  const chatClient = useConnectUser<StreamChatGenerics>(apiKey!, userToConnect, userToken);
  const toggleMobile = useMobileView();
  

  useChecklist(chatClient, targetOrigin);
  const { themeClassName } = useThemeContext();
  useUpdateAppHeightOnResize();

  if (!chatClient) {
    return null; // render nothing until connection to the backend is established
  }

  return (
    <Chat client={chatClient} theme={`messaging ${themeClassName}`}>
      <MessagingSidebar
        channelListOptions={channelListOptions}
        onClick={toggleMobile}
        onCreateChannel={() => setIsCreating(!isCreating)}
        onPreviewSelect={() => setIsCreating(false)}
      />
      <Channel
        maxNumberOfFiles={10}
        multipleUploads={true}
        SendButton={SendButton}
        ThreadHeader={MessagingThreadHeader}
        TypingIndicator={() => null}
        EmojiPicker={WrappedEmojiPicker}
        emojiSearchIndex={SearchIndex}
        enrichURLForPreview
      >
        {isCreating && (
          <CreateChannel toggleMobile={toggleMobile} onClose={() => setIsCreating(false)} />
        )}
        <GiphyContextProvider>
          <ChannelInner theme={themeClassName} toggleMobile={toggleMobile} />
        </GiphyContextProvider>
      </Channel>
    </Chat>
  );
};

export default Page;
