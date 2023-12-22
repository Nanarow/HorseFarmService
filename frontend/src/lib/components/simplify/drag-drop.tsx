import { cn } from "@cn/utils";
import { Card } from "@shadcn/ui/card";
import {
  DragEvent,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type DragDropContextProps = {
  selectedData: string | undefined;
  setSelectedData: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const DragDropContext = createContext<DragDropContextProps | null>(null);

function useDragDrop() {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDropContext must be used within a DragDrop");
  }
  return context;
}
type DropZoneState = "empty" | "nonempty" | "adding" | "replacing";

type DropZoneRenderer = {
  [x in Exclude<DropZoneState, "nonempty">]: React.ReactNode;
};

const DragDrop = ({ children }: PropsWithChildren) => {
  const [selectedData, setSelectedData] = useState<string | undefined>(
    undefined
  );

  return (
    <DragDropContext.Provider
      value={{
        selectedData,
        setSelectedData,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};

const DraggableCard = ({
  value,
  className,
  children,
}: PropsWithChildren<{
  value: string;
  className?: string;
}>) => {
  const { setSelectedData, selectedData } = useDragDrop();
  const [isSelf, setSelf] = useState(false);
  function selectValue() {
    if (selectedData !== value) {
      setSelectedData(value);
      return;
    }
    setSelectedData(undefined);
  }
  useEffect(() => {
    setSelf(selectedData === value);
  }, [selectedData]);

  return (
    <Card
      className={cn(
        " w-full h-full rounded-sm flex justify-center items-center",
        isSelf ? "ring-ring ring-1" : "",
        className
      )}
      draggable
      onDragStart={selectValue}
      onDoubleClick={selectValue}
    >
      {children}
    </Card>
  );
};

const DropZone = ({
  className,
  render,
  onValueChange,
  value,
  renderer,
}: {
  className?: string;
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  render: ({}: { value: string; clear: () => void }) => ReactNode;
  renderer?: Partial<DropZoneRenderer>;
}) => {
  const { selectedData, setSelectedData } = useDragDrop();

  const [currentValue, setCurrentValue] = useState(value);
  const [state, setState] = useState<DropZoneState>(
    value ? "nonempty" : "empty"
  );

  const setValue = () => {
    if (currentValue === selectedData) {
      return;
    }
    setCurrentValue(selectedData);
    setState(selectedData ? "nonempty" : "empty");
    onValueChange && onValueChange(selectedData);
    setSelectedData(undefined);
  };

  const clear = () => {
    setSelectedData(undefined);
    setCurrentValue(undefined);
    setState("empty");
    onValueChange && onValueChange(undefined);
  };
  const renderItems: Partial<DropZoneRenderer> = {
    empty: (
      <div className=" w-full h-full rounded-md relative">
        <p className="abs-center">+</p>
      </div>
    ),
    adding: (
      <div className=" w-full h-full border border-dashed rounded-md relative">
        <p className="abs-center">Drop here</p>
      </div>
    ),
    replacing: (
      <div className=" w-full h-full border border-dashed rounded-md relative">
        <p className="abs-center">Replace here</p>
      </div>
    ),
    ...renderer,
  };
  function defaultEvent(e: DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.preventDefault();
  }
  return (
    <div
      onDrop={(e) => {
        defaultEvent(e);
        setValue();
      }}
      onClick={() => (selectedData ? setValue() : null)}
      onDragEnter={defaultEvent}
      onDragOver={(e) => {
        defaultEvent(e);
        if (!currentValue) {
          setState("adding");
        } else if (currentValue !== selectedData) {
          setState("replacing");
        }
      }}
      onDragLeave={(e) => {
        defaultEvent(e);
        setState((prev) =>
          prev === "adding" ? "empty" : prev === "replacing" ? "nonempty" : prev
        );
      }}
      className={cn(" w-full h-full", className)}
    >
      {state !== "nonempty" ? (
        renderItems[state]
      ) : currentValue ? (
        render({ value: currentValue, clear })
      ) : (
        <div>wrong</div>
      )}
    </div>
  );
};

export { DragDrop, DraggableCard, DropZone };
