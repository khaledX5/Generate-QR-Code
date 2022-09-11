const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e)=> {
    e.preventDefault();
    hideCode();
    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    
    console.log(url,size);
    if(url== ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill the form to generate the QR Code'
          });
          hideSpinner();
    }else{
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            generateCode(size,url);
            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                console.log('createSaveBtn >',saveUrl);
                createSaveBtn(saveUrl);
            }, 50);
        }, 5000);

    }

};
/* hide and show Spinner */

const showSpinner = () =>{
    document.getElementById('spinner').style.display = 'block';
}
const hideSpinner = () =>{
    document.getElementById('spinner').style.display = 'none';
}
/* hide and generate QR Code */
const hideCode = ()=> {
    qr.innerHTML='';
    const savebtn =document.getElementById('save-link');
    if(savebtn) savebtn.remove();
}
const generateCode = (size , text) =>{
    new QRCode(document.getElementById("qrcode"),{
        text,
        width: size,
        height: size,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
      
}
const createSaveBtn =(saveUrl)=>{
        const link = document.createElement('a');
        document.getElementById('generated').appendChild(link);

        link.id = 'save-link';
        link.classList = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto";
        link.href = saveUrl;
        link.download = 'qrcode';
        link.innerHTML ='Save Image';
}

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);