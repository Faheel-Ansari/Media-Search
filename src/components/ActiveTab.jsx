const ActiveTab = ({setActiveTabByButton, activeTab, tab}) => {
  return (
    <button
      className={`pb-2 cursor-pointer capitalize transition-all ease-in-out duration-200 ${
        activeTab === tab
          ? "border-b-2 border-white font-bold"
          : "text-zinc-500 hover:text-zinc-300"
      } `}
      onClick={() => {
        setActiveTabByButton(tab);
      }}
    >
      {tab}
    </button>
  );
};

export default ActiveTab;
