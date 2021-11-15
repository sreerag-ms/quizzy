import React from "react";

import { Copy } from "@bigbinary/neeto-icons";
import { Tooltip } from "@bigbinary/neetoui/v2";

export const PublishButton = ({ handleChange, loading = false, value }) => (
  <button
    onClick={handleChange}
    className="px-5 py-3 ml-3 bg-gray-100 font-semibold rounded-md"
    disabled={loading}
  >
    {value}
  </button>
);
export const CopyUrl = ({ url }) => (
  <div className="flex flex-row justify-center items-center">
    {/* TODO: Remove if not required */}
    <div className="shadow-inner w-32 px-2 flex items-center overflow-scroll h-full rounded-l-md bg-gray-100 text-gray-500">
      {url}
    </div>
    <Tooltip content={"Copied to clipboard"} position="top" trigger="click">
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="px-3 py-3 bg-gray-100  hover:bg-gray-200 hover:text-gray-600 text-gray-400 focus:outline-none font-semibold rounded-r-md"
        title="Copy URL"
      >
        <Copy />
      </button>
    </Tooltip>
  </div>
);
