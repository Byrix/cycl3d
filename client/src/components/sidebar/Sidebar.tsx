import { Icon } from "@iconify/react";
import { DataFilter, Geocoder } from "./widgets";

const Sidebar = () => {
  return (
    <div class="w-1/5 h-full bg-base-200 min-w-50 flex flex-col p-4 gap-3 items-center border-y-2 border-base-300 overflow-scroll">
      <h3 className="text-primary text-2xl font-bold text-center">Sidebar</h3>
      <p className="text-center">Description</p>

      <div className="divider m-[0.5rem]">
        <Icon
          icon="material-symbols:directions-bike-rounded"
          className="size-10 opacity-20"
        />
      </div>

      <Geocoder />
      <DataFilter />
    </div>
  );
};

export default Sidebar;
