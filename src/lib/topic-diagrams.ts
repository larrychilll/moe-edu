import type { ComponentProps } from "react";
import {
  BeforeAfterPair,
  DecisionTree,
  DeviceState,
  NetworkSegment,
  PathDiagram,
  ProcessFlow,
  ScreenshotBlock,
} from "@/components/diagrams";

export type DiagramConfig =
  | ({ kind: "path" } & ComponentProps<typeof PathDiagram>)
  | ({ kind: "before-after" } & ComponentProps<typeof BeforeAfterPair>)
  | ({ kind: "decision" } & ComponentProps<typeof DecisionTree>)
  | ({ kind: "network-segment" } & ComponentProps<typeof NetworkSegment>)
  | ({ kind: "device-state" } & ComponentProps<typeof DeviceState>)
  | ({ kind: "process-flow" } & ComponentProps<typeof ProcessFlow>)
  | ({ kind: "screenshot" } & ComponentProps<typeof ScreenshotBlock>);

export const TOPIC_DIAGRAMS: Record<string, DiagramConfig[]> = {
  "ip-conflict-printer": [
    {
      kind: "network-segment",
      title: "兩台設備拿到一樣的網路位址",
      segments: [
        {
          label: "201 教室網段",
          sublabel: "192.168.10.x",
          tone: "danger",
          devices: [
            { emoji: "💻", label: "筆電 A · .25", tone: "alert" },
            { emoji: "💻", label: "筆電 B · .25", tone: "alert" },
            { emoji: "📱", label: "平板 · .26" },
          ],
        },
        {
          label: "三樓共用設備",
          sublabel: "依賴上方網段",
          tone: "default",
          devices: [
            { emoji: "🖨️", label: "印表機 · 離線", tone: "alert" },
            { emoji: "📺", label: "投影設備" },
          ],
        },
      ],
      caption:
        "兩台筆電同時拿到 192.168.10.25。網路系統不知道資料要送給誰，依賴它們的共用印表機也跟著失效。",
    },
    {
      kind: "process-flow",
      title: "現場可以這樣做",
      steps: [
        { label: "記錄錯誤畫面", detail: "拍下「網路 IP 設定衝突」的提示，方便資訊組判斷。" },
        { label: "詢問鄰座是否也異常", detail: "確認是一台還是整間教室都受影響。" },
        { label: "通報資訊組老師", detail: "請資訊組由設備編號（MAC）反查衝突來源。" },
        { label: "不要自行更改 IP 設定", detail: "避免衝突擴散到更多設備。" },
      ],
      caption: "找到衝突來源後才更動設定，避免一台變兩台。",
    },
  ],

  "printer-offline": [
    {
      kind: "device-state",
      title: "印表機顯示離線時的狀態",
      device: { emoji: "🖨️", name: "共用印表機" },
      state: "error",
      indicators: [
        { label: "電源燈：亮", status: "on" },
        { label: "網路埠燈：未亮", status: "warn" },
        { label: "佇列：有 3 份等待中", status: "warn" },
        { label: "電腦端：顯示離線", status: "warn" },
      ],
      caption: "印表機本體開著，但網路或電腦端看不到它。",
    },
    {
      kind: "decision",
      question: "印表機離線時，先這樣判斷",
      branches: [
        {
          condition: "全室都印不出來",
          outcome: "通常是網路或伺服器問題，請通報資訊組統一處理。",
          tone: "stop",
        },
        {
          condition: "只有自己印不出來",
          outcome: "可重新啟動電腦端的列印服務，再送一份測試。",
          tone: "ok",
        },
        {
          condition: "印表機面板有錯誤訊息",
          outcome: "拍下訊息（缺紙、卡紙、碳粉不足），交給印表機管理人。",
          tone: "warn",
        },
      ],
      caption: "先分辨「全室」還是「個人」，能省下很多排查時間。",
    },
  ],

  "wifi-weak-signal": [
    {
      kind: "network-segment",
      title: "Wi-Fi 訊號的傳遞距離",
      segments: [
        {
          label: "靠近基地台",
          sublabel: "訊號強",
          tone: "trusted",
          devices: [
            { emoji: "📱", label: "前排手機 · 滿格" },
            { emoji: "💻", label: "前排筆電 · 滿格" },
          ],
        },
        {
          label: "中段",
          sublabel: "訊號中等",
          tone: "default",
          devices: [
            { emoji: "📱", label: "中段手機 · 3 格" },
            { emoji: "💻", label: "中段筆電 · 3 格" },
          ],
        },
        {
          label: "靠牆角",
          sublabel: "訊號弱",
          tone: "danger",
          devices: [
            { emoji: "📱", label: "角落手機 · 1 格", tone: "alert" },
            { emoji: "💻", label: "角落筆電 · 跳線", tone: "alert" },
          ],
        },
        {
          label: "其他樓層",
          sublabel: "看不見",
          tone: "default",
          devices: [{ emoji: "📵", label: "完全收不到", tone: "muted" }],
        },
      ],
      caption: "Wi-Fi 訊號像聲音，離得越遠、隔越多牆，就越聽不清楚。",
    },
  ],

  "ap-overload": [
    {
      kind: "before-after",
      title: "人多人少時，同一台基地台的差異",
      before: {
        label: "下課同時湧入",
        emoji: "📶",
        note: "幾十台手機同時連線，一台基地台來不及回應，部分裝置被踢出或速度跳。",
      },
      after: {
        label: "錯開時段或增設",
        emoji: "📡",
        note: "錯開使用時段，或增設一台基地台分流，每台裝置都能拿到穩定速度。",
      },
      caption: "改善的關鍵不是訊號強度，而是有多少裝置擠在同一台。",
    },
  ],

  "wifi-wrong-network": [
    {
      kind: "decision",
      question: "連 Wi-Fi 前，先看名稱對不對",
      branches: [
        {
          condition: "顯示教學/校內專用名稱",
          outcome: "正確的網路，登入帳密後可使用全部校內系統。",
          tone: "ok",
        },
        {
          condition: "顯示「訪客」或「Guest」",
          outcome: "通常上得了網際網路，但無法登入校內系統與印表機。",
          tone: "warn",
        },
        {
          condition: "名稱很相似但不完全一樣",
          outcome: "可能是冒名的釣魚 Wi-Fi。不要連線，並通報資訊組。",
          tone: "stop",
        },
      ],
      caption: "Wi-Fi 名稱（SSID）差一個字母就可能是不同網路，連線前看清楚。",
    },
  ],

  "heavy-traffic-pc": [
    {
      kind: "before-after",
      title: "頻寬被一台電腦吃光的對照",
      before: {
        label: "一台電腦背景大上傳",
        emoji: "🚰",
        note: "雲端同步、系統更新或感染惡意挖礦，使該機長期吃光教室速度，全班變慢。",
      },
      after: {
        label: "暫停背景工作或設限",
        emoji: "💧",
        note: "暫停或排程到下課，讓每位同學都能拿到合理的速度，課程操作不卡頓。",
      },
      caption: "改善多半不需要更換設備，調整使用時段或排查背景工作即可。",
    },
  ],

  "malware-infection": [
    {
      kind: "process-flow",
      title: "懷疑電腦中毒時的處理順序",
      steps: [
        {
          label: "停止操作並保留畫面",
          detail: "拍下異常訊息或勒索提示，作為事後判斷依據。",
        },
        {
          label: "從網路隔離（不要關機）",
          detail: "拔網路線或停用 Wi-Fi 即可；關機可能會抹掉鑑識資料。",
        },
        {
          label: "通報資訊組老師",
          detail: "由資訊組依資安事件流程處理，必要時通報資安窗口。",
        },
        {
          label: "從乾淨備份還原",
          detail: "勒索軟體切勿付款，依備份策略還原資料。",
        },
      ],
      caption: "隔離 > 通報 > 還原。順序錯了，會讓災情擴大或證據消失。",
    },
  ],

  "phishing-link": [
    {
      kind: "decision",
      question: "點連結前，先看這幾件事",
      branches: [
        {
          condition: "寄件者網域與你熟悉的不一樣",
          outcome: "高機率是冒名。直接刪除，並通報資訊組。",
          tone: "stop",
        },
        {
          condition: "語氣急迫、要你立刻登入",
          outcome: "停下來。先另開一個新分頁手動到官網確認狀況。",
          tone: "warn",
        },
        {
          condition: "看起來像政府或銀行公告",
          outcome: "撥打公開的客服電話或回到官網確認，不要從信件連結進入。",
          tone: "warn",
        },
        {
          condition: "已經輸入帳密",
          outcome: "立即更改密碼，啟用兩步驟驗證，並通報資訊組。",
          tone: "stop",
        },
      ],
      caption: "釣魚靠急迫感與假冒。停下來幾秒，再決定要不要點。",
    },
  ],

  "broadcast-storm": [
    {
      kind: "network-segment",
      title: "一個壞掉的設備，影響整段網路",
      segments: [
        {
          label: "問題設備",
          sublabel: "故障 / 迴圈",
          tone: "danger",
          devices: [{ emoji: "📢", label: "持續發送大量訊息", tone: "alert" }],
        },
        {
          label: "同一段網路上其他設備",
          sublabel: "被迫不停聽訊息",
          tone: "default",
          devices: [
            { emoji: "💻", label: "教室電腦 · 卡", tone: "alert" },
            { emoji: "🖨️", label: "印表機 · 離線", tone: "alert" },
            { emoji: "📺", label: "投影設備 · 跳線", tone: "alert" },
          ],
        },
      ],
      caption: "廣播風暴像一台擴音器壞了一直叫，整段網路的設備都無法好好說話。",
    },
    {
      kind: "screenshot",
      interfaceName: "資訊組的網管監控畫面",
      description: "出現廣播風暴時，網管系統通常會顯示某段流量短時間飆高的警示。",
    },
  ],

  "duplicate-print-job": [
    {
      kind: "process-flow",
      title: "印表機佇列卡住時，怎麼處理",
      steps: [
        {
          label: "確認印表機面板有沒有錯誤",
          detail: "缺紙、卡紙、碳粉不足會讓所有人都印不出來。",
        },
        {
          label: "請最早送印的同事先暫停其工作",
          detail: "如果是上一份工作出錯，暫停它能讓佇列繼續往下。",
        },
        {
          label: "清除卡住的工作",
          detail: "由印表機管理人從電腦端的列印佇列清掉問題工作。",
        },
        {
          label: "重新啟動列印服務",
          detail: "重啟 Print Spooler 服務，多半就能恢復列印。",
        },
      ],
      caption: "不要每個人都用力連按列印，會讓佇列更亂。",
    },
    {
      kind: "screenshot",
      interfaceName: "Windows 列印佇列",
      description: "從「設定 → 印表機 → 開啟佇列」進入，能看到所有排隊中的工作。",
    },
  ],
};

