const API_KEY = 'dnm04nlu8'; // add key

type CloudinaryType = {
  secure_url: string;
};

export const cloudinaryUpload = async (file: File) => {
  try {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'reddit');
    const res = await fetch(`https://api.cloudinary.com/v1_1/${API_KEY}/image/upload`, {
        method: 'POST',
        body: data,
      });

    return await res.json() as CloudinaryType;
  } catch (error) {
    console.log('Something goes wrong');
  }
};