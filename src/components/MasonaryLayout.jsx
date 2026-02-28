import { useState } from "react";
import ImageModal from "./ImageModal";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { setLikedPost } from "../features/LikeSlice";
import { setSavedPost } from "../features/SavedSlice";
import { downloadPhoto, downloadVideo } from "../api/mediaApi";

const MasonaryLayout = () => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const oldLikedPosts = useSelector((state) => state.like.likedPost);
  const oldSavedPosts = useSelector((state) => state.save.savedPost);
  const activeTab = useSelector((state) => state.search.activeTab);
  const results = useSelector((state) => state.search.results);
  const data =
    activeTab === "liked"
      ? oldLikedPosts
      : activeTab === "saved"
        ? oldSavedPosts
        : results;

  const selectedItem = data.find((item) => item.id === selectedId);
  const setLikedPostToLocalStorage = (
    id,
    desc,
    src,
    thumbnail,
    type,
    username,
  ) => {
    const exist = oldLikedPosts.some((e) => e.id === id);
    const newLikedPosts = exist
      ? oldLikedPosts.filter((e) => e.id !== id)
      : [{ id, desc, src, thumbnail, type, username }, ...oldLikedPosts];

    dispatch(setLikedPost(newLikedPosts));
  };
  const setSavedPostToLocalStorage = (
    id,
    desc,
    src,
    thumbnail,
    type,
    username,
  ) => {
    const exist = oldSavedPosts.some((e) => e.id === id);
    const newSavedPosts = exist
      ? oldSavedPosts.filter((e) => e.id !== id)
      : [{ id, desc, src, thumbnail, type, username }, ...oldSavedPosts];

    dispatch(setSavedPost(newSavedPosts));
  };
  async function handleDownload(id, imageUrl, type, downloadUrl) {
    if (type === "video") {
      // downloadVideo()
    } else {
      
      downloadPhoto(imageUrl, id, downloadUrl)
    }
  }

  return (
    <>
      <div className="lg:px-6 max-w-4/5 pb-10 min-h-[60vh] mx-auto">
        {data.length <= 0 &&
        (activeTab === "liked" || activeTab === "saved") ? (
          <div className="text-center text-4xl mt-32">
            <h3>No posts found.</h3>
          </div>
        ) : (
          <>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
              {data.map((item) => (
                <div key={item.id}>
                  <Card
                    id={item.id}
                    desc={item.desc}
                    src={item.src}
                    thumbnail={item.thumbnail}
                    type={item.type}
                    username={item.username}
                    onCardClick={() => setSelectedId(item.id)}
                    onHeartClick={setLikedPostToLocalStorage}
                    onSaveClick={setSavedPostToLocalStorage}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {selectedItem && (
        <ImageModal
          id={selectedItem.id}
          desc={selectedItem.desc}
          src={selectedItem.src}
          thumbnail={selectedItem.thumbnail}
          type={selectedItem.type}
          username={selectedItem.username}
          downloadUrl={selectedItem.downloadUrl}
          onClose={() => setSelectedId(null)}
          onDownload={handleDownload}
          onHeartClick={setLikedPostToLocalStorage}
          onSaveClick={setSavedPostToLocalStorage}
        />
      )}
    </>
  );
};

export default MasonaryLayout;
