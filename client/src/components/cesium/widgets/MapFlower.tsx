import { Icon } from "@iconify/react";
import type { ComponentChildren } from "preact";
import { map } from "$/shared/cesium.store";
import { toggleFullscreen, togglePlane } from "./mapControls";

const MapFlower = () => {
  return (
    <div class="fab fab-flower bottom-[7vh]">
      <div tabindex={0} role="button" class="btn btn-primary btn-circle btn-xl">
        <Icon icon="material-symbols:menu" className="size-10" />
      </div>
      <button class="fab-close btn btn-primary btn-circle btn-xl">
        <Icon icon="material-symbols:close" className="size-10" />
      </button>

      <Petal
        tooltip="Navigation instructions"
        onClick={() => {
          console.debug("Nav");
        }}
      >
        <Icon icon="material-symbols:info" className="size-8" />
      </Petal>

      <Petal tooltip="Recentre map" onClick={map.flyHome}>
        <Icon icon="material-symbols:home" className="size-8" />
      </Petal>

      <Petal tooltip="Toggle 2D/3D" onClick={togglePlane}>
        <label class={`swap ${map.isPlanar && "swap-active"}`}>
          <Icon
            icon="material-symbols:3d-outline-rounded"
            className="swap-on size-8"
          />
          <Icon
            icon="material-symbols:2d-outline-rounded"
            className="swap-off size-8"
          />
        </label>
      </Petal>

      <Petal tooltip="Toggle fullscreen" onClick={toggleFullscreen}>
        <label class={`swap ${map.isFullscreen && "swap-active"}`}>
          <Icon
            icon="material-symbols:fullscreen-rounded"
            className="swap-off size-8"
          />
          <Icon
            icon="material-symbols:fullscreen-exit-rounded"
            className="swap-on size-8"
          />
        </label>
      </Petal>
    </div>
  );
};

const Petal = ({
  children,
  tooltip,
  onClick,
}: {
  children: ComponentChildren;
  tooltip: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="fab-main-action btn btn-lg btn-circle btn-primary btn-soft tooltip tooltip-left"
      data-tip={tooltip}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MapFlower;
