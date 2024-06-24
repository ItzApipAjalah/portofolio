let waifuImages = JSON.parse(localStorage.getItem('waifuImages')) || [];

const gachaWaifuWidget = document.getElementById('gachaWidget');

gachaWaifuWidget.addEventListener('click', async function() {
    const lastAccessTime = localStorage.getItem('waifuLastAccessTime');

    if (lastAccessTime) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - parseInt(lastAccessTime);
        
        if (elapsedTime < 20000) { // 20000 milidetik = 20 detik
            toastr.warning('Anda telah menggunakan gacha waifu dalam waktu 20 detik terakhir.');
            return;
        }
    }

    try {
        const response = await fetch('https://api.waifu.pics/sfw/waifu');
        const data = await response.json();
        
        const imageUrl = data.url;

        // Menyimpan URL gambar ke dalam array waifuImages
        waifuImages.push(imageUrl);
        
        Swal.fire({
            imageUrl: '',
            html: '<img id="waifuImage" src="' + imageUrl + '" alt="Waifu" style="filter: blur(20px); max-width: 100%; height: auto; transition: filter 0.3s;"><div id="clickText" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 24px;">Click gambar Untuk Melihat</div>',
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: 'Close',
            confirmButtonText: 'Download',
            didOpen: () => {
                const waifuImage = document.getElementById('waifuImage');
                const clickText = document.getElementById('clickText');

                waifuImage.addEventListener('click', function() {
                    waifuImage.style.filter = 'none';
                    clickText.style.display = 'none';
                });

                // Membuat tombol "Waifu Kamu" di dalam SweetAlert
                const waifuButton = document.createElement('button');
                waifuButton.innerText = 'Waifu Kamu';
                waifuButton.classList.add('swal2-confirm', 'swal2-styled');
                waifuButton.addEventListener('click', function() {
                    // Menampilkan SweetAlert dengan semua URL gambar waifu
                    Swal.fire({
                        title: 'Waifu Kamu',
                        html: waifuImages.map(imageUrl => `<img src="${imageUrl}" style="max-width: 100%; height: auto;">`).join(''),
                        showCloseButton: true
                    });
                });

                // Menambahkan tombol "Waifu Kamu" ke dalam SweetAlert
                const buttonsContainer = Swal.getActions();
                buttonsContainer.appendChild(waifuButton);
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const downloadLink = document.createElement('a');
                downloadLink.href = imageUrl;
                downloadLink.download = 'waifu.jpg';
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        });

        const currentTime = new Date().getTime();
        localStorage.setItem('waifuLastAccessTime', currentTime.toString());
        localStorage.setItem('waifuImages', JSON.stringify(waifuImages)); // Simpan array waifuImages ke localStorage
    } catch (error) {
        console.error('Error fetching waifu image:', error);
        toastr.error('Terjadi kesalahan saat mengambil gambar waifu. Silakan coba lagi nanti.');
    }
});