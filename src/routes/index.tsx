import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Útil Rent Car</h1>
      <p className="mt-4 text-lg text-gray-600">Em breve, um novo site para você.</p>
    </div>
  );
}
