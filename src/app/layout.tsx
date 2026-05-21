import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "五大游资诊股",
  description: "从资金流向、主力动向、涨停基因、板块联动、龙虎榜五大维度诊断股票",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans SC:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
