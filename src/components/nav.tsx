import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Example } from "../app";
import { Link } from "react-router-dom";
import Notification from "./notification";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Logo = () => (
  <svg viewBox="0 0 447 190" className="w-24 h-24" fill="none">
    <path
      d="M169.691 90.186v14.443h24.913v69.806H213.5v-69.806h24.914V90.186h-68.723zM256.378 82.243v15.285h19.618V82.243h-19.618zm-10.351 38.995h12.638v53.197h17.211v-67.399h-29.849v14.202zM314.344 116.664v-9.628h-15.766v67.399h17.331v-38.754c0-10.471 5.055-16.008 14.202-16.008s12.999 4.815 12.999 13.601v41.161h17.331v-46.457c0-16.368-10.11-23.349-23.71-23.349-12.878 0-18.174 4.814-20.581 12.035h-1.806zM423.066 163.483v10.952h23.229v-14.081h-8.064v-33.7c0-13.359-8.906-22.025-28.765-22.025-18.535 0-27.682 9.628-28.645 22.386h16.73c.722-5.777 4.934-9.508 12.758-9.508 8.906 0 11.313 4.935 11.313 9.027v1.805c0 2.527-1.083 4.574-6.138 5.536l-18.294 3.009c-12.276 1.926-19.498 8.546-19.498 20.22 0 11.314 7.823 18.896 21.785 18.896 10.711 0 18.895-5.296 22.386-12.517h1.203zm-1.444-15.045c0 8.185-5.777 15.286-15.887 15.286-6.86 0-10.351-2.889-10.351-8.425 0-4.935 2.528-7.703 8.064-9.027l10.832-2.407c2.769-.602 4.935-1.444 6.139-2.768h1.203v7.341zM87.964 84.403c9.23-7.637 13.321-52.771 17.317-68.995C109.276-.816 125.802.007 125.802.007s-4.29 7.469-2.54 13.043C125.012 18.623 137 23.605 137 23.605l-2.586 6.82s-5.399-.692-8.612 5.737 4.025 69.431 4.025 69.431-21.27 38.753-21.27 54.839S116.169 190 116.169 190h-10.681s-15.669-18.653-18.882-27.974c-3.213-9.322-1.928-18.644-1.928-18.644s-17.032-.964-32.134 0-25.174 13.951-26.992 21.215c-1.818 7.265-2.57 25.403-2.57 25.403h-8.446c-5.14-15.868-9.223-21.555-7.008-29.568 6.135-22.193 4.93-34.781 3.51-40.387C9.616 114.439 0 109.545 0 109.545c4.71-9.6 9.52-14.214 30.204-14.695 20.684-.481 48.529-2.81 57.76-10.447z"
      fill="#EC4815"
    />
    <path
      d="M32.662 159.503S34.844 179.705 46.438 190h9.936c-9.936-11.259-11.02-40.608-11.02-40.608-5.053 1.646-11.386 7.109-12.692 10.111z"
      fill="#EC4815"
    />
  </svg>
);

// FIXME: type this properly
const groupBy =
  (key: string) =>
  // @ts-ignore
  (array): { [key: string]: Example[] } =>
    // @ts-ignore
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

export function Nav({
  activeExampleLabel,
  examples,
}: {
  activeExampleLabel: string;
  examples: Example[];
}) {
  const groupBySection = groupBy("section");
  const groups = groupBySection(examples);
  const [show, setShow] = React.useState(false);

  return (
    <Disclosure as="nav" className="bg-white shadow relative z-20">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <Logo />
                </div>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <div className="relative">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.toString());
                      setShow(true);
                    }}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                  >
                    Share
                  </button>
                  <Notification show={show} setShow={setShow} />
                </div>
                <Menu as="div" className="ml-4 relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                      {activeExampleLabel}
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                      {Object.entries(groups).map(([key, items]) => {
                        return (
                          <div className="py-1" key={key}>
                            {items.map((item) => {
                              return (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={`/${item.name}`}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      {item.label}
                                    </Link>
                                  )}
                                </Menu.Item>
                              );
                            })}
                          </div>
                        );
                      })}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
