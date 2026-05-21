"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const mockCapitalFlow = [
  { date: "周一", inflow: 2.3, outflow: 1.1 },
  { date: "周二", inflow: 3.1, outflow: 1.8 },
  { date: "周三", inflow: 1.5, outflow: 2.4 },
  { date: "周四", inflow: 4.2, outflow: 1.2 },
  { date: "周五", inflow: 2.8, outflow: 1.6 },
];

const mockMainForce = [
  { name: "主力吸筹", value: 65, color: "#ef4444" },
  { name: "主力洗盘", value: 20, color: "#f59e0b" },
  { name: "主力出货", value: 15, color: "#22c55e" },
];

const limitUpData = {
  基因1: 85,
  基因2: 72,
  基因3: 60,
  基因4: 45,
  基因5: 30,
};

const mockSector = [
  { name: "同板块强势", score: 78 },
  { name: "板块轮动契合", score: 65 },
  { name: "资金共鸣度", score: 82 },
];

const dragonTiger = [
  { date: "2025-05-15", reason: "日涨跌幅偏离值达7%", amount: 1.2, type: "买入" },
  { date: "2025-05-08", reason: "换手率达20%", amount: 0.8, type: "买入" },
  { date: "2025-04-28", reason: "日涨跌幅偏离值达7%", amount: 1.5, type: "卖出" },
];

function ScoreCard({ title, score, icon, desc }: { title: string; score: number; icon: string; desc: string }) {
  const color = score >= 70 ? "#ef4444" : score >= 40 ? "#f59e0b" : "#22c55e";
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      <div className="text-3xl font-bold font-mono mb-1" style={{ color }}>
        {score}<span className="text-sm text-gray-400">分</span>
      </div>
      <div className="text-xs text-gray-400">{desc}</div>
      <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [code, setCode] = useState("");
  const [stockName, setStockName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);

  const handleAnalyze = () => {
    if (!code.trim()) return;
    setAnalyzing(true);
    setStockName(code.startsWith("6") ? "示例股票（沪市）" : "示例股票（深市）");
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-dark p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan mb-2">五大游资诊股</h1>
          <p className="text-gray-400">资金流向 | 主力动向 | 涨停基因 | 板块联动 | 龙虎榜</p>
        </div>

        <div className="flex gap-3 mb-8 max-w-md mx-auto">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="输入股票代码，如 000001"
            className="flex-1 bg-card border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan"
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          />
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-cyan text-dark font-semibold px-6 py-3 rounded-lg hover:bg-cyan/90 transition disabled:opacity-50"
          >
            {analyzing ? "分析中..." : "诊股"}
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-xl font-semibold">{stockName}</div>
              <div className="text-gray-400 text-sm">{code}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <ScoreCard title="资金流向" score={72} icon="💰" desc="近5日主力净流入" />
              <ScoreCard title="主力动向" score={65} icon="🦁" desc="主力持仓变化趋势" />
              <ScoreCard title="涨停基因" score={78} icon="⚡" desc="涨停基因强度评分" />
              <ScoreCard title="板块联动" score={58} icon="🔗" desc="板块共振强度" />
              <ScoreCard title="龙虎榜" score={82} icon="🐯" desc="龙虎榜综合评分" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">💰 资金流向</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={mockCapitalFlow}>
                    <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #2a2a4e" }} />
                    <Bar dataKey="inflow" fill="#ef4444" name="净流入(亿)" />
                    <Bar dataKey="outflow" fill="#22c55e" name="净流出(亿)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">🦁 主力动向</h3>
                <div className="flex">
                  <ResponsiveContainer width="50%" height={200}>
                    <PieChart>
                      <Pie data={mockMainForce} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {mockMainForce.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #2a2a4e" }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 flex flex-col justify-center gap-2">
                    {mockMainForce.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-mono ml-auto">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">⚡ 涨停基因</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={Object.entries(limitUpData).map(([k, v]) => ({ name: k, value: v }))} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} width={60} />
                    <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #2a2a4e" }} />
                    <Bar dataKey="value" fill="#f59e0b" name="基因强度" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">🔗 板块联动</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={mockSector}>
                    <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #2a2a4e" }} />
                    <Bar dataKey="score" fill="#00d4ff" name="联动得分" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card border border-border rounded-xl p-4 md:col-span-2">
                <h3 className="font-semibold mb-4 flex items-center gap-2">🐯 龙虎榜</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 border-b border-border">
                        <th className="text-left py-2">日期</th>
                        <th className="text-left py-2">上榜原因</th>
                        <th className="text-right py-2">成交额(亿)</th>
                        <th className="text-right py-2">类型</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dragonTiger.map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2">{row.date}</td>
                          <td className="py-2">{row.reason}</td>
                          <td className="py-2 text-right font-mono">{row.amount}</td>
                          <td className="py-2 text-right">
                            <span className={row.type === "买入" ? "text-up" : "text-down"}>{row.type}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-3 text-center">综合诊断结论</h3>
              <div className="text-center">
                <span className="inline-block bg-up/20 text-up px-4 py-2 rounded-full text-lg font-semibold">
                  强势信号
                </span>
                <p className="mt-3 text-gray-400 text-sm">
                  该股近期资金面较为活跃，主力有吸筹迹象，涨停基因较强，建议关注板块联动机会
                </p>
              </div>
            </div>
          </div>
        )}

        {!result && !analyzing && (
          <div className="text-center text-gray-500 py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p>输入股票代码开始诊股</p>
          </div>
        )}
      </div>
    </main>
  );
}
