
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";
import {createUploadthing ,type FileRouter} from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "8MB" } })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorized");
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { userId: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;