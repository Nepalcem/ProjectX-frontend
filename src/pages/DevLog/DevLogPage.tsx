import type { FC } from "react";
import DevLog from "../../components/DevLog/DevLog";

const DevLogPage: FC = () => {
  return (
    <div className="devlog-page w-full max-w-lg">
      <DevLog />
    </div>
  );
};

export default DevLogPage;
