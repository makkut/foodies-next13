interface IPaginationButtonBlock {
  disabledNext: any;
  onClickNext: any;
  disabledPrev: any;
  onClickPrev: any;
  numPages: any;
}

export function PaginationButtonBlock({
  disabledNext,
  onClickNext,
  disabledPrev,
  onClickPrev,
  numPages,
}: IPaginationButtonBlock) {
  return (
    <>
      <div className="flex justify-center mt-2 xs:mt-0">
        <button
          disabled={disabledPrev}
          onClick={onClickPrev}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-l hover:bg-red-500"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Prev
        </button>
        <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-700 ">
          {numPages}
        </div>
        <button
          disabled={disabledNext}
          onClick={onClickNext}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-r hover:bg-red-500 "
        >
          Next
          <svg
            aria-hidden="true"
            className="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
}
