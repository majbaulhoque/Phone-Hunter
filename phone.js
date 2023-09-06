const loadPhone = async (searchValue='iphone', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const data = await res.json();
    const phone = data.data;
    displayPhones(phone, isShowAll);
}

const displayPhones = (input, isShowAll) =>{
    // console.log(input);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    
     // display show ALL button more than 12 phone
    const showAllContainer = document.getElementById('show-all-container');
    if(input.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }

    // input = input.slice(0,12) [Slice display first five phones]
    if(!isShowAll){
        input = input.slice(0,12)
    }

    

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
            <button onclick="handleShowDetail('${phones.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;
        // 4 Append Child
        phoneContainer.appendChild(phoneCard);
    });
    // Hide loading spinner
    toggleLoadingSpinner(false);
}

const handleShowDetail = async(id) =>{
    // console.log('test',id);
    // load individual / single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data);
    const phone = data.data

    showPhoneDetails(phone);
}

const showPhoneDetails = (phones) => {
    console.log(phones);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phones.name;
    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHtml = `
    <img src="${phones.image}" alt="">
    <p><span>Storage:</span>${phones.mainFeatures.storage}</p>
    `

    // Show the modal
    showDetailsModal.showModal()
}

// Handle Search Button

const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-Field');
    const searchValue = searchField.value;
    loadPhone(searchValue, isShowAll);
} 

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// Handle Show All

const showAll = () =>{
    handleSearch(true)
}

loadPhone()