"use client";
// components/weekly/TimeGrid.tsx

import { ReactNode } from "react";

interface TimeGridProps {
  cellWidth: number;
  cellHeight: number;
  children: ReactNode;
}

export function TimeGrid({ cellWidth, cellHeight, children }: TimeGridProps) {
  const gridRows = Array.from({ length: 26 }, (_, i) => ({
    height: i === 0 || i === 25 ? cellHeight / 2.0 : cellHeight,
    hour: Math.floor(i - 0.5),
  }));

  const totalGridHeight = gridRows.reduce((sum, row) => sum + row.height, 0);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(7, ${cellWidth}px)`,
    gridTemplateRows: gridRows.map((row) => `${row.height}px`).join(" "),
    width: `${cellWidth * 7}px`,
    minHeight: `${totalGridHeight}px`,
    backgroundImage: `repeating-linear-gradient(
      135deg,
      transparent,
      transparent 4px,
      var(--bg-emphasis) 4px,
      var(--bg-emphasis) 5px
    )`,
    backgroundAttachment: "local",
    backgroundRepeat: "repeat",
    backgroundColor: "var(--bg-subtle)",
  } as const;

  return (
    <div className="relative bg-subtle" style={gridStyle}>
      {gridRows.map((row, rowIndex) =>
        Array(7)
          .fill(0)
          .map((_, dayIndex) => (
            <div
              key={`${row.hour}-${dayIndex}`}
              className="border-b border-r border-border-subtle first:border-l-0"
              style={{
                height: `${row.height}px`,
              }}
            />
          )),
      )}
      {children}
    </div>
  );

  // return (
  //   <div
  //     className="relative bg-subtle"
  //     style={{
  //       display: 'grid',
  //       gridTemplateColumns: `repeat(7, ${cellWidth}px)`,
  //       gridTemplateRows: gridRows.map(row => `${row.height}px`).join(' '),
  //       backgroundImage: `repeating-linear-gradient(
  //         135deg,
  //         transparent,
  //         transparent 4px,
  //         var(--bg-emphasis) 4px,
  //         var(--bg-emphasis) 5px
  //       )`
  //     }}
  //   >
  //     {gridRows.map((row, rowIndex) => (
  //       Array(7).fill(0).map((_, dayIndex) => (
  //         <div
  //           key={`${row.hour}-${dayIndex}`}
  //           className="border-b border-r border-border-subtle first:border-l-0"
  //           style={{
  //             height: `${row.height}px`
  //           }}
  //         />
  //       ))
  //     ))}
  //     {children}
  //   </div>
  // );
}
