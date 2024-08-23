import { FC } from "react";

const Preloader: FC = () => (
  <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 w-min">
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-150"></div>
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-300"></div>
    </div>
  </div>
);

export default Preloader;
