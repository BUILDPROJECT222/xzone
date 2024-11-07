// src/components/TweetForm.tsx
import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import React, { useRef, useState } from "react";
import { useAutoresizeTextarea, useSlug } from "../hooks";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { FC } from "react";
import idl from "../idl/solana_twitter.json";
import { toast } from "sonner";
import { useCallback } from "react";

const programID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "");
const statePublicKey = new PublicKey(
  process.env.NEXT_PUBLIC_STATE_PUBLIC_KEY || "",
);

interface TweetFormProps {
  onTweetPosted: () => void;
}

const TweetForm: FC<TweetFormProps> = ({ onTweetPosted }: TweetFormProps) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const slugTopic = useSlug(topic);
  const effectiveTopic = slugTopic;
  const characterLimit = 280 - content.length;
  const characterLimitColour =
    characterLimit < 0
      ? "text-red-500"
      : characterLimit <= 10
      ? "text-yellow-500"
      : "text-gray-500";
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useAutoresizeTextarea(textareaRef);

  const handleSendTweet = useCallback(async () => {
    if (!effectiveTopic) {
      toast.error("Please enter a topic");
      return;
    }

    if (!content) {
      toast.error("Please enter tweet content");
      return;
    }

    if (!wallet.connected || !wallet.publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      const provider = new AnchorProvider(connection, wallet as any, {
        preflightCommitment: "processed",
      });
      const program = new Program(idl as any, programID, provider);
      const tweetKeypair = web3.Keypair.generate();

      await program.rpc.tweet(effectiveTopic, content, {
        accounts: {
          tweet: tweetKeypair.publicKey,
          author: wallet.publicKey,
          state: statePublicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [tweetKeypair],
      });

      toast.success("Tweet sent successfully");
      setContent("");
      setTopic("");

      onTweetPosted();
    } catch (error) {
      toast.error("Error sending tweet");
      console.error("Error sending tweet:", error);
    }
  }, [content, effectiveTopic, onTweetPosted, wallet, connection]);

  const canTweet = content.length > 0 && wallet.publicKey && wallet.connected && effectiveTopic.length > 0;


  return (
    <div className="px-8 py-4 border-b">
      <textarea
        ref={textareaRef}
        className="p-4 text-sm w-full focus:outline-none resize-none mb-3 rounded-lg bg-card"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center rounded-lg">
          <span className="text-gray-500 text-2xl pl-2 py-1 rounded-l-lg px-1 bg-card">
            #
          </span>
          <input
            type="text"
            placeholder="Topic"
            className="bg-card text-purple-400 rounded-r-lg pl-2 pr-2 py-2 flex-grow focus:outline-none text=sm "
            value={effectiveTopic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            className={`px-4 py-2 ml-2 rounded-lg font-semibold ${
              canTweet
                ? "bg-purple-600 text-white"
                : "bg-gray-900 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!canTweet}
            onClick={handleSendTweet}
          >
            Tweet
          </button>
        </div>


      </div>
      <div className="flex text-xs pt-2 items-center gap-2">
          <div className={characterLimitColour}>{characterLimit} left</div>

        </div>
    </div>
  );
};

export default TweetForm;
