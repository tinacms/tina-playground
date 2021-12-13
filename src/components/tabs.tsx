import React from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Tabs({
  items,
  sticky,
  activeIndex,
  setActiveIndex,
}: {
  items: { name: string }[];
  sticky?: boolean;
  activeIndex: number;
  setActiveIndex: (number: number) => void;
}) {
  return (
    <div>
      <div className="sm:hidden p-4">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={(e) => setActiveIndex(Number(e.target.value))}
          value={String(activeIndex)}
        >
          {items.map((tab, i) => (
            <option key={i} value={i}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav
            className="top-0 sticky pl-4 -mb-px flex space-x-8 overflow-x-auto"
            aria-label="Tabs"
          >
            {items.map((tab, i) => (
              <button
                key={tab.name}
                onClick={() => setActiveIndex(i)}
                className={classNames(
                  i === activeIndex
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
