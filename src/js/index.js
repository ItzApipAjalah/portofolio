var audio = document.getElementById("myAudio");
var firstTrack = "src/sound/odoriko.mp3";
  var secondTrack = "src/sound/踊り子.mp3";
  audio.volume = 0.5; 

  var isPlaying = false;

  function toggleMusic() {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      toastr.info('Music Dimatikan');

    } else {
      audio.play();
      isPlaying = true;
      toastr.info('Music Sedang memuat');

    }
  }

  document.addEventListener("keydown", function(event) {
    if (event.key === "1") {
      toggleMusic();
      
    }
  });
  var audio = document.getElementById("myAudio");
  // function playAudio() {
  //   audio.play().catch(function(error) {
  //     // Autoplay was prevented, possibly due to browser restrictions
  //     // You can handle this situation here, e.g., by displaying a play button for the user
  //     console.error("Autoplay prevented: " + error);
  //   });
  // }

  // // Call the playAudio function when the page loads
  // window.addEventListener("load", playAudio);

  
  
  // Function to show Toastr alert when music is loading
  // audio.addEventListener('loadstart', function() {
  //   toastr.info('Music Sedang memuat');
  // });

  // Function to show Toastr alert when music starts playing
  // audio.addEventListener('play', function() {
  //   toastr.info('Press 1 to toggle music on/off', '', {
  //     timeOut: 10000 // Set timeout to 10 seconds (10000 milliseconds)
  //   });
  // });

(window.setScroll = () => document.body.style.setProperty('--scroll', scrollY / innerHeight))();
['scroll', 'resize'].forEach(e => addEventListener(e, setScroll));

['mouseenter', 'mouseleave'].forEach(e => document.addEventListener(e, () => {
    if (e === 'mouseleave') bg.removeAttribute('style');
    bg.style.transition = 'transform .1s linear';
    setTimeout(() => bg.style.transition = '', 100);
}));

document.querySelector('#arrow svg').addEventListener('click', () => {
    const start = performance.now();

    !function step() {
        const progress = (performance.now() - start) / 200;
        scrollTo({ top: (innerWidth > 880 ? .3 : .8) * innerHeight * easeOutCubic(progress) });
        if (progress < 1) requestAnimationFrame(step);
    }();

    function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }
});

window.addEventListener('scroll', function() {
    var bg = document.getElementById('bg');
    var scrollPos = window.scrollY;

    var threshold = 180;

    if (scrollPos > threshold) {
        bg.classList.add('blur');
    } else {
        bg.classList.remove('blur');
    }
});



