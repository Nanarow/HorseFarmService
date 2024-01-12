import { Children, ReactNode } from "react";

const Each = <T,>({
  of,
  render,
}: {
  of: T[];
  render: (item: T, index: number, array: T[]) => ReactNode;
}) => {
  return Children.toArray(of.map(render));
};

export default Each;
