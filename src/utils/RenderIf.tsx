import { ReactNode } from "react";

const RenderIf = ({ children, isTrue }: { children: ReactNode; isTrue: boolean }): ReactNode | null => {
	return isTrue ? children : null;
};

export default RenderIf;
