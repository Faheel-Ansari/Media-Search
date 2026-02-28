import { useDispatch, useSelector } from "react-redux";
import ActiveTab from "./ActiveTab";

const SearchBar = ({setSearchQuery, handleQuery, setActiveTabByButton}) => {
  const tabNames = ["photos", "videos", "liked", "saved"];
  const activeTab = useSelector(state => state.search.activeTab)
  
  return (
    <div className="w-full py-10 flex flex-col items-center">
      <h1 className="my-14 uppercase text-center text-7xl font-black">
        Media Search
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleQuery()
        }}
        className="flex w-[80%] lg:w-full max-w-xl"
      >
        <input
          type="search"
          placeholder="Search..."
          disabled={activeTab === "saved" || activeTab === "liked"}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="flex-1 px-4 py-3 rounded-l-xl border border-zinc-600 focus:outline-none focus:ring-1 focus:ring-white"
        />
        <button className="px-6 py-3 cursor-pointer bg-zinc-100 font-bold text-black rounded-r-xl hover:bg-zinc-400 transition-colors ease-in-out duration-200">
          Search
        </button>
      </form>

      <div className="mt-6 flex space-x-6">
        {tabNames.map((tab, idx) => (
          <ActiveTab
            key={idx}
            setActiveTabByButton={setActiveTabByButton}
            activeTab={activeTab}
            tab={tab}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
