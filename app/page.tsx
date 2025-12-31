import { Button } from "@/components/ui/design-system/button/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button variant="default">default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="link">link</Button>
      <Button variant="outline">outline</Button>
      <Button variant="secondary">secondary</Button>
    </div>
  );
}
