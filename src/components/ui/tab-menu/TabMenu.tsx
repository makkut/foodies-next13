import { useFilter } from "@/state/state";
import { useCategories } from "@/hook/useCustomQuery";

const TabMenu = () => {
  const { filter, setFilter } = useFilter((state) => state);
  //   const { setCurrentPage } = usePage((state: any) => state);
  const { data, isLoading } = useCategories();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-5">
      <ul className="flex flex-wrap -mb-px justify-center">
        <li className="mr-2">
          <button
            onClick={() => {
              setFilter("all");
              //   setCurrentPage(1);
            }}
            className={` ${
              filter === "all"
                ? "inline-block p-4 text-[#EF4444] border-b-2 border-[#EF4444] rounded-t-lg"
                : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }`}
            data-el={"all"}
          >
            All
          </button>
        </li>
        {data.map((el: any, index: any) => (
          <li className="mr-2" key={index}>
            <button
              onClick={() => {
                setFilter(el.category);
                // setCurrentPage(1);
              }}
              className={` ${
                el.category === filter
                  ? "inline-block p-4 text-[#EF4444] border-b-2 border-[#EF4444] rounded-t-lg"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              data-el={el.category}
            >
              {el.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TabMenu;
