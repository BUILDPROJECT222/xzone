import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NodeWallet } from "../../../utils/walletUtils";
import idl from "../../../idl/solana_twitter.json";

// Define the program ID from environment variables
const programID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID as string);

// Set up the connection to Solana Mainnet
const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL as string, "processed");

async function fetchTweets(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract query parameters with default values
    const {
      page = '1',
      limit = '1000',
      topic,
      author,
      id,
      content,
      likes,
    } = req.query;

    console.log("Query ID:", id);

    // Generate a server keypair for the transaction (not recommended for production without proper key management)
    const serverKeypair = web3.Keypair.generate();
    const wallet = new NodeWallet(serverKeypair);
    
    // Setup Anchor Provider with the connection and wallet
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "confirmed",
    });
    const program = new Program(idl as any, programID, provider);

    // Fetch all tweets from the program
    let tweets = (await program.account.tweetAccount.all()) as unknown as any[];

    // Filter tweets based on query parameters
    tweets = tweets.filter((tweet) => {
      const tweetAcc = tweet.account;
      if (id && tweetAcc.id.toString() !== String(id)) return false;
      if (topic && tweetAcc.topic !== topic) return false;
      if (author) {
        const authorPubKey = new PublicKey(author as string).toString();
        if (tweetAcc.author.toString() !== authorPubKey) return false;
      }
      if (content && !tweetAcc.content.includes(content as string)) return false;
      if (likes && tweetAcc.likes !== Number(likes)) return false;
      return true;
    });

    // Sort tweets by timestamp (assuming timestamp is stored as a number in hex format)
    tweets.sort((a, b) => parseInt(a.account.timestamp, 16) - parseInt(b.account.timestamp, 16));

    // Calculate pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedTweets = tweets.slice(startIndex, startIndex + Number(limit));

    // Send the response
    res.status(200).json({
      data: paginatedTweets.map((tweet) => ({
        ...tweet.account,
        tweetPublicKey: tweet.publicKey.toString(),
        author: tweet.account.author.toString(),
      })),
      page: Number(page),
      limit: Number(limit),
      total: tweets.length,
    });
  } catch (error) {
    console.error("Failed to fetch tweets:", error);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
}

export default fetchTweets;
