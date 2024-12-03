const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");
menuBtn.onclick = ()=>{
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}
cancelBtn.onclick = ()=>{
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  searchBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  form.classList.remove("active");
  cancelBtn.style.color = "#ff3d00";
}
searchBtn.onclick = ()=>{
  form.classList.add("active");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}

document.getElementById('commentForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Menghindari pengiriman form yang memuat ulang halaman
  
  // Ambil nilai dari textarea
  const commentText = document.getElementById('commentInput').value;
  
  if (commentText.trim() !== '') {
    const commentList = document.getElementById('commentList');
    
    // Ambil informasi nama pengguna dan tanggal
    const userName = 'User'; // Bisa diganti dengan input pengguna jika ada login
    const currentDate = new Date().toLocaleString(); // Format tanggal
    
    // Buat elemen list baru untuk komentar
    const commentItem = document.createElement('li');
    
    // Isi elemen list dengan komentar dan informasi pengguna
    commentItem.innerHTML = `
      <p>${commentText}</p>
      <div class="comment-meta">
        <strong>${userName}</strong> - ${currentDate}
      </div>
      <button class="reply-button" onclick="replyToComment(this, null)">Balas</button>
      <ul class="replies"></ul> <!-- Daftar untuk balasan -->
    `;
    
    // Tambahkan elemen komentar ke dalam daftar komentar
    commentList.appendChild(commentItem);
    
    // Kosongkan textarea setelah komentar dikirim
    document.getElementById('commentInput').value = '';
  }
});

// Fungsi untuk menangani balasan komentar
function replyToComment(button, parentComment) {
  const replyText = prompt('Tulis balasan Anda:');
  if (replyText) {
    const replyItem = document.createElement('li');
    replyItem.style.marginLeft = '20px'; // Memberikan indentasi pada balasan
    replyItem.innerHTML = `
      <p>${replyText}</p>
      <div class="comment-meta">
        <strong>Anda</strong> - ${new Date().toLocaleString()}
      </div>
    `;
    
    // Jika ada komentar induk (balasan terhadap balasan), tambahkan balasan ke dalamnya
    if (parentComment) {
      const repliesList = parentComment.querySelector('.replies');
      repliesList.appendChild(replyItem);
    } else {
      // Jika bukan balasan terhadap balasan (komentar utama), tambahkan langsung ke daftar balasan
      const repliesList = button.parentElement.querySelector('.replies');
      repliesList.appendChild(replyItem);
    }
  }
}

