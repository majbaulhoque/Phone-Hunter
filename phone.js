const loadPhone = async (searchText='13', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll)
}

const displayPhones = (phone, isShowAll) =>{

    const phoneContainer = document.getElementById('phone-container');
    // ! Clear phone container cards before adding new cards
    phoneContainer.innerText = '';

    const showAllContainer = document.getElementById('show-all-container')
    if(phone.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }


    // ? Display only first 12 phones
    if(!isShowAll){
        phone = phone.slice(0,12)
    }

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
            <p></p>
            <div class="card-actions justify-center mt-6">
                <button onclick="handleShowDetail('${data.slug}'); " class="btn btn-primary">Show Details</button>
            </div>
        </div> 
        `;
        phoneContainer.appendChild(phoneCard)
    });

    // Hide Loading Spinner
    toggleLoadingSpinner(false)
}

//

const handleShowDetail = async(id) => {
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);

    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetail = document.getElementById('show-detail-phone-container');
    showDetail.innerHTML = `
        <img src ="${phone.image}" alt=""/>
        <p><span>Display Size:</span>${phone.mainFeatures.displaySize}</p>
        <h4><span>Storage: </span>${phone?.mainFeatures?.storage}</h4>
        <h4><span>GPS: </span>${phone.others.GPS}</h4>
        
    `

    // Show The Modal
    show_details_modal.showModal()
}

// Handle Search Button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
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

const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone()