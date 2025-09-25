import { type Toast, useToasts } from "$/shared/toasts.store";
import Fieldset from "./Fieldset";

const bread: Toast = {
	type: "warning",
	message: new Date().toISOString(),
};
const MakeToast = () => {
	return (
		<Fieldset title="Toast test" help="clickmeclickme!">
			<button
				class="btn btn-secondary btn-xl"
				onClick={() => useToasts.cook(bread)}
			>
				Toast
			</button>
		</Fieldset>
	);
};

export { MakeToast };
