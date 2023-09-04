const loadPhone = async (searchValue) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const data = await res.json();
    const phone = data.data;
    displayPhones(phone);
}

const displayPhones = input =>{
    console.log(input);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // display show ALL button more than 12 phone
    const showAllContainer = document.getElementById('show-all-container');
    if(input.length > 12){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }
    
    // input = input.slice(0,12) [Slice display first five phones]
    input = input.slice(0,12)

    input.forEach(phones =>{
        // console.log(phones);
        // 2. Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
        // set inner HTML
        phoneCard.innerHTML = `
        <figure><img src="${phones.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phones.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        </div>
        </div>
        `;
        // 4 Append Child
        phoneContainer.appendChild(phoneCard);
    })
}

// Handle Search Button

const handleSearch = () =>{
    const searchField = document.getElementById('search-Field');
    const searchValue = searchField.value;
    loadPhone(searchValue);
} 


// loadPhone();