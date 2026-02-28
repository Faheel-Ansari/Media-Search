import { Bookmark, Download, Heart, X } from "lucide-react";
import { p } from "motion/react-client";
import { useSelector } from "react-redux";

const ImageModal = ({
  id,
  desc,
  src,
  thumbnail,
  type,
  username,
  downloadUrl,
  onClose,
  onHeartClick,
  onDownload,
  onSaveClick,
}) => {
  const likedPosts = useSelector((state) => state.like.likedPost);
  const savedPosts = useSelector((state) => state.save.savedPost);
  const isMatch = likedPosts.some((e) => e.id === id);
  const isSavedMatch = savedPosts.some((e) => e.id === id);
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 transition-discrete ease-in-out duration-500"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-fit w-full rounded-2xl overflow-hidden bg-black"
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-start p-4 bg-linear-to-b from-black/70 to-transparent">
          <h3 className="text-white font-bold uppercase text-lg max-w-[80%] line-clamp-2">
            {desc}
          </h3>

          <div className="flex space-x-2 lg:space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(id, src, type, downloadUrl);
              }}
              className="text-white hover:text-emerald-600 transition-all ease-in-out duration-200 cursor-pointer"
            >
              <Download strokeWidth={3} className="w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onHeartClick(id, desc, src, thumbnail, type, username);
              }}
              className="text-white hover:text-pink-700 transition-all ease-in-out duration-200 cursor-pointer"
            >
              {isMatch ? (
                <Heart
                  strokeWidth={2}
                  className="w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12"
                  fill="#c6005c"
                  stroke="#c6005c"
                />
              ) : (
                <Heart strokeWidth={3} className="w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSaveClick(id, desc, src, thumbnail, type, username);
              }}
              className="text-white hover:text-gray-400 cursor-pointer transition-all ease-in-out duration-200"
            >
              {isSavedMatch ? (
                <Bookmark strokeWidth={2} className="w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12" fill="#99a1af" stroke="#99a1af" />
              ) : (
                <Bookmark strokeWidth={3} className="w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12" />
              )}
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-600 transition-colors ease-in-out duration-200 cursor-pointer"
            >
              <X strokeWidth={3} className="w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12" />
            </button>
          </div>
        </div>

        {/* Image */}
        {type === "video" ? (
          <video
            // autoPlay
            // muted
            // loop
            controls
            src={src}
            alt={desc}
            className="w-full max-h-[85vh] object-contain bg-black"
          ></video>
        ) : (
          <img
            src={src}
            alt={desc}
            className="w-full max-h-[85vh] object-contain bg-black"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-between items-start p-4 bg-linear-to-t from-black/60 to-transparent">
          {type === "video" ? (
            <p>
              Video by{" "}
              <a
                href={`https://www.pexels.com/@${username}`}
                target="_blank"
                className="underline"
              >
                @{username}
              </a>{" "}
              on{" "}
              <a
                href="https://www.pexels.com/"
                target="_blank"
                className="underline"
              >
                Pexels
              </a>
            </p>
          ) : (
            <p>
              Photo by{" "}
              <a
                href={`https://www.unsplash.com/@${username}?utm_source=mediasearch&utm_medium=referral`}
                target="_blank"
                className="underline"
              >
                @{username}
              </a>{" "}
              on{" "}
              <a
                href="https://www.unsplash.com/?utm_source=mediasearch&utm_medium=referral"
                target="_blank"
                className="underline"
              >
                Unsplash
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
