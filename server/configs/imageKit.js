// server/configs/imageKit.js
import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config(); // ← this loads your .env variables

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // e.g. https://ik.imagekit.io/trab
});

export default imageKit;
