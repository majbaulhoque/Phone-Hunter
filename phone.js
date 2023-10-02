const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones)
}

const displayPhones = phone =>{

    const phoneContainer = document.getElementById('phone-container');
    // ! Clear phone container cards before adding new cards
    phoneContainer.innerText = '';

    const showAllContainer = document.getElementById('show-all-container')
    if(phone.length > 12){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }


    // ? Display only first 12 phones
    phone = phone.slice(0,12)

    phone.forEach(data =>{
        console.log(data);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `
        card w-96 bg-gray-100 p-4 shadow-xl mx-auto
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
    });

    // Hide Loading Spinner
    toggleLoadingSpinner(false)
}

// Handle Search Button
const handleSearch = () =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
    console.log(searchText);
}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner =  document.getElementById('loading-container');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}

loadPhone()