const loadPhone = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones)
}

const displayPhones = phone =>{

    const phoneContainer = document.getElementById('phone-container')

    phone.forEach(data =>{
        console.log(data);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `
        card w-96 bg-gray-100 shadow-xl mx-auto
        `;
        phoneCard.innerHTML =`
        <figure>
            <img src="${data.image}" alt="phone" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${data.phone_name}</h2>
            <p>${data.slug}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div> 
        `;
        phoneContainer.appendChild(phoneCard)
    })
}

loadPhone()