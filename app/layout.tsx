import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InfraGuard AI — AI-assisted Terraform PR Reviews",
  description:
    "Catch security risks, cost changes, and Terraform quality issues before merge. InfraGuard AI turns scanner output into one clear Pull Request review comment.",
  keywords: [
    "Terraform",
    "infrastructure",
    "security",
    "DevOps",
    "AI",
    "pull request review",
    "tfsec",
    "Checkov",
    "Infracost",
    "GitHub Actions",
  ],
  openGraph: {
    title: "InfraGuard AI — AI-assisted Terraform PR Reviews",
    description:
      "Security, cost, and style review for Terraform Pull Requests. One clear PR comment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
