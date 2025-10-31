// app/layout.tsx
import "./globals.css";
export const metadata = {
  title: "SewaCycle",
  description: "Care your parents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8] text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
