document.getElementById('button').addEventListener('click', () => {

    fetch('/random')
        .then(res => {
            if (!res.ok) {
                throw new Error('Request failed');
            }
            return res.json();
        })
        .then(data => {
            document.querySelector('#recommendation p').textContent =
                `${data.book_title} (Autor: ${data.author})`;
        })
        .catch(err => {
            console.log('No data available', err);
        });

});
