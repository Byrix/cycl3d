function getIcon(icon: string, secIcon?: string) {
    var iconHTML;
    if (secIcon) {
        iconHTML = `
<label class='swap text-3xl/0'>
    <div class='swap-off material-symbols-outlined !text-2xl/0'>${icon}</div>
    <div class='swap-on material-symbols-outlined !text-2xl/0'>${secIcon}</div>
</label>`
    } else {
        iconHTML = `<div class='material-symbols-outlined !text-2xl/0'>${icon}</div>`
    }
    return iconHTML;
}

const swapFunction = (e: MouseEvent) => {
    // FIXME: Get correct type for click event to suppress error
    // @ts-expect-error see above note
    e.originalTarget.parentElement.classList.toggle('swap-active');
}

export default function overrideButtons(
    btn: HTMLButtonElement, 
    classes: string, 
    icon: string,
    secondIcon: string
) {
    btn.className=classes;
    btn.innerHTML=getIcon(icon, secondIcon);
    if (secondIcon) btn.addEventListener('click', swapFunction);
}