import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: import.meta.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: import.meta.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: import.meta.env.IMAGEKIT_URL_ENDPOINT,
});


export async function uploadImages(files: File[]): Promise<string[]> {
  if (!files.length) return [];

  const urls = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const upload = await imagekit.upload({
        file: base64,
        fileName: file.name,
        folder: "/uploads",
      });

      return `${upload.url}?tr=f-avif,q-80,w-800`;
    })
  );

  return urls;
}
