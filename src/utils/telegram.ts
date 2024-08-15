export const getUserTelegramAvatarUrl = async (userId: number) => {
  const botToken = "6296103442:AAHAAQM4Kwu_uv-lqMntXLypk2uGToMDjDY";
  const apiUrl = `https://api.telegram.org/bot${botToken}/getUserProfilePhotos?user_id=${userId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result && data.result.photos.length > 0) {
      // Get the file_id of the first photo
      const fileId = data.result.photos[0][0].file_id;

      // Now get the file_url
      const fileResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
      );
      const fileData = await fileResponse.json();

      const filePath = fileData.result.file_path;
      const avatarUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
      return avatarUrl;
    } else {
      throw new Error("No profile photos found");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
