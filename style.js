// document.addEventListener('DOMContentLoaded', () => {

//   document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
//     link.addEventListener('click', function(event) {
//       // Mencegah perubahan langsung pada URL dan menunggu sampai halaman berpindah
//       event.preventDefault();

//       // Hapus kelas active dari elemen lain
//       document.querySelector('.navbar-nav .nav-link.active')?.classList.remove('active');
//       this.classList.add('active');

//       // Scroll ke target dan hapus hash setelah navigasi
//       const targetId = this.getAttribute('href').substring(1);
//       const targetElement = document.getElementById(targetId);

//       if (targetElement) {
//         targetElement.scrollIntoView({ behavior: "smooth" });
//       }

//       // Menghapus hash dari URL setelah sedikit penundaan
//       setTimeout(() => {
//         removeHash();
//       }, 300); // waktu 300 ms untuk memberi kesempatan halaman scroll
//     });
//   });

//   // Kode lainnya tetap sama
//   const buttons = document.querySelectorAll('.custom-button');

//   buttons.forEach(button => {
//     const text = button.querySelector('.custom-text'); 
//     button.addEventListener('mouseover', () => {
//       text.classList.add('animate__animated', 'animate__fadeIn');
//     });
//     button.addEventListener('mouseout', () => {
//       text.classList.remove('animate__animated', 'animate__fadeIn');
//     });
//   });
// });


document.addEventListener('DOMContentLoaded', () => {
  const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section');

  // Fungsi untuk meng-update active link berdasarkan posisi scroll
  const updateActiveLinkOnScroll = () => {
    let index = sections.length;

    // Loop melalui setiap section untuk mendapatkan posisi scroll
    while (--index && window.scrollY + 150 < sections[index].offsetTop) { }

    // Hapus kelas 'active' dari semua link dan tambahkan ke link yang sesuai dengan section
    navbarLinks.forEach((link) => link.classList.remove('active'));
    navbarLinks[index]?.classList.add('active');
  };

  // Jalankan fungsi saat halaman di-scroll
  window.addEventListener('scroll', updateActiveLinkOnScroll);

  // Tambahkan juga event click pada navbar agar tetap aktif saat di-click
  navbarLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      document.querySelector('.navbar-nav .nav-link.active')?.classList.remove('active');
      this.classList.add('active');

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(() => {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }, 300);
    });
  });

  // document.querySelectorAll('img[data-bs-toggle="modal"]').forEach((img) => {
  //   img.addEventListener('click', function () {
  //     const modalImage = document.getElementById('modalImage');
  //     modalImage.src = this.src;
  //     modalImage.alt = this.alt;

  //     // Debugging untuk memastikan src benar
  //     console.log("Modal src set to:", modalImage.src);
  //   });
  // });

  const animatedSections = document.querySelectorAll('.main-content');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeIn');
          observer.unobserve(entry.target); // Hentikan pengamatan agar animasi hanya terjadi sekali
        }
      });
    },
    { threshold: 0.2 } // Section mulai dianimasikan ketika 20% terlihat di viewport
  );

  animatedSections.forEach(section => observer.observe(section));
});

function removeHash() {
  // Mengganti hash dari URL tanpa reload halaman
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

