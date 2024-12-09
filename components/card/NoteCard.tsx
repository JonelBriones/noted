import Image from "next/image";
import React from "react";

const NoteCard = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border-l border-r flex-1 ∂text-sm ">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">React Performance Optimization</h1>
        <div className="flex flex-col  ">
          <div className="flex place-items-center">
            <span className="flex gap-2 p-2 w-[150px]">
              <Image
                src={"/images/icon-tag.svg"}
                width={16}
                height={16}
                alt="icon-tag"
              />
              Tags
            </span>
            <span>Dev, React</span>
          </div>
          <div className="flex place-items-center">
            <span className="flex gap-2 p-2 w-[150px]">
              <Image
                src={"/images/icon-clock.svg"}
                width={16}
                height={16}
                alt="icon-clock"
              />
              Last edited
            </span>
            <span>29 Oct 2024</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-neutral-200" />
      <div className="flex flex-col gap-4 text-neutral-800">
        <h1>Key Performance Optimization Techniques:</h1>
        <ol className="flex flex-col gap-4">
          <li>
            <h2>1. Code Splitting</h2>
            <ul>
              <li>
                - Use <code>React.lazy()</code> for route-based splitting
              </li>
              <li>- Implement dynamic imports for heavy components</li>
            </ul>
          </li>
          <li>
            <h2>2. Memoization</h2>
            <ul>
              <li>
                - <code>useMemo</code> for expensive calculations
              </li>
              <li>
                - <code>useCallback</code> for function props
              </li>
              <li>
                - <code>React.memo</code> for component optimization
              </li>
            </ul>
          </li>
          <li>
            <h2>3. Virtual List Implementation</h2>
            <ul>
              <li>
                - Use <code>react-window</code> for long lists
              </li>
              <li>- Implement infinite scrolling</li>
            </ul>
          </li>
        </ol>
        <h4>TODO: Benchmark current application and identify bottlenecks</h4>
      </div>
    </div>
  );
};

export default NoteCard;
