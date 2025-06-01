// Supabase Setup (isi dengan URL & API Key kamu)
const supabase = window.supabase.createClient(
  'https://YOUR_SUPABASE_URL.supabase.co',
  'YOUR_SUPABASE_PUBLIC_API_KEY'
);

// Form Ucapan
document.getElementById("wish-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nama = document.getElementById("name").value;
  const ucapan = document.getElementById("message").value;

  const { error } = await supabase.from("wishes").insert([{ nama, ucapan }]);
  if (!error) {
    alert("Ucapan berhasil dikirim!");
    document.getElementById("wish-form").reset();
    loadWishes();
  } else {
    alert("Gagal menyimpan ucapan.");
    console.error(error);
  }
});

async function loadWishes() {
  const { data, error } = await supabase.from("wishes").select("*").order("id", { ascending: false });
  const list = document.getElementById("wish-list");
  list.innerHTML = "";
  if (data) {
    data.forEach((wish) => {
      const p = document.createElement("p");
      p.textContent = `${wish.nama}: ${wish.ucapan}`;
      list.appendChild(p);
    });
  }
}

loadWishes();

// Floating Hearts Animation
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 24) + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 500);
<script>
  const audio = document.querySelector("audio");
  const playBtn = document.getElementById("playMusic");

  playBtn.addEventListener("click", () => {
    audio.play();
    playBtn.style.display = "none"; // Sembunyikan tombol setelah diklik
  });
</script>
