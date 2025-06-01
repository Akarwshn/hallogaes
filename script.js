// Supabase setup - ganti dengan URL dan API Key kamu
const supabase = window.supabase.createClient(
  "https://YOUR_SUPABASE_URL.supabase.co",
  "YOUR_SUPABASE_PUBLIC_API_KEY"
);

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
      p.textContent = `${wish.nama}: "${wish.ucapan}"`;
      list.appendChild(p);
    });
  }
}

loadWishes();

<script>
  const audio = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("toggleMusic");

  toggleBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(e => console.log(e));
      toggleBtn.textContent = "Matikan Musik 🎶";
    } else {
      audio.pause();
      toggleBtn.textContent = "Putar Musik 🎵";
    }
  });
</script>
