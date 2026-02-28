import { useEffect, useState} from "react";
import { fetchPhotos, fetchVideos } from "./api/mediaApi";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./components/SearchBar";
import MasonaryLayout from "./components/MasonaryLayout";
import LoadingScreen from "./components/LoadingScreen";
import {
  setLoading,
  setQuery,
  setResult,
  getRandomQuery,
  setActiveTab,
} from "./features/SearchSlice";
import Pagination from "./components/Pagination";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.search.loading);
  const activeTab = useSelector((state) => state.search.activeTab);
  const [page, setPage] = useState(1);
  const query = useSelector((state) => state.search.query);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(setQuery(getRandomQuery()));
  }, []);

  const getQuery = () => {
    setPage(1);
    
    if (searchQuery !== "") {
      dispatch(setQuery(searchQuery));
    } else {
      dispatch(setQuery(getRandomQuery()));
    }
  };

  const fetchData = async (query, page) => {
    dispatch(setLoading(true));

    let data = [];

    if (activeTab === "photos") {
      data = await fetchPhotos(query, page);
    } else if (activeTab === "videos") {
      data = await fetchVideos(query, page);
    }

    if (data.length > 0) {
      dispatch(setLoading(false));
    }

    dispatch(setResult(data));
  };

  const onPageChange = (page) => {
    setPage(page);
  };

  const setActiveTabByButton = (tabName) => {
    if (tabName === activeTab) return;

    setPage(1);
    dispatch(setLoading(true));
    dispatch(setActiveTab(tabName));
  };

  useEffect(() => {
    fetchData(query, page);
  }, [activeTab, query, page]);

  return (
    <>
      <main className="bg-black text-white min-h-screen">
        <SearchBar
          setSearchQuery={setSearchQuery}
          handleQuery={getQuery}
          setActiveTabByButton={setActiveTabByButton}
        />
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {" "}
            <MasonaryLayout />{" "}
            <Pagination
              currentPage={page}
              totalPages={10}
              onPageChange={onPageChange}
            />{" "}
          </>
        )}
      </main>
    </>
  );
}

export default App;
