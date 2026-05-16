export type AudienceKey =
  | "grade_1_3"
  | "grade_4_6"
  | "grade_7_9"
  | "grade_10_12"
  | "teacher"
  | "it_staff";

export type AudienceContent = {
  audience: AudienceKey;
  body: string;
};

export type CategorySlug =
  | "network-unavailable"
  | "network-slow"
  | "wifi-issues"
  | "printer-sharing"
  | "security-traffic"
  | "device-location";

export type Topic = {
  id: string;
  slug: string;
  categorySlug: CategorySlug;
  title: string;
  summary: string;
  scenario: string;
  whyItHappens: string;
  commonSymptoms: string[];
  safeFirstChecks: string[];
  doNotDo: string[];
  whenToEscalate: string;
  technicalNote: string;
  audienceVersions: AudienceContent[];
  symptomKeywords: string[];
  relatedSlugs: string[];
  imagePrompt: string;
};

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  iconEmoji: string;
  accent: string;
};

export type GradeBand = {
  slug:
    | "grade-1-3"
    | "grade-4-6"
    | "grade-7-9"
    | "grade-10-12"
    | "teacher"
    | "it-staff";
  name: string;
  tagline: string;
  audienceKey: AudienceKey;
};

export type QrLanding = {
  id: string;
  locationName: string;
  locationType: "classroom" | "office" | "printer" | "wifi" | "admin";
  commonIssues: string[];
  topicSlugs: string[];
  reportNote: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "network-unavailable",
    name: "網路不通",
    tagline: "Network Unavailable",
    description: "整間教室或部分設備完全連不上網路時，先從這裡找。",
    iconEmoji: "🌐",
    accent: "sky",
  },
  {
    slug: "network-slow",
    name: "網路不順",
    tagline: "Network Slow or Unstable",
    description: "可以上網但很慢、會卡、時通時斷，常與流量或設備有關。",
    iconEmoji: "🐢",
    accent: "amber",
  },
  {
    slug: "wifi-issues",
    name: "Wi-Fi 問題",
    tagline: "Wi-Fi Issues",
    description: "無線網路連不上、訊號弱、跳線、接錯網路。",
    iconEmoji: "📶",
    accent: "violet",
  },
  {
    slug: "printer-sharing",
    name: "印表機與共享設備",
    tagline: "Printer & Shared Devices",
    description: "共用印表機、共享資料夾、印列工作卡住等狀況。",
    iconEmoji: "🖨️",
    accent: "rose",
  },
  {
    slug: "security-traffic",
    name: "資安與異常流量",
    tagline: "Security & Anomaly",
    description: "惡意程式、釣魚連結、流量異常與內部攻擊偵測。",
    iconEmoji: "🛡️",
    accent: "emerald",
  },
  {
    slug: "device-location",
    name: "查線與設備位置",
    tagline: "Device & Line Tracing",
    description: "找出某台設備、追蹤線路、教室點位標示與廠商歸屬。",
    iconEmoji: "📍",
    accent: "slate",
  },
];

export const GRADE_BANDS: GradeBand[] = [
  {
    slug: "grade-1-3",
    name: "低年級 1-3",
    tagline: "用最簡單的比喻說明每天會遇到的網路小狀況。",
    audienceKey: "grade_1_3",
  },
  {
    slug: "grade-4-6",
    name: "中年級 4-6",
    tagline: "用故事和情境，讓同學理解網路為什麼會出狀況。",
    audienceKey: "grade_4_6",
  },
  {
    slug: "grade-7-9",
    name: "國中 7-9",
    tagline: "加入一點點原理：IP、Wi-Fi、頻寬是什麼意思。",
    audienceKey: "grade_7_9",
  },
  {
    slug: "grade-10-12",
    name: "高中 10-12",
    tagline: "理解校園網路架構與常見故障邏輯，培養數位素養。",
    audienceKey: "grade_10_12",
  },
  {
    slug: "teacher",
    name: "老師版",
    tagline: "課堂遇到網路問題時，可以怎麼安全初判與通報。",
    audienceKey: "teacher",
  },
  {
    slug: "it-staff",
    name: "資訊組老師版",
    tagline: "技術判斷重點、可能成因與升級處理建議。",
    audienceKey: "it_staff",
  },
];

const A = (audience: AudienceKey, body: string): AudienceContent => ({
  audience,
  body,
});

