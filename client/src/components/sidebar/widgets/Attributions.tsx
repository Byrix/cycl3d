import { Icon } from '@iconify/react';
import { signal } from '@preact/signals';
import { map } from '$/shared/cesium.store';

const sources = signal<string[]>([]);
const children = signal<HTMLLIElement[]>([]);
const retry = signal<number>();

const getChildren = (attempt=0) => {
  children.value = map.viewer?.creditDisplay._creditList.childNodes;
  if (attempt===5) {
    console.error("Attempted to get children 5 times without success")
    if (retry.value) clearTimeout(retry.value)
  } else if (!children.value || children.value.length === 0) {
    retry.value = window.setTimeout(() => {
      console.warn(`Attempt: ${attempt}`)
      getChildren(attempt++);
      clearTimeout(retry.value);
    }, 500);
  }
  getSources();
}

const getSources = () => {
  if (!children.value) return;

  let sourceArr: string[] = [];
  children.value.forEach((item) => { 
    sourceArr.push(item.outerText);
  });

  sources.value = sourceArr;
}

const DataAttribution = () => {
  getChildren();
  return (
    <div tabIndex={0} class='mt-2 collapse collapse-arrow bg-base-100 border border-neutral' onClick={() => console.debug("Clicked - parent")}>
      <div class='collapse-title font-semibold' onClick={() => getChildren()}>Data Attribution</div>
      <div class='collapse-content text-sm overflow-scroll'>
        <ul class='list'>
          {sources.value.map((source: string) => <AttributionItem credit={source} />)}
        </ul>
      </div>
    </div>
  );
}

const AttributionItem = ({ credit }: { credit: string}) => {
  if (credit==="") return;
  return (
    <li class='list-row'>
      <div><Icon icon="material-symbols:search" className='size-6' /></div>
      <div>
        <div>Title</div>
        <div class='text-xs uppercase font-semibold opacity-60'>{credit}</div>
      </div>
    </li>
  );
}

export default DataAttribution;

