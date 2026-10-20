import "./style.css";

const MAIN = "لا تنسى ذكر الله.. سبحان الله وبحمده، سبحان الله العظيم";

const morning = [
  { t: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير", n: 1 },
  { t: "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي، فإنه لا يغفر الذنوب إلا أنت", n: 1, note: "سيد الاستغفار" },
  { t: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم", n: 3 },
  { t: "رضيت بالله ربا، وبالإسلام دينا، وبمحمد صلى الله عليه وسلم نبيا", n: 3 },
  { t: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير", n: 10 },
  { t: "سبحان الله وبحمده", n: 100 },
];
const evening = [
  { t: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير", n: 1 },
  { t: "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي، فإنه لا يغفر الذنوب إلا أنت", n: 1, note: "سيد الاستغفار" },
  { t: "أعوذ بكلمات الله التامات من شر ما خلق", n: 3 },
  { t: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم", n: 3 },
  { t: "رضيت بالله ربا، وبالإسلام دينا، وبمحمد صلى الله عليه وسلم نبيا", n: 3 },
  { t: "سبحان الله وبحمده", n: 100 },
];

const list = document.querySelector("[data-list]");
function render(items) {
  list.innerHTML = "";
  items.forEach((it) => {
    let left = it.n;
    const card = document.createElement("button");
    card.className = "w-full text-right rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:ring-brand/30 active:scale-[.99]";
    card.innerHTML = `${it.note ? `<p class="mb-2 text-xs font-bold text-gold">${it.note}</p>` : ""}
      <p class="dhikr text-xl text-slate-800">${it.t}</p>
      <div class="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>اضغط للعد</span>
        <span class="count-pill rounded-full bg-brand/10 px-4 py-1 font-bold text-brand" data-c>${left}</span>
      </div>`;
    card.addEventListener("click", () => {
      if (left === 0) return;
      left--;
      card.querySelector("[data-c]").textContent = left === 0 ? "تم ✓" : left;
      if (left === 0) card.classList.add("done");
      navigator.vibrate?.(15);
    });
    list.appendChild(card);
  });
}
const tabs = document.querySelectorAll("[data-tab]");
tabs.forEach((b) => b.addEventListener("click", () => {
  tabs.forEach((x) => x.classList.remove("bg-brand", "text-white"));
  b.classList.add("bg-brand", "text-white");
  render(b.dataset.tab === "m" ? morning : evening);
}));
const h = new Date().getHours();
(h >= 15 || h < 3 ? tabs[1] : tabs[0]).click();

// tasbeeh
const phrases = ["سبحان الله وبحمده", "سبحان الله العظيم", "الحمد لله", "لا إله إلا الله", "الله أكبر", "أستغفر الله", "اللهم صل وسلم على نبينا محمد"];
const sel = document.querySelector("[data-phrase]");
phrases.forEach((p) => sel.add(new Option(p, p)));
const num = document.querySelector("[data-num]");
const total = document.querySelector("[data-total]");
let count = 0;
let all = Number(localStorage.getItem("tasbeeh-total") || 0);
total.textContent = all.toLocaleString("ar-SA");
document.querySelector("[data-tap]").addEventListener("click", () => {
  count++; all++;
  localStorage.setItem("tasbeeh-total", all);
  num.textContent = count.toLocaleString("ar-SA");
  total.textContent = all.toLocaleString("ar-SA");
  navigator.vibrate?.(count % 33 === 0 ? 120 : 10);
});
document.querySelector("[data-reset]").addEventListener("click", () => { count = 0; num.textContent = "٠"; });
sel.addEventListener("change", () => { count = 0; num.textContent = "٠"; });

// share
const url = location.href.split("#")[0];
const msg = `${MAIN}\n\nأذكار الصباح والمساء والمسبحة:\n${url}`;
document.querySelectorAll("[data-wa]").forEach((a) => (a.href = "https://wa.me/?text=" + encodeURIComponent(msg)));
document.querySelector("[data-copy]").addEventListener("click", async (e) => {
  await navigator.clipboard?.writeText(msg);
  e.currentTarget.textContent = "تم النسخ ✓";
});

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