export const TOPICS: Topic[] = [
  // ===== network-unavailable =====
  {
    id: "t-01",
    slug: "external-line-down",
    categorySlug: "network-unavailable",
    title: "對外網路線路中斷：全校都連不出去？",
    summary:
      "外部進來的網路線中斷，整個校園都會連不到網際網路，但校內設備之間可能還是通的。",
    scenario:
      "上課時老師發現所有教室都連不上 Google、不能看影片，但區網內的共用資料夾還打得開，狀況同時出現在多棟樓。",
    whyItHappens:
      "校園網路要連到外面的網際網路，會經過一條由電信業者拉進校門的線路。如果這條線路施工、斷裂或電信機房異常，全校就會同時連不到外網。",
    commonSymptoms: [
      "全校同時連不上網際網路",
      "校內共享資料夾仍可使用",
      "Google、YouTube、雲端服務全部失效",
      "資訊組沒有變更設定但問題突然發生",
    ],
    safeFirstChecks: [
      "確認是不是全校都斷，還是只有自己教室",
      "問隔壁班是否也有相同情形",
      "嘗試打開校內的資源頁面確認內外網狀況",
    ],
    doNotDo: [
      "不要重置教室網路設備",
      "不要自己撥電信業者客服",
      "不要要求學生重新登入帳號排隊嘗試",
    ],
    whenToEscalate:
      "若確認全校都斷，請立即通報資訊組老師，由學校統一聯絡電信業者，不需各教室個別處理。",
    technicalNote:
      "Likely upstream WAN outage from ISP. Check edge router WAN status, BGP/PPPoE session, optical signal on the ONU. If校內 LAN/intranet 仍通，問題在 WAN 側。Open ticket with ISP and record incident timeline.",
    audienceVersions: [
      A("grade_1_3", "想像學校有一條大水管，把外面的網路水送進學校。如果這條大水管壞掉，全校都會沒水。同學等老師處理就好。"),
      A("grade_4_6", "校園網路要先連到外面，靠一條主要的線。如果這條線斷了，全校都會同時上不了 Google 或 YouTube，但教室裡電腦之間還可能是通的。"),
      A("grade_7_9", "校外網路是經過電信公司拉一條光纖到學校。這條線斷了，全校的對外連線都會中斷，內部區網仍可能正常。這時要等電信業者修復。"),
      A("grade_10_12", "校園 WAN 上行中斷會造成全校無法存取外部網路，但內部 LAN 通常仍運作。判斷重點是同時影響範圍與內外網對照，這是分辨故障層級的常見方法。"),
      A("teacher", "如果全校同時連不到外網但校內檔案還能開，通常是對外線路問題。請保持鎮定，告訴學生先做不需要網路的活動，並通報資訊組。"),
      A("it_staff", "確認 ONU 狀態燈、edge router WAN 介面、光功率讀數。若 ISP 線路異常，記錄時間、影響範圍、相關 log 後通報電信窗口，避免重複撥打。"),
    ],
    symptomKeywords: ["全校斷網", "連不到 Google", "對外線路", "WAN", "電信線路"],
    relatedSlugs: ["external-switch-failure", "fiber-abnormal", "vendor-responsibility"],
    imagePrompt:
      "Modern friendly vector illustration: a fiber cable from outside the school is broken at the gate, multiple classroom screens show no internet icon, school interior network still glowing. Warm, professional.",
  },
  {
    id: "t-02",
    slug: "external-switch-failure",
    categorySlug: "network-unavailable",
    title: "對外交換器故障：靠近機房的設備先掛？",
    summary:
      "負責對外連線的核心交換器若故障，所有需要對外的服務都會中斷，但部分內網功能可能還在。",
    scenario:
      "全校多棟樓同時無法上網，但校內監視系統還是運作的。資訊組檢查發現機房中對外的交換器指示燈異常。",
    whyItHappens:
      "校園網路的「對外總出入口」通常會經過一台核心交換器。如果這台設備過熱、電源異常或硬體老化，所有要送出去的資料都會卡住。",
    commonSymptoms: [
      "多棟樓同時無法上網",
      "校內部分服務仍可使用",
      "機房設備指示燈閃爍或熄滅",
      "重新整理頁面長時間沒反應",
    ],
    safeFirstChecks: [
      "確認是單一教室或多棟樓同時異常",
      "查看校內公告或資訊組是否已知問題",
      "若無法判斷，先停用網路相關課程活動",
    ],
    doNotDo: [
      "不要進入機房自行重啟設備",
      "不要拔除走廊或機房任何網路線",
      "不要要求學生重複測試連線",
    ],
    whenToEscalate:
      "確認影響範圍跨棟、跨樓時，請第一時間通報資訊組，由資訊組依現場狀況決定是否需要原廠或維護廠商支援。",
    technicalNote:
      "Core/aggregation switch failure — check PSU, fans, port LEDs, syslog. Failover to backup uplink if available. Vendor RMA may be needed. Document affected VLANs and downstream switches.",
    audienceVersions: [
      A("grade_1_3", "學校網路有一個總開關設備，如果它壞掉，很多教室都會一起不能上網。資訊組老師會幫忙修。"),
      A("grade_4_6", "校園裡有一台很重要的網路設備，負責把全校資料送出去。如果它故障，多棟樓會一起斷網。"),
      A("grade_7_9", "核心交換器是校園網路的主要轉接設備。如果它故障，下游的多個樓層都會受影響。這通常需要原廠或維護廠商處理。"),
      A("grade_10_12", "核心交換器故障屬於關鍵單點失效。校園網路設計上應有備援，例如雙電源、雙上行。理解這個概念有助於認識資訊系統可靠性設計。"),
      A("teacher", "如果多棟樓同時連不上，且資訊組已在處理，請先停用網路課程內容並安撫學生。處理時間可能較長。"),
      A("it_staff", "檢查 core switch PSU、fan、port LED 與 syslog；切換備援上行（若有）。記錄受影響 VLAN、樓層，必要時聯絡維護廠商 RMA。"),
    ],
    symptomKeywords: ["核心交換器", "多棟樓斷網", "機房異常", "硬體故障"],
    relatedSlugs: ["external-line-down", "fiber-abnormal", "vendor-responsibility"],
    imagePrompt:
      "Vector illustration of a server room rack with one core switch showing red warning LEDs, technician calmly inspecting. Clean, professional, school setting.",
  },
  {
    id: "t-03",
    slug: "network-loop",
    categorySlug: "network-unavailable",
    title: "網路迴圈：訊息一直繞圈，整棟樓塞住",
    summary:
      "兩條網路線不小心接成一個圈，封包會在迴圈裡無限轉，造成整段網路癱瘓。",
    scenario:
      "電腦教室突然全部上不了網，廣播一響整層樓都跟著斷。檢查發現有同學把走廊的網路線接回另一個牆面孔位。",
    whyItHappens:
      "網路迴圈就像兩個人在走廊上不斷把同一張紙傳來傳去，誰都拿不到。封包一直繞，交換器很快就被塞滿，整段網路就會卡住。",
    commonSymptoms: [
      "整層樓網路同時變慢或斷線",
      "交換器指示燈瘋狂閃爍",
      "問題在接上特定一條線後出現",
      "拔掉那條線後狀況立刻改善",
    ],
    safeFirstChecks: [
      "回想最近是否有人接上新的網路線",
      "請學生先離開現場不要再插拔",
      "保持線路位置不要再變動",
    ],
    doNotDo: [
      "不要自行重新插拔牆上孔位",
      "不要把不認識的網路線接上電腦",
      "不要重置交換器嘗試「修好」",
    ],
    whenToEscalate:
      "若整層樓同時異常並伴隨交換器燈號狂閃，請立即通報資訊組，並避免再有人插拔網路線。",
    technicalNote:
      "Network loop — broadcast storm signature. Enable STP/RSTP on access switches, configure BPDU guard and loop guard on edge ports. Identify loop port via MAC flap logs, shut/no-shut after physical removal.",
    audienceVersions: [
      A("grade_1_3", "如果兩條線不小心接成一個圈圈，網路訊息會一直繞，就像球一直滾出不去。發現時不要再亂插線。"),
      A("grade_4_6", "網路迴圈就像兩個同學一直把訊息傳來傳去，整個班就沒人能說話了。發現時要先把多餘的線拔掉。"),
      A("grade_7_9", "如果兩個網路孔被同一條線繞回來，會形成迴圈，造成廣播風暴。交換器有 STP 機制可以阻止，但仍需先排除實體迴圈。"),
      A("grade_10_12", "L2 迴圈會在沒有 STP 的情況下造成廣播風暴。理解 spanning tree 的角色，是維護校園網路穩定的基本概念。"),
      A("teacher", "若懷疑同學或廠商把網路線重複接上，請先請大家不要再動孔位，並通報資訊組老師到現場確認。"),
      A("it_staff", "Confirm with MAC flap and topology change counter on access switch. Enable BPDU guard, loop guard on edge ports. Physically locate the loop, document the port."),
    ],
    symptomKeywords: ["網路迴圈", "整層樓斷網", "廣播風暴", "亂接線"],
    relatedSlugs: ["broadcast-storm", "rogue-dhcp", "line-tracing"],
    imagePrompt:
      "Vector illustration: two network cables forming a loop between two wall ports, packets shown as arrows spinning in circles, friendly school hallway setting.",
  },
  {
    id: "t-04",
    slug: "rogue-dhcp",
    categorySlug: "network-unavailable",
    title: "私接 IP 分享器：教室出現「假冒老師」發座號",
    summary:
      "有人把家用 IP 分享器接進校園網路，會發出錯誤的位址，多台設備就被指到不對的地方。",
    scenario:
      "某天 305 教室幾台電腦突然連不到校內任何系統，但同學手機卻能用。檢查發現電腦拿到了奇怪的 IP，後方一台分享器在閃燈。",
    whyItHappens:
      "校園網路本來有資訊組統一發放 IP 位址，像老師發座號。若有人接了私人 IP 分享器，它會搶著當老師發錯的座號，設備就連不到原本的服務。",
    commonSymptoms: [
      "幾台電腦突然連不到校內系統",
      "電腦顯示奇怪的 IP 位址",
      "問題只發生在某幾間教室",
      "有人最近帶來家用無線分享器",
    ],
    safeFirstChecks: [
      "看看教室或鄰近區域是否多了陌生設備",
      "詢問同學是否有人帶分享器來",
      "保留現場狀態不要拔掉",
    ],
    doNotDo: [
      "不要自行調整電腦的 IP 設定",
      "不要把更多分享器接上去想「補強訊號」",
      "不要拔掉學校原本的設備",
    ],
    whenToEscalate:
      "發現可疑分享器或設備拿到奇怪 IP 時，請通報資訊組，由資訊組依授權處理私接設備。",
    technicalNote:
      "Rogue DHCP server (often consumer router). Enable DHCP snooping on access switches, trust only the school DHCP uplink. Identify rogue MAC via ARP table; locate switch port and disable.",
    audienceVersions: [
      A("grade_1_3", "如果有人把家裡的小盒子接到學校網路，可能會發錯座號，大家就找不到自己的位子。不要把自己的網路設備帶來接到學校。"),
      A("grade_4_6", "校園網路有專門的老師發 IP 座號。如果有人偷接分享器，會像假老師亂發座號，造成同學連不到課程系統。"),
      A("grade_7_9", "未經授權的家用分享器會發出錯誤的 DHCP，影響教室網路。請不要把家裡的分享器帶到學校使用。"),
      A("grade_10_12", "私接 IP 分享器會造成 rogue DHCP，並可能引入 NAT 與安全風險。校園網路屬於管理區域，使用個人設備應遵守校規。"),
      A("teacher", "如果教室出現多台電腦同時連不到校內系統，可以順手看看附近是否有同學帶了分享器，並通報資訊組。"),
      A("it_staff", "Enable DHCP snooping on access switches with trusted uplink only. Identify rogue via ARP + MAC table, trace to port, disable and document. Consider IP source guard."),
    ],
    symptomKeywords: ["IP 分享器", "私接設備", "DHCP 異常", "拿到怪 IP"],
    relatedSlugs: ["ip-conflict-printer", "network-loop", "find-ip-device"],
    imagePrompt:
      "Vector illustration: a consumer home router placed beside a classroom desk, plugged into a school wall port, students puzzled. Clean modern school setting.",
  },
  {
    id: "t-05",
    slug: "fiber-abnormal",
    categorySlug: "network-unavailable",
    title: "光纖異常：光訊號變弱或時通時斷",
    summary:
      "光纖被壓到、彎折太大或接頭髒污時，光訊號變弱或中斷，會造成連線不穩或全段中斷。",
    scenario:
      "圖書館的網路時通時斷已經兩天，下雨天特別嚴重。檢查機房光收發器發現光功率異常偏低。",
    whyItHappens:
      "光纖傳送資料靠光訊號。如果光纖被壓到、彎折太大、接頭髒污或被動物啃咬，光訊號就會變弱，網路會時通時斷或完全中斷。",
    commonSymptoms: [
      "特定區段時通時斷",
      "天氣或溫度變化時更明顯",
      "光收發器顯示異常",
      "重新接駁後短時間恢復又斷",
    ],
    safeFirstChecks: [
      "回想最近是否有施工或搬動",
      "確認影響範圍是否固定在同一線段",
      "記錄發生時間幫助判斷",
    ],
    doNotDo: [
      "不要直視光纖接頭",
      "不要自行擦拭光纖端子",
      "不要彎折或拉動可疑的光纖線",
    ],
    whenToEscalate:
      "若某段網路反覆時通時斷且影響特定區域，請通報資訊組，由專業人員檢查光功率並安排維護廠商。",
    technicalNote:
      "Check optical TX/RX power on SFP, compare to threshold. Inspect fiber for bend radius, dirty connectors (clean with proper tool), or rodent damage. Consider OTDR test for longer segments.",
    audienceVersions: [
      A("grade_1_3", "校園網路裡有一種用光來傳訊息的線，如果被壓壞或弄髒，網路就會斷斷續續。看到這種線不要碰。"),
      A("grade_4_6", "光纖是用光傳訊息的特別線路。如果被壓到或彎折，光跑不過去，網路就會變慢或斷掉。"),
      A("grade_7_9", "光纖透過光訊號傳資料，比一般網路線更敏感。彎折半徑過小、接頭髒污、施工碰撞都會造成訊號衰減。"),
      A("grade_10_12", "光纖通訊依賴光功率穩定。彎折、髒污、接頭氧化都會造成衰減，理解這點有助於認識實體層的可靠性。"),
      A("teacher", "若某區網路反覆時通時斷，且與最近施工或裝修有關，請告訴資訊組是否有相關工程，幫助判斷。"),
      A("it_staff", "讀 SFP DOM 數據（TX/RX power、temperature）。若 RX power 接近 sensitivity threshold，可能需重接、清潔或 OTDR 檢測光纖路徑。"),
    ],
    symptomKeywords: ["光纖", "時通時斷", "光訊號弱", "光功率"],
    relatedSlugs: ["external-line-down", "cable-old-damaged", "line-tracing"],
    imagePrompt:
      "Vector illustration: a delicate orange fiber optic cable bent sharply behind a wall panel, light leaking out, technician with diagnostic tool. Calm school maintenance scene.",
  },
  {
    id: "t-06",
    slug: "ip-conflict-printer",
    categorySlug: "network-unavailable",
    title: "IP 衝突：為什麼有人上不了網，印表機也突然不能印？",
    summary:
      "兩台設備拿到一樣的 IP 位址，網路就不知道資料要送給誰，常造成連線中斷或共用印表機失效。",
    scenario:
      "201 教室有兩台筆電同時無法上網，三樓共用印表機顯示離線。重開機後其中一台恢復，另一台仍斷線。",
    whyItHappens:
      "IP 就像每台設備在校園網路裡的座位號碼。如果同一個座號被兩台設備同時拿到，網路系統就會無法正確投遞資料，兩邊互相搶資源，最後都不順。",
    commonSymptoms: [
      "電腦提示「網路 IP 設定衝突」",
      "共用印表機顯示離線",
      "部分設備時通時斷",
      "重開機後問題換到另一台",
    ],
    safeFirstChecks: [
      "確認是一台還是整間教室都有問題",
      "重新啟動電腦或印表機觀察",
      "保留錯誤訊息畫面或拍照",
    ],
    doNotDo: [
      "不要自行更改 IP 設定",
      "不要把印表機重置成出廠設定",
      "不要把可疑分享器接到網路想「分流」",
    ],
    whenToEscalate:
      "若多台設備同時異常，或重開機後仍無法恢復，請通報資訊組，由資訊組找出衝突來源。",
    technicalNote:
      "Duplicate IP — often static IP misconfigured on a new device, or rogue DHCP. Check ARP table on L3 switch, identify MAC pair sharing the IP, trace to switch port. Verify DHCP scope and reservations.",
    audienceVersions: [
      A("grade_1_3", "想像每個人都有自己的座號。如果兩個同學拿到一樣的座號，老師發作業就會搞錯。網路也是這樣，告訴老師讓資訊組老師處理。"),
      A("grade_4_6", "校園網路裡每台設備都有座號，叫做 IP。如果兩台設備拿到一樣的座號，資料就送不到正確的地方。"),
      A("grade_7_9", "IP 是設備在網路裡的識別碼。重複的 IP 會讓資料無法正確投遞，常見於有人手動設了固定 IP 或私接分享器。"),
      A("grade_10_12", "IP 衝突會破壞網路層的可達性。校園內常見成因有 static IP 誤設、rogue DHCP、設備未釋放租約。資訊組通常會用 ARP 與 DHCP log 排查。"),
      A("teacher", "若教室出現多台設備同時連線不穩、共用印表機離線，請收集症狀（哪幾台、何時開始）後通報資訊組，不要自行更改 IP。"),
      A("it_staff", "Check ARP entries for duplicates, correlate to switch port via MAC table. Inspect DHCP server logs for conflict. If rogue DHCP, see rogue-dhcp playbook."),
    ],
    symptomKeywords: ["IP 衝突", "印表機離線", "連不上網", "DHCP 異常"],
    relatedSlugs: ["rogue-dhcp", "printer-offline", "find-ip-device"],
    imagePrompt:
      "Modern friendly vector illustration of a Taiwanese classroom where two laptops accidentally hold the same network address (duplicated seat-number cards), teacher puzzled while printer shows error icon. Warm palette.",
  },

  // ===== network-slow =====
  {
    id: "t-07",
    slug: "heavy-traffic-pc",
    categorySlug: "network-slow",
    title: "單一電腦流量異常：一台機器吃掉整個教室的網路",
    summary:
      "某台電腦短時間內傳出大量資料，會把整個教室的網路頻寬佔光，讓其他人都變慢。",
    scenario:
      "電腦課時整間教室網路變得很卡。檢查後發現某一台電腦背景在大量上傳檔案到雲端，且更新程式同時啟動。",
    whyItHappens:
      "教室的網路頻寬是大家共用的，像水管。如果有一台電腦突然把水管整個吸住，其他人就只剩一點點水可用。",
    commonSymptoms: [
      "整間教室同時變慢",
      "某幾台電腦正常但其他都卡",
      "重新整理頁面要等很久",
      "問題在特定時段才出現",
    ],
    safeFirstChecks: [
      "暫停大型下載或更新工作",
      "詢問同學是否正在上傳影片或備份",
      "重新整理觀察是否改善",
    ],
    doNotDo: [
      "不要每位學生都同時測速試圖排查",
      "不要中途強制關閉學生電腦",
      "不要重置教室網路設備",
    ],
    whenToEscalate:
      "若多次反覆出現且找不到單一來源，請通報資訊組，由資訊組查看流量紀錄定位來源。",
    technicalNote:
      "Look at flow records (NetFlow/sFlow) or per-port utilization on access switch. Identify top talker, correlate to user/device. Common causes: cloud backup, OS update, P2P, mining malware.",
    audienceVersions: [
      A("grade_1_3", "教室的網路像一條大水管，大家一起喝。如果一個人偷偷把水管整個吸住，其他人就沒水了。"),
      A("grade_4_6", "全班共用一條網路，如果有同學的電腦突然下載很大的東西，全班會一起變慢。"),
      A("grade_7_9", "教室頻寬是共享資源。當某台電腦在背景上傳或下載大量資料，其他人的延遲就會升高。"),
      A("grade_10_12", "頻寬是有限的共享資源。識別 top talker、理解 QoS 與流量整形，是維護共用網路品質的基本概念。"),
      A("teacher", "若整班同時變慢，可請大家先暫停下載與雲端同步活動，觀察是否改善。若不改善，請通報資訊組。"),
      A("it_staff", "Pull flow data, identify top talkers by IP/MAC. If recurring, consider per-port rate limit or QoS policy for classroom VLANs."),
    ],
    symptomKeywords: ["網路很慢", "整班卡頓", "流量爆量", "頻寬被吃"],
    relatedSlugs: ["broadcast-storm", "ap-overload", "malware-infection"],
    imagePrompt:
      "Vector illustration: one laptop in a classroom row pulling oversized data icons out of a shared pipe, while other students' devices receive only trickles. Friendly diagrammatic style.",
  },
  {
    id: "t-08",
    slug: "l2-switch-slow",
    categorySlug: "network-slow",
    title: "L2 交換器反應過慢：教室一片卡，但機房好像沒事",
    summary:
      "教室裡負責轉接的小型交換器若老舊或過熱，會回應緩慢，整間教室都覺得網路卡。",
    scenario:
      "319 教室從上午開始就普遍變慢，但隔壁教室一切正常。資訊組到教室發現牆角的小型交換器在發熱、燈號偶有閃爍。",
    whyItHappens:
      "每個教室通常有一台小型交換器，把所有電腦的網路連起來。如果它老舊、過熱或灰塵阻塞，反應就會變慢，整間教室的網路品質都會下降。",
    commonSymptoms: [
      "單一教室明顯比其他班慢",
      "交換器很熱或燈號異常",
      "重啟設備短時間改善",
      "問題反覆出現",
    ],
    safeFirstChecks: [
      "確認影響範圍只限這間教室",
      "看看設備周邊是否被遮住散熱",
      "不要再額外接新設備到同一台交換器",
    ],
    doNotDo: [
      "不要把交換器用紙箱蓋住",
      "不要自行重置交換器",
      "不要拆開設備檢查",
    ],
    whenToEscalate:
      "若同一間教室反覆出現網路慢且伴隨設備溫度異常，請通報資訊組安排檢修或更換。",
    technicalNote:
      "Aging L2 switch may suffer CPU saturation, buffer exhaustion or thermal throttling. Check CPU/memory, port error counters, temperature. Plan for replacement if EOL.",
    audienceVersions: [
      A("grade_1_3", "每間教室都有一個小盒子幫大家連網路。如果它太熱，就會反應變慢，網路也會變慢。"),
      A("grade_4_6", "教室裡有一台小型網路設備，幫忙轉接訊息。如果它太舊或太熱，整間教室都會跟著卡。"),
      A("grade_7_9", "教室層級的 L2 交換器負責把多台電腦接到校內網路。當它老舊或過熱，會造成整段網路品質下降。"),
      A("grade_10_12", "L2 交換器是教室與骨幹之間的橋樑。它的健康度（CPU、溫度、錯誤計數）會直接影響教室體驗。"),
      A("teacher", "若只有自己教室變慢，且其他班正常，可先確認設備周邊散熱，並通報資訊組排查。"),
      A("it_staff", "Check switch CPU/memory, interface error counters, temperature. Inspect for dust accumulation. Plan replacement if hardware aging or EOL."),
    ],
    symptomKeywords: ["教室慢", "交換器", "過熱", "L2 反應慢"],
    relatedSlugs: ["broadcast-storm", "cable-old-damaged", "heavy-traffic-pc"],
    imagePrompt:
      "Vector illustration: a small wall-mounted network switch in a classroom corner glowing slightly red from heat, while students wait at their slow computers. Warm professional tone.",
  },
  {
    id: "t-09",
    slug: "broadcast-storm",
    categorySlug: "network-slow",
    title: "內部廣播風暴：訊息一直被到處喊話",
    summary:
      "校內出現大量廣播封包時，所有設備都得停下來「聽訊息」，整段網路就會被癱瘓。",
    scenario:
      "走廊上多個教室同時出現網路極慢、登入頁面跑不出來，網管系統警示廣播流量爆量。",
    whyItHappens:
      "網路裡的「廣播」是對所有人喊話。正常情況下廣播很少，但如果有設備故障或迴圈出現，廣播會像一群人同時擴音器吼叫，誰也聽不到正常訊息。",
    commonSymptoms: [
      "多間教室同時變慢或斷線",
      "登入網頁等待時間異常",
      "網管系統廣播流量警示",
      "拔除某條線後狀況改善",
    ],
    safeFirstChecks: [
      "確認影響範圍與是否最近有新增設備",
      "不要再接新設備到網路上",
      "保留現場狀況供資訊組到場判斷",
    ],
    doNotDo: [
      "不要重置教室設備嘗試解決",
      "不要把線路重新插拔猜測",
      "不要把備用線臨時接上",
    ],
    whenToEscalate:
      "若廣播風暴跨多教室同時出現，請立刻通報資訊組，由資訊組從機房側阻斷異常源頭。",
    technicalNote:
      "Broadcast storm typically from L2 loop, faulty NIC, or misconfigured device. Enable STP/BPDU guard, storm-control on access ports. Identify ingress port via switch counters.",
    audienceVersions: [
      A("grade_1_3", "想像班上很多同學同時拿擴音器一直喊話，老師說的話誰都聽不到。網路如果這樣，就會變超慢。"),
      A("grade_4_6", "網路廣播就像對全班喊話。如果一直有人喊不停，正常的訊息就傳不出去，網路就會塞住。"),
      A("grade_7_9", "廣播風暴常因為迴圈或故障設備造成。每個設備都要回應廣播，整段網路就會被癱瘓。"),
      A("grade_10_12", "Broadcast storm 會導致 CPU 與頻寬同時被吃光。理解 storm-control 與 STP 的角色，有助於設計穩定的 L2 網路。"),
      A("teacher", "如果多教室同時卡頓且資訊組已在處理，請先停下需要網路的活動，等候排除。"),
      A("it_staff", "Enable storm-control thresholds on access switches; ensure STP/RSTP active with BPDU guard. Trace via counter spikes and disable offending port."),
    ],
    symptomKeywords: ["廣播風暴", "多教室斷網", "突然超慢", "storm"],
    relatedSlugs: ["network-loop", "abnormal-broadcast", "l2-switch-slow"],
    imagePrompt:
      "Vector illustration: a school hallway where megaphone icons fly everywhere, students covering ears, network packets bouncing. Friendly diagrammatic.",
  },
  {
    id: "t-10",
    slug: "abnormal-broadcast",
    categorySlug: "network-slow",
    title: "異常廣播封包：某台設備一直「自言自語」",
    summary:
      "某些故障設備或被感染的電腦會持續發出廣播訊息，雖未到風暴等級，但仍會拖慢網路。",
    scenario:
      "資訊組監控發現某段網路廣播比平常高，但教室並沒有明顯斷線。追查發現是一台老舊網路印表機固定發送異常封包。",
    whyItHappens:
      "正常的設備偶爾才會廣播。若某台設備故障、被感染惡意程式，或網卡老化，就可能持續發送大量廣播，逐漸拖慢網路。",
    commonSymptoms: [
      "網路偶爾卡頓但沒完全斷",
      "監控顯示廣播比例偏高",
      "問題與某段網路相關",
      "拔除特定設備後改善",
    ],
    safeFirstChecks: [
      "回想最近是否新增老舊設備",
      "詢問教室是否有特殊設備接入",
      "保留現場狀態供資訊組檢查",
    ],
    doNotDo: [
      "不要自行拔插教室所有網路線",
      "不要為了測試重新插拔老舊印表機",
      "不要重置電腦想「清除」廣播",
    ],
    whenToEscalate:
      "若廣播流量持續異常，但教室沒有明顯感覺，仍建議通報資訊組安排排查。",
    technicalNote:
      "Locate broadcast source via switch port counters. Common culprits: aging NIC, faulty printer, malware (e.g., ARP scanner). Isolate, replace NIC or update firmware as needed.",
    audienceVersions: [
      A("grade_1_3", "有時候某台設備會一直自言自語，雖然聲音不大，但聽久了大家還是會分心。網路設備也會這樣。"),
      A("grade_4_6", "故障的設備可能一直發訊息打擾大家，雖然不會立刻斷網，但時間久了大家都會變慢。"),
      A("grade_7_9", "異常廣播會逐漸吃掉頻寬與 CPU 資源。常見來源是老舊網卡、故障印表機或惡意程式。"),
      A("grade_10_12", "ARP 掃描、廣播風暴與異常廣播是 L2 故障與資安事件的常見線索。理解這類訊號有助於識別問題源頭。"),
      A("teacher", "若資訊組通知教室某設備異常，請配合協助關閉或暫停使用該設備，避免影響更多人。"),
      A("it_staff", "Use port counters or SPAN to capture broadcast source MAC. Verify ARP scan signatures (possible malware) and isolate device until cleared."),
    ],
    symptomKeywords: ["異常廣播", "網路慢", "舊印表機", "ARP 掃描"],
    relatedSlugs: ["broadcast-storm", "malware-infection", "heavy-traffic-pc"],
    imagePrompt:
      "Vector illustration: an old printer in a corner emitting small broadcast bubbles continuously into the network, while nearby devices look slightly tired. Diagrammatic, friendly.",
  },
  {
    id: "t-11",
    slug: "cable-old-damaged",
    categorySlug: "network-slow",
    title: "線材老化或接觸不良：訊號斷斷續續",
    summary:
      "網路線老舊、接頭鬆動或被門夾到時，會造成連線時通時斷與速度下降。",
    scenario:
      "教師辦公室同一個位置的電腦每隔幾分鐘就會斷線，重接網路線後一段時間又再斷。檢查發現線材外皮有破損。",
    whyItHappens:
      "網路線是金屬導線，外皮破損、接頭氧化、被門夾或彎折太多次，都會讓訊號變弱或忽通忽斷，影響網路品質。",
    commonSymptoms: [
      "同一台設備反覆斷線",
      "重接線後短暫恢復",
      "網速比同教室其他電腦慢很多",
      "線材外觀有破損或變形",
    ],
    safeFirstChecks: [
      "檢查網路線外觀是否破損",
      "改用備用線材測試",
      "確認接頭是否完全插入",
    ],
    doNotDo: [
      "不要強行硬塞已經鬆掉的接頭",
      "不要把破損線材纏起來繼續用",
      "不要自行剪接線材",
    ],
    whenToEscalate:
      "若更換線材後問題仍在，或牆面孔位異常，請通報資訊組安排線路與點位檢查。",
    technicalNote:
      "Replace patch cable, inspect RJ45 termination, run cable tester (NEXT, return loss). Inspect wall plate keystone. Replace damaged cabling promptly.",
    audienceVersions: [
      A("grade_1_3", "網路線就像一條小水管，如果被門夾到或破掉，水就會漏掉，網路就會斷斷續續。"),
      A("grade_4_6", "網路線用太久或被壓到，裡面的金屬會壞掉，訊號就會時有時無。"),
      A("grade_7_9", "老舊或損壞的網路線會造成訊號衰減與封包遺失，常表現為連線不穩或速度異常下降。"),
      A("grade_10_12", "實體層的小瑕疵會放大為應用層的延遲與斷線。理解纜線品質與測線觀念，是 IT 維運的基本素養。"),
      A("teacher", "若特定座位電腦反覆斷線，可先更換網路線測試，並通報資訊組安排線材檢查。"),
      A("it_staff", "Run cable tester (Fluke or comparable), check NEXT/return loss, re-terminate RJ45 or replace patch. Verify keystone jack and pull integrity."),
    ],
    symptomKeywords: ["線材老化", "網路斷斷續續", "接觸不良", "破皮網路線"],
    relatedSlugs: ["fiber-abnormal", "line-tracing", "find-ip-device"],
    imagePrompt:
      "Vector illustration: a damaged ethernet cable with cracked outer jacket near a wall plate, hand swapping in a fresh new cable, calm school office.",
  },

  // ===== wifi-issues =====
  {
    id: "t-12",
    slug: "ap-overload",
    categorySlug: "wifi-issues",
    title: "無線 AP 負載過高：人太多，Wi-Fi 擠爆了",
    summary:
      "一台無線基地台能同時服務的人有限。當太多裝置同時連上，Wi-Fi 會變慢或踢人。",
    scenario:
      "全校朝會結束後，學生回到圖書館同時連 Wi-Fi 寫作業。十分鐘後大家都覺得網路很慢或被踢出。",
    whyItHappens:
      "每台無線 AP 都有可以同時服務的設備上限。一旦超過，AP 就會回應變慢、訊號變差，甚至自動把後來的人踢下線。",
    commonSymptoms: [
      "某時段 Wi-Fi 突然變慢",
      "連上沒多久被踢出",
      "重新連結等待很久",
      "其他教室同一時間沒事",
    ],
    safeFirstChecks: [
      "確認是不是大量學生同時連線",
      "請部分同學暫時改用有線或手機資料",
      "錯開使用時段觀察改善",
    ],
    doNotDo: [
      "不要每位學生不斷重連嘗試",
      "不要把家用 AP 接上「補強」",
      "不要重置教室 AP",
    ],
    whenToEscalate:
      "若同一區域長期負載過高，請通報資訊組評估增加 AP 或調整覆蓋設計。",
    technicalNote:
      "AP saturation — check associated client count, channel utilization, retry rate. Consider band steering, increasing AP density, splitting SSIDs, or limiting per-client bandwidth.",
    audienceVersions: [
      A("grade_1_3", "Wi-Fi 就像教室裡的廣播。如果太多人同時要說話，就聽不清楚了，Wi-Fi 也會變慢。"),
      A("grade_4_6", "一台 Wi-Fi 設備只能同時陪伴有限的同學。如果太多人一起連，就會輪不到大家。"),
      A("grade_7_9", "AP 容量有限，當同一台 AP 連線數過多，頻道擁擠就會造成 Wi-Fi 卡頓。"),
      A("grade_10_12", "Wi-Fi 共享 air time，AP 過載會降低整體吞吐。理解頻段、頻道與容量規劃是空中網路設計的基本。"),
      A("teacher", "若某時段大量同學一起連 Wi-Fi 都很慢，可請部分同學分批使用，並通報資訊組評估增 AP。"),
      A("it_staff", "Audit associated clients, retries, channel utilization. Consider client load balancing, band steering, splitting 2.4/5/6 SSIDs, or adding AP density."),
    ],
    symptomKeywords: ["Wi-Fi 卡", "AP 過載", "連不上 Wi-Fi", "圖書館慢"],
    relatedSlugs: ["wifi-weak-signal", "wifi-wrong-network", "heavy-traffic-pc"],
    imagePrompt:
      "Vector illustration: a school library Wi-Fi AP surrounded by many student devices, a few being pushed back, friendly capacity diagram.",
  },
  {
    id: "t-13",
    slug: "wifi-weak-signal",
    categorySlug: "wifi-issues",
    title: "Wi-Fi 訊號太弱：明明連上了，但網速跟蝸牛一樣",
    summary:
      "離 AP 太遠、被牆壁阻擋或干擾過多時，Wi-Fi 訊號雖然連得上，但速度與穩定度都會大幅下降。",
    scenario:
      "教學大樓最角落的教室一直反應 Wi-Fi 慢，現場測試訊號格只剩一格。檢查發現該教室與最近 AP 之間隔著兩道牆。",
    whyItHappens:
      "Wi-Fi 是無線訊號，會被距離、牆壁、金屬與其他電器干擾。訊號太弱時，設備要花很多時間重傳資料，網路就會變慢甚至斷線。",
    commonSymptoms: [
      "訊號只有一兩格",
      "連上後速度很慢",
      "在教室某一角更明顯",
      "走近 AP 才會改善",
    ],
    safeFirstChecks: [
      "看看坐位是否離 AP 較遠",
      "嘗試移近 AP 區域確認改善",
      "回報具體位置給資訊組",
    ],
    doNotDo: [
      "不要私自裝家用 Wi-Fi 補訊號",
      "不要把 AP 的位置改變",
      "不要遮蔽或包覆 AP 設備",
    ],
    whenToEscalate:
      "若整間教室訊號普遍偏弱，請通報資訊組評估增設或調整 AP 位置。",
    technicalNote:
      "RSSI < -75 dBm usually means poor coverage. Check site survey, AP placement, channel interference. Consider AP relocation or additional coverage.",
    audienceVersions: [
      A("grade_1_3", "Wi-Fi 像看不見的線。如果離得太遠，線就會變很細，網路會變慢。"),
      A("grade_4_6", "Wi-Fi 訊號像聲音，離 AP 太遠或中間隔很多牆，聲音就會變很小，網路就會慢。"),
      A("grade_7_9", "Wi-Fi 訊號強度（RSSI）會隨距離與障礙物衰減。訊號太弱時，連線雖在但傳輸效率會降低。"),
      A("grade_10_12", "RSSI、SNR 與 channel utilization 共同決定 Wi-Fi 體驗。理解這些指標有助於評估與規劃無線網路覆蓋。"),
      A("teacher", "若教室某區域訊號特別弱，請回報資訊組具體位置，方便評估是否增 AP。"),
      A("it_staff", "Site survey with RSSI/SNR mapping. Reposition AP, adjust antenna or add coverage. Avoid channel overlap on 2.4GHz."),
    ],
    symptomKeywords: ["Wi-Fi 訊號弱", "Wi-Fi 慢", "角落收不到", "RSSI"],
    relatedSlugs: ["ap-overload", "wifi-wrong-network", "cable-old-damaged"],
    imagePrompt:
      "Vector illustration: a Wi-Fi access point on the ceiling and a student at the far corner of a classroom showing only one signal bar, walls drawn translucent. Diagrammatic.",
  },
  {
    id: "t-14",
    slug: "wifi-wrong-network",
    categorySlug: "wifi-issues",
    title: "接錯 Wi-Fi 網路：上得了網但什麼都打不開",
    summary:
      "校內 Wi-Fi 有多個 SSID，學生若連到錯誤或訪客網路，可能無法登入校內系統或受到限制。",
    scenario:
      "電腦課老師發現幾位同學一直無法登入校內學習平台，但訊號很滿。檢查發現他們連到的是訪客網路而非教學網路。",
    whyItHappens:
      "校園通常有多個 Wi-Fi（例如教學、訪客、教師、行政）。不同網路權限不同，連錯 Wi-Fi 雖然能上網，但會被擋掉校內服務。",
    commonSymptoms: [
      "連上 Wi-Fi 但校內系統打不開",
      "瀏覽部分網站被限制",
      "顯示需要登入頁面",
      "其他同學在同教室卻沒事",
    ],
    safeFirstChecks: [
      "確認連到的 Wi-Fi 名稱",
      "切換到教學專用 Wi-Fi",
      "重新輸入帳密確認",
    ],
    doNotDo: [
      "不要把 Wi-Fi 密碼貼到網路上",
      "不要連到不熟悉的 Wi-Fi 名稱",
      "不要分享教師或行政 Wi-Fi 密碼給學生",
    ],
    whenToEscalate:
      "若教學 Wi-Fi 多次無法連線或登入，請通報資訊組檢查帳號與認證系統。",
    technicalNote:
      "Multiple SSID with different VLAN/policy. Verify SSID-to-VLAN mapping, captive portal status, RADIUS authentication. Educate users on which SSID to choose.",
    audienceVersions: [
      A("grade_1_3", "學校的 Wi-Fi 有不同名字，選對才能用學校的功能。請看清楚再選。"),
      A("grade_4_6", "學校有不同的 Wi-Fi 給不同的人用。如果選錯，可能會打不開上課用的網站。"),
      A("grade_7_9", "校園 Wi-Fi 通常分為教學、訪客、教師等不同 SSID。連錯權限不同，常見就是上得了網但用不了校內系統。"),
      A("grade_10_12", "校園 SSID 通常對應不同 VLAN 與政策。理解認證、VLAN、ACL 是企業級網路的常見設計。"),
      A("teacher", "若同學反映校內系統打不開，請先確認其 Wi-Fi 名稱是否正確（教學專用 SSID）。"),
      A("it_staff", "Validate SSID/VLAN mapping, RADIUS, captive portal status. Improve user prompts or signage to reduce mis-association."),
    ],
    symptomKeywords: ["接錯 Wi-Fi", "訪客網路", "登入不了", "SSID"],
    relatedSlugs: ["ap-overload", "wifi-weak-signal", "phishing-link"],
    imagePrompt:
      "Vector illustration: a phone showing multiple Wi-Fi network names, a student unsure which to choose, classroom poster with correct SSID highlighted.",
  },

  // ===== printer-sharing =====
  {
    id: "t-15",
    slug: "printer-offline",
    categorySlug: "printer-sharing",
    title: "共用印表機離線：明明開著卻不能印",
    summary:
      "印表機在電腦上顯示離線，原因可能是連線中斷、IP 衝突、印表機本身待機或網路節點異常。",
    scenario:
      "辦公室共用印表機今天一整個早上顯示離線，但印表機面板看起來開著沒有警示。重新整理印列清單仍無法送印。",
    whyItHappens:
      "印表機與電腦之間靠網路連接。若印表機 IP 變了、被改設定、或網路節點出問題，電腦就會找不到印表機而顯示離線。",
    commonSymptoms: [
      "電腦顯示印表機離線",
      "其他人也無法列印",
      "印表機面板正常但不收工作",
      "重啟印表機後短暫恢復",
    ],
    safeFirstChecks: [
      "確認印表機電源與網路線是否接好",
      "問同事是否其他人也無法列印",
      "保留錯誤訊息供資訊組判斷",
    ],
    doNotDo: [
      "不要重置印表機網路設定",
      "不要自己更改 IP 設定",
      "不要拔插印表機背後不熟悉的線",
    ],
    whenToEscalate:
      "若全室都無法列印超過十分鐘，請通報資訊組或印表機管理人員處理。",
    technicalNote:
      "Check printer IP/static assignment, ping reachability, check print queue, restart spooler. Common: DHCP changed printer IP, IP conflict, firmware lockup.",
    audienceVersions: [
      A("grade_1_3", "印表機要和電腦一直通訊才能印。如果中間斷了，電腦就會說印表機不在。請告訴老師。"),
      A("grade_4_6", "印表機透過網路收電腦的指令。如果網路斷了，就會顯示離線，請通知老師處理。"),
      A("grade_7_9", "印表機常用固定 IP。若 IP 衝突或被 DHCP 改變，電腦就找不到它。資訊組可以查 ARP 與 print server 設定。"),
      A("grade_10_12", "Networked printer 依賴穩定 IP 與 SNMP 監控。理解這類設備在 IT 管理上的常見故障點，有助於現場問題排查。"),
      A("teacher", "若辦公室印表機離線，請先確認電源與網路線，再通報資訊組，不要自行重置設定。"),
      A("it_staff", "Ping printer IP, check ARP, validate DHCP reservation. Restart print spooler on server. If firmware unresponsive, power cycle. Check for IP conflict (see ip-conflict-printer)."),
    ],
    symptomKeywords: ["印表機離線", "不能列印", "印表機找不到", "spooler"],
    relatedSlugs: ["ip-conflict-printer", "shared-folder-fail", "duplicate-print-job"],
    imagePrompt:
      "Vector illustration: a busy office printer with a friendly 'offline' label, a teacher looking at her laptop print queue confused. Calm office tone.",
  },
  {
    id: "t-16",
    slug: "shared-folder-fail",
    categorySlug: "printer-sharing",
    title: "共享資料夾無法存取：之前可以用，現在進不去",
    summary:
      "共享資料夾失效常見原因是檔案伺服器停機、權限被調整或網路節點異常。",
    scenario:
      "教師辦公室同事互相詢問為什麼共用資料夾今天突然打不開。資訊組查詢後發現校內檔案伺服器需要重啟。",
    whyItHappens:
      "共享資料夾要靠校內檔案伺服器提供。如果伺服器服務停了、權限改了或網路斷了，所有人都會打不開。",
    commonSymptoms: [
      "同一網域多人都打不開",
      "提示找不到伺服器或權限不足",
      "從筆電與桌機都失敗",
      "其他網路功能正常",
    ],
    safeFirstChecks: [
      "確認其他同事是否也打不開",
      "看一下校內公告是否有維護通知",
      "保留錯誤訊息畫面",
    ],
    doNotDo: [
      "不要重複輸入密碼超過幾次（避免帳號鎖定）",
      "不要嘗試自行對映新的網路磁碟",
      "不要建立私人雲端臨時繞道流通檔案（資安風險）",
    ],
    whenToEscalate:
      "若多人同時無法存取，請通報資訊組檢查檔案伺服器與權限。",
    technicalNote:
      "Check SMB service status on file server, event logs, share/NTFS permissions. Validate DNS for the server name. Check authentication service if AD-joined.",
    audienceVersions: [
      A("grade_1_3", "校園裡有一個大櫃子放大家的檔案。如果櫃子壞了或被鎖住，大家就拿不到自己的東西。"),
      A("grade_4_6", "共享資料夾放在學校的大電腦裡。如果那台電腦壞了，所有人都打不開。"),
      A("grade_7_9", "校內檔案伺服器提供共享資料夾服務。當服務停止或權限變更，所有依賴它的使用者都會受影響。"),
      A("grade_10_12", "File server、SMB 協定與 AD 權限三者共同決定共享資料夾可用性。理解這些元件互動，是日常 IT 維護的基本。"),
      A("teacher", "若同事們都打不開共享資料夾，請先暫停存取嘗試，通報資訊組統一處理。"),
      A("it_staff", "Check SMB service, share/NTFS permissions, DNS resolution. Review event log. If AD-related, validate domain controller health."),
    ],
    symptomKeywords: ["共享資料夾", "檔案伺服器", "權限", "SMB"],
    relatedSlugs: ["printer-offline", "vendor-responsibility", "malware-infection"],
    imagePrompt:
      "Vector illustration: a friendly icon of a network folder with a lock icon and several office staff looking at their laptops confused. Calm and clear.",
  },
  {
    id: "t-17",
    slug: "duplicate-print-job",
    categorySlug: "printer-sharing",
    title: "印表機卡列印工作：佇列塞住，誰都印不出來",
    summary:
      "若印列佇列卡住，後續所有人的工作都會停下來。常因為紙張卡住、上一份工作出錯或驅動異常。",
    scenario:
      "教師同事說一直按列印但什麼都沒出來。檢查印表機佇列發現第一個工作卡住超過一小時。",
    whyItHappens:
      "印表機按順序處理列印工作。若第一個工作出錯卻沒被清除，後面的工作只能排隊等待，整個佇列就停擺。",
    commonSymptoms: [
      "印表機沒有反應",
      "印列佇列顯示多筆等待中",
      "重新送印仍無作用",
      "其他人也說無法列印",
    ],
    safeFirstChecks: [
      "查看印表機螢幕是否有錯誤",
      "確認是否紙張卡住",
      "請最早送印的同事先暫停其工作",
    ],
    doNotDo: [
      "不要重複按列印（會更卡）",
      "不要嘗試清除別人的工作",
      "不要關閉印表機電源強制清空",
    ],
    whenToEscalate:
      "若佇列無法被釋放，請通報資訊組或印表機管理人員協助清除並重新啟動 spooler。",
    technicalNote:
      "Clear stuck job via print server queue, restart Print Spooler service. If recurring, check driver compatibility, paper sensor, or firmware update.",
    audienceVersions: [
      A("grade_1_3", "印表機要照順序印，前一份印不出來，後面就會等。請告訴老師處理。"),
      A("grade_4_6", "如果第一份列印工作卡住，後面的人也會印不出來。通常要老師清除排隊工作。"),
      A("grade_7_9", "Print queue 卡住通常是因為驅動或紙張問題。需要清除排隊工作並重啟 spooler 服務。"),
      A("grade_10_12", "Print spooler 是 Windows 處理列印的核心服務。瞭解服務重啟與佇列清除是日常 IT 維護動作之一。"),
      A("teacher", "若辦公室印不出來，請先看印表機面板是否有錯誤訊息，並通報資訊組或印表機管理人。"),
      A("it_staff", "Stop Print Spooler, clear %SystemRoot%\\System32\\spool\\PRINTERS, restart service. Investigate persistent driver/firmware issues."),
    ],
    symptomKeywords: ["印不出來", "印列佇列卡", "spooler", "紙張卡住"],
    relatedSlugs: ["printer-offline", "ip-conflict-printer", "shared-folder-fail"],
    imagePrompt:
      "Vector illustration: a printer with stacked paper waiting icons floating above it, an office worker checking with calm expression.",
  },

  // ===== security-traffic =====
  {
    id: "t-18",
    slug: "malware-infection",
    categorySlug: "security-traffic",
    title: "校內電腦惡意程式感染：怪流量四處亂跑",
    summary:
      "若校內電腦被感染惡意程式，可能會在背景發送掃描或竊取資料的封包，拖慢網路並引發資安風險。",
    scenario:
      "資訊組偵測到某段網路出現大量對外連線嘗試，追查發現是電腦教室的一台機器被感染惡意程式。",
    whyItHappens:
      "惡意程式常在背景偷偷活動，例如掃描內網、發送大量資料、加密檔案。表面上看似正常，但網路會出現奇怪的流量模式。",
    commonSymptoms: [
      "電腦變慢但看不出原因",
      "網管出現大量對外連線警示",
      "瀏覽器自動跳轉怪網站",
      "檔案突然被加密或重新命名",
    ],
    safeFirstChecks: [
      "保留錯誤畫面與時間紀錄",
      "斷網但不要關機（保留證據）",
      "通知資訊組老師處理",
    ],
    doNotDo: [
      "不要重新安裝程式試圖修復",
      "不要把 USB 接到其他電腦",
      "不要付款給勒索訊息",
    ],
    whenToEscalate:
      "若懷疑電腦被感染，請立刻斷網並通報資訊組，避免擴散。",
    technicalNote:
      "Isolate machine from network (not power off — preserve volatile evidence). Run AV scan, check logs. If ransomware, do not pay; consult incident response plan.",
    audienceVersions: [
      A("grade_1_3", "電腦有時會生病，會偷偷做壞事。發現怪怪的，請告訴老師，不要自己亂點。"),
      A("grade_4_6", "如果電腦被惡意程式感染，會偷偷做事，造成網路變慢或資料外流。記得不要亂點不認識的連結。"),
      A("grade_7_9", "惡意程式包含病毒、勒索軟體、間諜程式。它們會在背景活動，可能造成資料外洩或被加密。"),
      A("grade_10_12", "Malware 行為通常包含 C2 連線、橫向移動、資料外洩。理解這些模式有助於培養基本的數位安全意識。"),
      A("teacher", "若懷疑教室電腦中毒，請先停止學生操作，斷網但不關機，立即通報資訊組。"),
      A("it_staff", "Isolate host (port shut or VLAN quarantine), preserve memory/logs, run AV. Follow IR runbook. For ransomware, do not pay; restore from clean backup."),
    ],
    symptomKeywords: ["惡意程式", "勒索軟體", "電腦中毒", "怪流量"],
    relatedSlugs: ["abnormal-broadcast", "phishing-link", "l3-switch-attack"],
    imagePrompt:
      "Vector illustration: a school computer with subtle warning icons in the background and an IT teacher carefully unplugging the network cable. Calm, safety-focused.",
  },
  {
    id: "t-19",
    slug: "l3-switch-attack",
    categorySlug: "security-traffic",
    title: "L3 交換器異常或攻擊：核心設備突然忙不過來",
    summary:
      "若核心 L3 交換器遭異常流量攻擊或內部故障，校內整體繞送會變慢或部分服務無法到達。",
    scenario:
      "中午過後校內各教室都反應內網系統很慢，資訊組查看 L3 交換器 CPU 使用率異常飆高，伴隨大量 ARP 請求。",
    whyItHappens:
      "L3 交換器負責校園網路間的轉接。當它被異常流量（如 ARP 攻擊、廣播風暴）或內部故障影響 CPU 過高時，整體網路會變慢甚至部分服務失效。",
    commonSymptoms: [
      "整校內網變慢",
      "登入校內系統需要等很久",
      "資訊組設備警示異常",
      "對外連線正常但內網系統慢",
    ],
    safeFirstChecks: [
      "確認影響範圍與時段",
      "停止網路相關活動",
      "保留錯誤畫面與時間",
    ],
    doNotDo: [
      "不要重啟自己教室設備想解決",
      "不要重複登入校內系統",
      "不要嘗試掃描內網",
    ],
    whenToEscalate:
      "若資訊組已在排查，請配合公告並保持冷靜。L3 設備異常通常需要由資訊組與廠商共同處理。",
    technicalNote:
      "Check L3 switch CPU, ARP table size, control plane policing. Look for ARP scanning, large MAC tables, or rogue device. Apply CoPP, storm-control, DAI if needed.",
    audienceVersions: [
      A("grade_1_3", "學校網路有一個總指揮，如果它太忙，全校的網路就會變慢。等資訊組老師處理就好。"),
      A("grade_4_6", "校園網路中有個重要的轉接設備，如果它被怪怪的流量塞滿，全校都會變慢。"),
      A("grade_7_9", "L3 交換器負責不同 VLAN 之間的繞送。當其 CPU 被異常封包打滿，內部服務都會變慢。"),
      A("grade_10_12", "控制平面攻擊（如 ARP 風暴）會影響核心設備的可用性。理解 CoPP、DAI、storm-control 是企業網路防禦的基礎概念。"),
      A("teacher", "若全校內網系統都很慢，請保持冷靜，等資訊組統一處理，不要重複登入造成更大負擔。"),
      A("it_staff", "Inspect control-plane CPU, ARP table, syslog. Apply DAI/CoPP/storm-control. If ARP scan detected, locate source MAC and isolate."),
    ],
    symptomKeywords: ["L3 交換器", "內網慢", "ARP 攻擊", "CPU 高"],
    relatedSlugs: ["broadcast-storm", "abnormal-broadcast", "malware-infection"],
    imagePrompt:
      "Vector illustration: a core L3 switch in a server rack with high CPU graph overlay, IT staff observing with calm focus. Professional tone.",
  },
  {
    id: "t-20",
    slug: "phishing-link",
    categorySlug: "security-traffic",
    title: "釣魚連結與社交工程：點一下就出事",
    summary:
      "看似正常的連結或郵件可能是釣魚陷阱，誘導使用者輸入帳密或下載惡意檔案。",
    scenario:
      "教師收到一封看似教育部的郵件，連結要求點擊登入。實際網址卻是奇怪的網域，輸入帳密後資訊組通知該帳號被異常使用。",
    whyItHappens:
      "釣魚連結利用視覺相似的網域、急迫的訊息或熟悉的署名，誘騙使用者點擊與輸入機密資料。",
    commonSymptoms: [
      "郵件中網址與真實網域不一致",
      "要求輸入帳密或下載檔案",
      "語氣急迫或威脅",
      "收件後不久帳號出現異常",
    ],
    safeFirstChecks: [
      "滑鼠移到連結上看真實網址",
      "向資訊組或寄件者另行確認",
      "若已點擊，立即更改密碼並通報",
    ],
    doNotDo: [
      "不要在可疑頁面輸入帳密",
      "不要下載不明附件或執行不明檔案",
      "不要把驗證碼或密碼分享給他人",
    ],
    whenToEscalate:
      "若已輸入帳密、下載檔案或察覺異常，請立刻通報資訊組，並更改相關密碼。",
    technicalNote:
      "Phishing — hover to inspect URL, validate sender, check SPF/DKIM/DMARC. If credentials exposed, rotate password and enable MFA. Inspect mailbox rules for malicious forwarding.",
    audienceVersions: [
      A("grade_1_3", "看到陌生人傳的連結，先告訴大人再決定要不要打開。"),
      A("grade_4_6", "假冒的網站會做得很像真的，但網址會不一樣。先看清楚再輸入帳號密碼。"),
      A("grade_7_9", "釣魚網站常會模仿熟悉的服務。輸入密碼前，請先檢查網址是否正確，並開啟兩步驟驗證。"),
      A("grade_10_12", "社交工程攻擊利用人性弱點。理解網址結構、SPF/DKIM、MFA 等概念，是基本數位生活素養。"),
      A("teacher", "若收到可疑郵件，請不要急著點，先轉寄給資訊組或另行確認。已點擊請立即更改密碼。"),
      A("it_staff", "Validate SPF/DKIM/DMARC. If credentials compromised, force password reset, check inbox forwarding rules, audit recent logins. Add domain to block lists."),
    ],
    symptomKeywords: ["釣魚連結", "假網站", "假郵件", "社交工程"],
    relatedSlugs: ["malware-infection", "wifi-wrong-network", "vendor-responsibility"],
    imagePrompt:
      "Vector illustration: an email envelope with a fake-looking link and a fish hook icon, teacher hovering cursor over the link to inspect. Calm awareness tone.",
  },

  // ===== device-location =====
  {
    id: "t-21",
    slug: "find-ip-device",
    categorySlug: "device-location",
    title: "找出特定 IP 是哪台設備：地址有，但不知道在哪",
    summary:
      "知道某個 IP 出現異常，但要找到對應的實體設備與位置，常需要查 ARP、MAC 與交換器埠資訊。",
    scenario:
      "資訊組偵測到某個 IP 在發送異常封包，需要找出實體位置。對應 MAC 後追到三樓某交換器某埠號。",
    whyItHappens:
      "校內設備透過 IP 與 MAC 通訊。要找到實體位置，需要 ARP 把 IP 對到 MAC，再把 MAC 對到交換器埠，最後對到實際教室或牆面孔位。",
    commonSymptoms: [
      "偵測到某個 IP 行為異常",
      "無法直接看出設備位置",
      "對應的設備可能是教室裡的桌機或一些網路印表機",
      "需要按圖索驥追到牆面孔位",
    ],
    safeFirstChecks: [
      "詢問該位置教室是否有相關設備",
      "確認是否與最近新增設備有關",
      "通報資訊組由資訊組查 ARP 與 MAC",
    ],
    doNotDo: [
      "不要自行拔教室任何設備",
      "不要重置可疑設備（會丟失證據）",
      "不要私自連入嘗試遠端登入",
    ],
    whenToEscalate:
      "若該設備行為異常或疑似資安事件，請通報資訊組依資安事件處理流程處置。",
    technicalNote:
      "Workflow: ARP (IP→MAC) → MAC address table on access switch (MAC→port) → patch panel mapping (port→room/jack). Maintain accurate documentation for fast tracing.",
    audienceVersions: [
      A("grade_1_3", "知道某個座號出問題，要找到坐在這個位置的人，需要從不同的紀錄一層一層查。"),
      A("grade_4_6", "校園網路有 IP 也有 MAC，就像座號和學號。資訊組會用這些資訊找到實際的設備在哪。"),
      A("grade_7_9", "找出 IP 對應設備位置：IP→MAC→交換器埠→教室孔位。需要 ARP、MAC table 與點位文件配合。"),
      A("grade_10_12", "資產定位是 IT 維運的基本能力。健全的線路與點位文件，能大幅縮短資安事件回應時間。"),
      A("teacher", "若資訊組詢問教室是否有新增設備或異常物品，請協助確認，幫助快速定位。"),
      A("it_staff", "ARP cache + MAC table + patch panel records. Automate with tools like Netdisco, PRTG, or scripts pulling SNMP MAC tables across switches."),
    ],
    symptomKeywords: ["找 IP", "查設備位置", "ARP", "MAC table"],
    relatedSlugs: ["line-tracing", "unlabeled-network-port", "rogue-dhcp"],
    imagePrompt:
      "Vector illustration: IT staff with a tablet tracing an IP to a physical wall jack in a classroom, layered diagram from IP to room. Clean diagrammatic.",
  },
  {
    id: "t-22",
    slug: "line-tracing",
    categorySlug: "device-location",
    title: "教室線路追蹤困難：到底這條線通到哪？",
    summary:
      "校園線路常因多次擴建、廠商不同而紊亂。追蹤一條線常需要文件、標籤與測線設備配合。",
    scenario:
      "新學年資訊組要重新配置教室網路，但部分牆面孔位沒有標示，需要逐一找出對應到機房的哪個面板與哪個埠。",
    whyItHappens:
      "校園網路常隨年代擴建。如果缺乏統一的標籤與文件，廠商換過幾次後，線路就會變得難以追蹤。",
    commonSymptoms: [
      "牆面孔位沒有標籤",
      "機房面板與教室對應不清",
      "新校長或新資訊組接手後資訊斷層",
      "廠商換手後文件遺失",
    ],
    safeFirstChecks: [
      "查找既有點位文件或圖面",
      "詢問前任資訊組或廠商",
      "保留現場資訊不要動工",
    ],
    doNotDo: [
      "不要自行剪線重接",
      "不要拔線測試（會中斷他人）",
      "不要替孔位重新編號（會打亂既有紀錄）",
    ],
    whenToEscalate:
      "若需要進行大規模整理，請通報資訊組規劃，必要時聯絡專業弱電廠商。",
    technicalNote:
      "Use cable toner, label patch panel and wall plates, build a port mapping spreadsheet. Plan periodic audits. Consider intelligent patch panel for larger campuses.",
    audienceVersions: [
      A("grade_1_3", "牆上的網路孔像水管，要知道每根水管接到哪裡。沒有標好就會找不到。"),
      A("grade_4_6", "學校網路線在牆裡跑來跑去。沒有貼好標籤就會像迷宮一樣難找。"),
      A("grade_7_9", "線路追蹤需要測線器、標籤與文件配合。沒有完整紀錄會大幅增加維運成本。"),
      A("grade_10_12", "結構化佈線與點位文件是 IT 基礎建設的核心資產。良好的文件比硬體本身更難重建。"),
      A("teacher", "如果教室牆面孔位沒有標示，請通報資訊組，協助慢慢補上完整文件。"),
      A("it_staff", "Use tone generator and probe, label both ends with consistent scheme (Building-Floor-Room-Jack). Maintain spreadsheet or DCIM. Schedule annual audit."),
    ],
    symptomKeywords: ["查線困難", "線路追蹤", "點位文件", "牆面孔位"],
    relatedSlugs: ["unlabeled-network-port", "find-ip-device", "vendor-responsibility"],
    imagePrompt:
      "Vector illustration: IT staff in a server room using a cable toner to trace a line from patch panel into a classroom wall, labels being added neatly.",
  },
  {
    id: "t-23",
    slug: "unlabeled-network-port",
    categorySlug: "device-location",
    title: "教室網路點位未標示：插哪個孔才對？",
    summary:
      "教室牆面網路孔若沒有清楚標示，使用者插錯孔可能導致連線失敗或接到非預期的網路。",
    scenario:
      "新進老師到教室發現有四個網路孔，但沒有標示哪個給電腦、哪個給投影設備，插了第一個孔後反而無法連線。",
    whyItHappens:
      "教室孔位常會對應不同用途（教學、行政、印表機、電話）。如果沒有清楚標示，使用者很容易插錯，造成混亂。",
    commonSymptoms: [
      "插了某孔後無法連線",
      "不同孔接出的網路功能不同",
      "新進同事不知道用哪個孔",
      "孔位顏色與標籤不一致",
    ],
    safeFirstChecks: [
      "尋找牆面標籤或附近說明",
      "問同事這個孔位的用途",
      "通報資訊組統一標示",
    ],
    doNotDo: [
      "不要隨意更動牆面標籤",
      "不要把網路印表機接到不確定用途的孔位",
      "不要拔他人正在使用的線",
    ],
    whenToEscalate:
      "若教室孔位混亂，請建議資訊組規劃一次性整理與標示。",
    technicalNote:
      "Standardise labelling scheme (e.g., RM-201-J1), use colored faceplates per VLAN purpose, document in port map. Onboarding doc for new teachers helps reduce confusion.",
    audienceVersions: [
      A("grade_1_3", "牆上的網路孔每個用途不一樣，要看清楚標籤才不會接錯。"),
      A("grade_4_6", "教室有不同網路孔，給不同設備用。沒貼標籤就要請老師教。"),
      A("grade_7_9", "點位標示對應不同 VLAN 用途。良好的標示能避免接錯造成連線失敗。"),
      A("grade_10_12", "結構化點位設計搭配清楚標示，是企業與校園網路基礎管理的基本。"),
      A("teacher", "若教室孔位太多沒有標示，請通報資訊組統一整理，並建立給新同事的指引。"),
      A("it_staff", "Standard label scheme + colored faceplates. Build a per-room cheat sheet. Update onboarding documentation."),
    ],
    symptomKeywords: ["孔位沒標", "插錯網路孔", "教室孔位", "VLAN"],
    relatedSlugs: ["line-tracing", "find-ip-device", "wifi-wrong-network"],
    imagePrompt:
      "Vector illustration: a classroom wall with four ethernet wall jacks, only one labeled, a teacher choosing carefully. Clear and friendly.",
  },
  {
    id: "t-24",
    slug: "vendor-responsibility",
    categorySlug: "device-location",
    title: "不清楚廠商歸屬：到底要找誰？",
    summary:
      "校園網路常由多家廠商分工。當問題發生時，若責任歸屬不清，會延誤處理時間。",
    scenario:
      "校長詢問為什麼網路問題已經兩天沒解決。資訊組發現是骨幹線材問題，但廠商之間互推責任，未及時行動。",
    whyItHappens:
      "校園網路常涉及電信、結構化佈線、無線、伺服器、防火牆等多家廠商。若沒有清楚的合約範圍與聯絡窗口，問題發生時就會出現責任不清的灰色地帶。",
    commonSymptoms: [
      "故障處理時間過長",
      "廠商之間互推責任",
      "找不到合約對應窗口",
      "校方沒有單一回報入口",
    ],
    safeFirstChecks: [
      "確認既有合約與責任範圍文件",
      "整理故障時間與影響範圍",
      "由資訊組統一聯絡相關廠商",
    ],
    doNotDo: [
      "不要由不同人各自聯絡同一廠商",
      "不要在無紀錄情況下口頭調整合約範圍",
      "不要私下答應廠商先付款再處理",
    ],
    whenToEscalate:
      "若責任歸屬不清且影響擴大，請通報行政與資訊組層級主管，依合約程序處理。",
    technicalNote:
      "Maintain a vendor matrix: scope, SLA, contact, contract reference. Single point of contact (資訊組) coordinates. Document incidents and SLA performance.",
    audienceVersions: [
      A("grade_1_3", "學校網路有很多人一起照顧。如果壞了，老師會幫忙找對的人。"),
      A("grade_4_6", "校園網路是很多公司一起合作維護的。如果有問題，要找到正確的人才能修。"),
      A("grade_7_9", "校園網路涉及多家廠商，合約與責任清楚的紀錄能加速故障處理。"),
      A("grade_10_12", "服務水準協議（SLA）與責任歸屬，是大型 IT 系統穩定運作的關鍵管理元素。"),
      A("teacher", "若教室問題遲未處理，請通報資訊組由其統一聯絡廠商，避免多頭聯繫。"),
      A("it_staff", "Maintain vendor matrix with contact, scope, SLA. Open incident ticket as single source of truth. Track SLA breaches; review at quarterly vendor meetings."),
    ],
    symptomKeywords: ["廠商歸屬", "處理太慢", "合約不清", "SLA"],
    relatedSlugs: ["external-line-down", "external-switch-failure", "fiber-abnormal"],
    imagePrompt:
      "Vector illustration: a school administrator at a desk with a folder labeled 'Vendor Contacts', several company logos as cards, calm coordination tone.",
  },
];

