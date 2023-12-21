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
  selectedData: string | undefined;
  setSelectedData: React.Dispatch<React.SetStateAction<string | undefined>>;
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
type DropZoneState = "empty" | "nonempty" | "adding" | "replacing";

type DropZoneRenderer = {
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
  const [selectedData, setSelectedData] = useState<string | undefined>(
    undefined
  );
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
        selectedData,
        setSelectedData,
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
  const { setSelectedData, selectedData } = useDragDrop();
  const [isSelfSelected, setSelfSelected] = useState(false);
  function setValue() {
    if (selectedData === value) {
      setSelectedData(undefined);
      return;
    }
    setSelectedData(value);
  }
  useEffect(() => {
    if (selectedData === value) {
      setSelfSelected(true);
    } else {
      setSelfSelected(false);
    }
  }, [selectedData]);

  return (
    <Card
      className={cn(
        " w-full h-full rounded-sm flex justify-center items-center",
        isSelfSelected ? "ring-ring ring-1" : "",
        className
      )}
      draggable
      onDragStart={setValue}
      onDoubleClick={setValue}
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
  render: ({}: {
    value: string | undefined;
    setValue: (value: string | undefined) => void;
    clear: () => void;
  }) => ReactNode;
  renderer?: Partial<Omit<DropZoneRenderer, "nonempty">>;
}) => {
  const id = useId();
  const {
    addDropZone,
    selectedData,
    setDropZoneValue,
    dropZones,
    setDropZoneState,
    setSelectedData,
  } = useDragDrop();

  useEffect(() => {
    return () => {
      addDropZone(id, { value: value, state: value ? "nonempty" : "empty" });
    };
  }, []);

  const setValue = () => {
    if (dropZones[id]) {
      if (dropZones[id].value === selectedData) {
        return;
      }
    }
    setSelectedData(undefined);
    setDropZoneValue(id, selectedData);
    setDropZoneState(id, selectedData ? "nonempty" : "empty");
    onValueChange && onValueChange(selectedData);
  };

  const clear = () => {
    setSelectedData(undefined);
    setDropZoneValue(id, undefined);
    setDropZoneState(id, "empty");
    onValueChange && onValueChange(undefined);
  };
  const renderItems: DropZoneRenderer = {
    empty: (
      <div className=" w-full h-full rounded-md relative">
        <p className="abs-center">+</p>
      </div>
    ),
    nonempty: render({
      value: dropZones[id] ? dropZones[id].value : undefined,
      setValue,
      clear,
    }),
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
  return (
    <div
      onDrop={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setValue();
      }}
      onClick={() => setValue()}
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
          } else if (dropZones[id].value !== selectedData) {
            setDropZoneState(id, "replacing");
          }
        }
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (dropZones[id]) {
          if (dropZones[id].state === "adding") {
            setDropZoneState(id, "empty");
          }
          if (dropZones[id].state === "replacing") {
            setDropZoneState(id, "nonempty");
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
