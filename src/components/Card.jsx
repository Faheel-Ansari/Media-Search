import { Bookmark, Heart } from "lucide-react";
import { useSelector } from "react-redux";

const Card = ({ id, desc, src, thumbnail, type, username, onCardClick, onHeartClick, onSaveClick}) => {
  const likedPosts = useSelector(state => state.like.likedPost)
  const savedPosts = useSelector(state => state.save.savedPost)
  const isLikedMatch = likedPosts.some(e => e.id === id)
  const isSavedMatch = savedPosts.some(e => e.id === id)
  return (
    <div
      onClick={onCardClick}
      className="relative cursor-pointer overflow-hidden rounded-2xl break-inside-avoid group"
    >
      {(type === "video")? <video className="w-full object-cover" autoPlay muted loop src={thumbnail} alt={desc}/> : <img src={thumbnail} className="w-full object-cover" alt={desc} />}

      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent xl:opacity-0 group-hover:opacity-100 transition" />

      <div className="absolute bottom-0 p-4 w-full flex justify-between items-end xl:opacity-0 group-hover:opacity-100 transition">
        <h3 title={desc} className="text-white uppercase font-extrabold line-clamp-2">
          {desc}
        </h3>

        <div className="flex space-x-3">
          <button
            onClick={(e)=>{
              e.stopPropagation()
              onHeartClick(id, desc, src, thumbnail, type, username)
            }}
            className="text-white hover:text-pink-700 transition-all ease-in-out duration-200 cursor-pointer"
          >
            {/* fill="#c6005c" stroke="#c6005c"*/}
            {(isLikedMatch)? <Heart strokeWidth={1} className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10" fill="#c6005c" stroke="#c6005c"/> : <Heart strokeWidth={2} className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10" />}
            
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSaveClick(id, desc, src, thumbnail, type, username)
            }}
            className="text-white hover:text-gray-400 cursor-pointer transition-all ease-in-out duration-200"
          >
            {(isSavedMatch)? <Bookmark strokeWidth={2} className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10" fill="#99a1af" stroke="#99a1af"/> : <Bookmark strokeWidth={2} className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10"/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