document.addEventListener("DOMContentLoaded", function() {
  toastr.options.progressBar = true;
  
  let isAndroid = /Android/i.test(navigator.userAgent);
  let message = isAndroid ? 'Tekan 2 kali menggunakan 2 jari untuk Mengganti gambar neko <3' : 'Tekan 2 Mengganti gambar neko <3';

  toastr.info(message, '', {
      timeOut: 5000 
  });

  toastr.info('Tekan 1 Untuk Menyalakan/Mematikan Music', '', {
      timeOut: 5000 
  });

  // Fungsi untuk mendapatkan waktu lokal Indonesia (WIB)
  function getLocalWIBTime() {
      const now = new Date();
      const utcOffset = 7 * 60; // Offset UTC+7 untuk WIB dalam menit
      const localTime = new Date(now.getTime() + (utcOffset * 60 * 1000));
      return localTime;
  }

  // Fungsi untuk memperbarui toastr dengan waktu WIB
  function updateToastrWithWIBTime() {
      const localTime = getLocalWIBTime();
      const hours = localTime.getUTCHours().toString().padStart(2, '0');
      const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
      const seconds = localTime.getUTCSeconds().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}:${seconds} WIB`;

      toastr.info(`Jam WIB: ${timeString}`, '', {
          timeOut: 5000 
      });
  }

  // Panggil fungsi untuk memperbarui toastr dengan waktu WIB saat halaman dimuat
  updateToastrWithWIBTime();


  // Perbarui toastr dengan waktu WIB setiap menit
  setInterval(updateToastrWithWIBTime, 60000);
});


  //Reset scroll top

  history.scrollRestoration = "manual";

  $(window).on('beforeunload', function(){
        $(window).scrollTop(0);
  });
  

  document.getElementById('showImage').addEventListener('click', function () {
      Swal.fire({
          imageUrl: 'https://w0.peakpx.com/wallpaper/778/9/HD-wallpaper-404-error-404-error-glitch-glitch.jpg', 
          imageAlt: 'Gambar',
          showCloseButton: true 
      });
  });

document.getElementById('cv').addEventListener('click', function () {
  Swal.fire({
      imageUrl: '../../src/image/CV/CV.jpg', 
      imageAlt: 'Gambar',
      showCloseButton: true, 
      footer: '<a href="../../src/image/CV/CV.pdf" download>Download CV</a>'
  });
});



document.addEventListener('DOMContentLoaded', function() {
  // Fungsi untuk mendapatkan waktu lokal Indonesia (WIB)
  function getLocalWIBHour() {
    // Menggunakan offset UTC+7 untuk WIB
    const now = new Date();
    const utcHour = now.getUTCHours();
    const wibHour = (utcHour + 7) % 24;
    return wibHour;
  }

  // Fungsi untuk mengatur latar belakang berdasarkan waktu
  function setBackgroundBasedOnTime() {
    const wibHour = getLocalWIBHour();
    const bgElement = document.getElementById('bg');

    if (wibHour >= 6 && wibHour < 18) {
      // Pagi hingga sore (06:00 - 17:59) menggunakan bg.webp
      bgElement.style.backgroundImage = "url('../../src/image/bg.webp')";
    } else {
      // Malam (18:00 - 05:59) menggunakan bg2.webp
      bgElement.style.backgroundImage = "url('../../src/image/bg2.webp')";
    }
  }

  setBackgroundBasedOnTime();

  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      setBackgroundBasedOnTime();
    }
  });

  window.addEventListener('focus', function() {
    setBackgroundBasedOnTime();
  });

  setInterval(setBackgroundBasedOnTime, 100);
});

// function fetchLocationAndUpdateMap() {
//   fetch('https://perpus.amwp.website/api/maps')
//       .then(response => response.json())
//       .then(data => {
//           // Extract coordinates from the maps_url
//           const mapsUrl = data.maps_url;
//           const coordinates = mapsUrl.match(/q=([-0-9.]+),([-0-9.]+)/);
//           const latitude = parseFloat(coordinates[1]);
//           const longitude = parseFloat(coordinates[2]);
          
//           // Generate Google Maps embed URL
//           const mapEmbedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;

//           // Update the location-map div with embedded map
//           document.getElementById('location-map').innerHTML += `<iframe frameborder="0" style="border:0;" allowfullscreen loading="lazy" src="${mapEmbedUrl}"></iframe>`;
//       })
//       .catch(error => console.error('Error fetching location data:', error));
// }

// // Fetch and update location initially
// fetchLocationAndUpdateMap();

// // Update location and map every 1 minute
// setInterval(fetchLocationAndUpdateMap, 60000); // 60000 milliseconds = 1 minute


document.body.style.overflow = 'hidden';
// Re-enable scrolling after 1 second
setTimeout(function() {
  document.body.style.overflow = 'auto';
}, 1400);

  // $(document).ready(function() {
  //   var movementStrength = 25;
  //   var height = movementStrength / $(window).height();
  //   var width = movementStrength / $(window).width();
  //   $("#bg").mousemove(function(e){
  //             var pageX = e.pageX - ($(window).width() / 2);
  //             var pageY = e.pageY - ($(window).height() / 2);
  //             var newvalueX = width * pageX * -1 - 25;
  //             var newvalueY = height * pageY * -1 - 50;
  //             $('#bg').css("background-position", newvalueX+"px     "+newvalueY+"px");
  //   });
  //   });
  // Tambahkan event listener untuk menangani peristiwa saat semua konten dimuat

  // document.addEventListener('DOMContentLoaded', function() {
//   // Fungsi untuk menerapkan latar belakang yang tersimpan
//   function applySavedBackground() {
//     const savedBackground = localStorage.getItem('selectedBackground');
//     if (savedBackground) {
//       document.getElementById('bg').style.backgroundImage = `url('../../src/image/${savedBackground}')`;
//     }
//   }

//   // Terapkan latar belakang saat halaman dimuat
//   applySavedBackground();

//   // Terapkan kembali latar belakang saat pengguna kembali ke tab
//   document.addEventListener('visibilitychange', function() {
//     if (document.visibilityState === 'visible') {
//       applySavedBackground();
//     }
//   });

//   document.addEventListener('keydown', function(event) {
//     // Memeriksa apakah tombol yang ditekan adalah "3"
//     if (event.key === '3') {
//       // Menampilkan SweetAlert dengan pilihan latar belakang
//       Swal.fire({
//         title: 'Pilih latar belakang(bug)',
//         input: 'select',
//         inputOptions: {
//           'bg2.webp': 'Background 2',
//           'bg.webp': 'Background 1'
//         },
//         inputPlaceholder: 'Pilih latar belakang',
//         showCancelButton: true,
//         confirmButtonText: 'Simpan',
//         cancelButtonText: 'Batal',
//         inputValidator: (value) => {
//           if (!value) {
//             return 'Anda harus memilih salah satu opsi';
//           }
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           const selectedBackground = result.value;
//           // Ubah latar belakang sesuai dengan pilihan pengguna
//           document.getElementById('bg').style.backgroundImage = `url('../../src/image/${selectedBackground}')`;
//           // Simpan pilihan latar belakang ke localStorage
//           localStorage.setItem('selectedBackground', selectedBackground);
//           Swal.fire('Sukses!', 'Latar belakang telah diubah', 'success');
//         }
//       });
//     }
//   });
// });