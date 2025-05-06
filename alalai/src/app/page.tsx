import ChatBox from "./components/chatBox";
import Navigation from "./components/navBar";


export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
  <main className="w-full sm:w-[80%] lg:w-[60%] xl:w-[40%]">
    <Navigation />
    <ChatBox />
  </main>
  <footer className="flex gap-6 flex-wrap items-center justify-center"></footer>
</div>

  );
}
