class Pendaftar {
    constructor(nama, umur, uangSangu) {
      this.nama = nama;
      this.umur = umur;
      this.uangSangu = uangSangu;
    }
  }
  
  class Registrasi {
    constructor() {
      this.pendaftarList = [];
    }
  
    tambahPendaftar(nama, umur, uangSangu) {
      const pendaftar = new Pendaftar(nama, umur, uangSangu);
      this.pendaftarList.push(pendaftar);
    }
  }
  
  class TabelPendaftar {
    constructor() {
      this.tabel = document.getElementById("pendaftar-table");
      this.tbody = this.tabel.querySelector("tbody");
    }
  
    tambahPendaftar(pendaftar) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${this.tbody.childElementCount + 1}</td>
        <td>${pendaftar.nama}</td>
        <td>${pendaftar.umur}</td>
        <td>${pendaftar.uangSangu}</td>
      `;
      this.tbody.appendChild(row);
    }
  
    tampilkanResume() {
        const uangSanguRataRata = this.hitungRataRataUangSangu().toLocaleString("id-ID");
        const umurRataRata = this.hitungRataRataUmur().toLocaleString("id-ID");
        const resumeText = document.getElementById("resume-text");
        resumeText.textContent = `Rata-rata pendaftar memiliki uang sangu sebesar ${uangSanguRataRata} dengan rata-rata umur ${umurRataRata}`;
      }
      
  
    hitungRataRataUangSangu() {
      const pendaftarCount = this.tbody.childElementCount;
      let totalUangSangu = 0;
  
      for (let i = 0; i < pendaftarCount; i++) {
        const uangSangu = parseFloat(this.tbody.children[i].querySelector("td:nth-child(4)").textContent);
        totalUangSangu += uangSangu;
      }
  
      const rataRataUangSangu = totalUangSangu / pendaftarCount;
      return rataRataUangSangu.toFixed(0);
    }
  
    hitungRataRataUmur() {
      const pendaftarCount = this.tbody.childElementCount;
      let totalUmur = 0;
  
      for (let i = 0; i < pendaftarCount; i++) {
        const umur = parseInt(this.tbody.children[i].querySelector("td:nth-child(3)").textContent);
        totalUmur += umur;
      }
  
      const rataRataUmur = totalUmur / pendaftarCount;
      return rataRataUmur.toFixed(0);
    }
  }
  
  document.getElementById("registrasi-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const namaInput = document.getElementById("nama");
    const umurInput = document.getElementById("umur");
    const uangSanguInput = document.getElementById("uang_sangu");
  
    const nama = namaInput.value.trim();
    const umur = parseInt(umurInput.value);
    const uangSangu = parseInt(uangSanguInput.value);
  
    if (nama.length < 10 ) {
      alert("Nama Anda Meragukan! Mohon periksa kembali isian Anda.");
      return;
    }
    if (umur < 25 ) {
        alert("Umur Anda Tidak Memenuhi Syarat.");
        return;
    }
    if (uangSangu < 100000 || uangSangu > 1000000) {
        alert("Uang Saku tidak sesuai dengan ketentuan.");
        return;
    }
    
  
    registrasi.tambahPendaftar(nama, umur, uangSangu);
    tabelPendaftar.tambahPendaftar(registrasi.pendaftarList[registrasi.pendaftarList.length - 1]);
  
    namaInput.value = "";
    umurInput.value = "";
    uangSanguInput.value = "";
  
    tabelPendaftar.tampilkanResume();
    animateResume();
    // Menampilkan modal submit berhasil
      // Show the submit modal
    $('#submit-modal').modal('show');
});
    // Hide the submit modal on OK button click
    $('#submit-modal .btn-primary').click(function () {
    $('#submit-modal').modal('hide');
});

  
  function animateResume() {
    const resumeText = document.getElementById("resume-text");
    resumeText.style.opacity = "10";
  }
  
  const registrasi = new Registrasi();
  const tabelPendaftar = new TabelPendaftar();
  
  document.getElementById("list-pendaftar-tab").addEventListener("click", function () {
    tampilkanListPendaftar();
  });
  
  function tampilkanListPendaftar() {
    const tbody = document.querySelector("#pendaftar-table tbody");
    tbody.innerHTML = "";
  
    for (let i = 0; i < registrasi.pendaftarList.length; i++) {
      const pendaftar = registrasi.pendaftarList[i];
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${pendaftar.nama}</td>
        <td>${pendaftar.umur}</td>
        <td>${pendaftar.uangSangu}</td>
      `;
      tbody.appendChild(row);
    }
  
    tabelPendaftar.tampilkanResume();
  }
  
  window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("list-pendaftar-tab").click();
  });
  