export const QR_LANDINGS: QrLanding[] = [
  {
    id: "rm-201",
    locationName: "201 教室",
    locationType: "classroom",
    commonIssues: [
      "整班連不上網或速度突然變慢",
      "共用印表機顯示離線",
      "Wi-Fi 訊號弱或時通時斷",
    ],
    topicSlugs: ["ip-conflict-printer", "ap-overload", "printer-offline", "wifi-weak-signal"],
    reportNote:
      "若簡單檢查仍無法恢復，請通知資訊組老師到場處理。請勿自行更改 IP 設定或拔插機房設備。",
  },
  {
    id: "office-admin",
    locationName: "行政辦公室",
    locationType: "admin",
    commonIssues: [
      "共享資料夾突然無法開啟",
      "可疑郵件或釣魚連結",
      "電腦變慢、異常彈窗",
    ],
    topicSlugs: ["shared-folder-fail", "phishing-link", "malware-infection", "vendor-responsibility"],
    reportNote:
      "懷疑電腦中毒時請先斷網但不關機，並通報資訊組處理。涉及廠商歸屬問題請走資訊組統一聯絡窗口。",
  },
  {
    id: "printer-2f",
    locationName: "二樓共用印表機",
    locationType: "printer",
    commonIssues: [
      "印表機顯示離線、無法列印",
      "印列工作排隊塞住",
      "共享資料夾連帶無法存取",
    ],
    topicSlugs: ["printer-offline", "duplicate-print-job", "ip-conflict-printer", "shared-folder-fail"],
    reportNote:
      "若全室同事都無法列印超過十分鐘，請通報資訊組或印表機管理人員，不要自行重置印表機設定。",
  },
  {
    id: "wifi-library",
    locationName: "圖書館 Wi-Fi 區",
    locationType: "wifi",
    commonIssues: [
      "下課時段 Wi-Fi 突然變慢",
      "訊號滿格但網速很慢",
      "登入校內系統失敗",
    ],
    topicSlugs: ["ap-overload", "wifi-weak-signal", "wifi-wrong-network", "heavy-traffic-pc"],
    reportNote:
      "若特定時段反覆出現大量壅塞，建議資訊組評估增設 AP 或調整網路規劃。",
  },
  {
    id: "it-office",
    locationName: "資訊組辦公室",
    locationType: "admin",
    commonIssues: [
      "需要追蹤某個 IP 對應的實體設備",
      "教室線路追蹤與點位整理",
      "未標示孔位整理",
    ],
    topicSlugs: ["find-ip-device", "line-tracing", "unlabeled-network-port", "vendor-responsibility"],
    reportNote:
      "資訊組相關設備與資料夾請依現行管理辦法處理；新進同事可由此頁面快速了解日常工作項目。",
  },
];
