import { cn } from "@cn/utils";
import { Card } from "@shadcn/ui/card";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";

type DragDropContextProps = {
  dragData: string | undefined;
  setDragData: React.Dispatch<React.SetStateAction<string | undefined>>;
  dropZones: DropZone;
  addDropZone: (id: string, item: DropZoneItem) => void;
  removeDropZone: (id: string) => void;
  setDropZoneState: (id: string, state: DropZoneState) => void;
  setDropZoneValue: (id: string, value: string | undefined) => void;
};

const DragDropContext = createContext<DragDropContextProps | null>(null);

function useDragDrop() {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDropContext must be used within a DragDrop");
  }
  return context;
}
type DropZoneState = "empty" | "added" | "adding" | "replacing";

type DropZoneRender = {
  [x in DropZoneState]: React.ReactNode;
};
interface DropZoneItem {
  value: string | undefined;
  state: DropZoneState;
}
interface DropZone {
  [id: string]: DropZoneItem;
}

const DragDrop = ({ children }: PropsWithChildren) => {
  const [dragData, setDragData] = useState<string | undefined>(undefined);
  const [dropZones, setDropZones] = useState<DropZone>({});

  const addDropZone = (id: string, item: DropZoneItem) => {
    dropZones[id] = item;
    setDropZones({ ...dropZones });
  };
  const removeDropZone = (id: string) => {
    delete dropZones[id];
    setDropZones(dropZones);
  };

  const setDropZoneState = (id: string, state: DropZoneState) => {
    dropZones[id].state = state;
    setDropZones({ ...dropZones });
  };

  const setDropZoneValue = (id: string, value: string | undefined) => {
    dropZones[id].value = value;
    setDropZones({ ...dropZones });
  };

  return (
    <DragDropContext.Provider
      value={{
        dragData,
        setDragData,
        dropZones,
        addDropZone,
        removeDropZone,
        setDropZoneState,
        setDropZoneValue,
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
  const { setDragData } = useDragDrop();
  return (
    <Card
      className={cn(
        " w-full h-full rounded-sm flex justify-center items-center",
        className
      )}
      draggable
      onDragStart={() => setDragData(value)}
      // onDragEnd={() => {
      //   setDragData(undefined);
      //   Object.entries(dropZones).forEach(([id]) => {
      //     if (!dropZones[id].value && dropZones[id].state === "adding") {
      //       setDropZoneState(id, "empty");
      //     }
      //     if (dropZones[id].value && dropZones[id].state === "replacing") {
      //       setDropZoneState(id, "added");
      //     }
      //   });
      // }}
    >
      {children}
    </Card>
  );
};

const DropZone = ({
  className,
  render,
  onValueChange,
}: {
  className?: string;
  onValueChange?: (value: string | undefined) => void;
  render: ({}: {
    value: string | undefined;
    setValue: (value: string | undefined) => void;
    clear: () => void;
  }) => ReactNode;
}) => {
  const id = useId();
  const {
    addDropZone,
    dragData,
    setDropZoneValue,
    dropZones,
    setDropZoneState,
  } = useDragDrop();

  useEffect(() => {
    return () => {
      addDropZone(id, { value: undefined, state: "empty" });
    };
  }, []);

  const setValue = (value: string | undefined) => {
    setDropZoneValue(id, value);
    setDropZoneState(id, "added");
    onValueChange && onValueChange(value);
  };

  const clear = () => {
    setDropZoneValue(id, undefined);
    setDropZoneState(id, "empty");
    onValueChange && onValueChange(undefined);
  };
  const value = dropZones[id] ? dropZones[id].value : undefined;
  const renderItems: DropZoneRender = {
    empty: (
      <div className=" w-full h-full rounded-md relative">
        <p className="abs-center">+</p>
      </div>
    ),
    added: render({ value, setValue, clear }),
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
  };
  return (
    <div
      onDrop={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setValue(dragData);
      }}
      onDragEnter={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (dropZones[id]) {
          if (!dropZones[id].value) {
            setDropZoneState(id, "adding");
          } else if (dropZones[id].value !== dragData) {
            setDropZoneState(id, "replacing");
          }
        }
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (dropZones[id]) {
          if (!dropZones[id].value && dropZones[id].state === "adding") {
            setDropZoneState(id, "empty");
          }
          if (dropZones[id].value && dropZones[id].state === "replacing") {
            setDropZoneState(id, "added");
          }
        }
      }}
      className={cn(" w-full h-full", className)}
    >
      {renderItems[dropZones[id] ? dropZones[id].state : "empty"]}
    </div>
  );
};

export { DragDrop, DraggableCard, DropZone };
