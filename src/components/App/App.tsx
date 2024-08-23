import { FC } from "react";
import logo from "src/images/logo.svg";

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex justify-between items-center p-8 bg-white shadow">
        <img src={logo} className="w-10 h-10" alt="logo" />
        <a
          className="text-primary text-2xl font-bold hover:text-secondary transition-colors"
          href="https://github.com/mashuxa/tree"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tree GitHub
        </a>
      </header>
      <main className="flex-grow overflow-y-auto"></main>
    </div>
  );
};

export default App;
