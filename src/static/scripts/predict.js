const host = 'http://localhost:5000'

let input = document.querySelector('#img-input')
let img = document.querySelector('#selected')
let submit = document.querySelector('#submit')
let pred = document.querySelector('#pred')
let progress = document.querySelector('#progress')

input.addEventListener('change', () => {
    let reader = new FileReader()
    reader.onload = () => {
        let dataURL = reader.result
        img.src = dataURL
        pred.innerHTML = ''
    }

    reader.readAsDataURL(input.files[0])
})

let model

(async () => {
    model = await tf.loadLayersModel(`${host}/mobileNetjs/model.json`)
    progress.style.display = 'none'
})()

submit.addEventListener('click', async () => {
    let tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([224,224])
        .toFloat()
    
    //Preprocessing
    let offset = tf.scalar(127.5)
    const processed = tensor.sub(offset)
        .div(offset)
        .expandDims()

    let predictions = await model.predict(tensor).data()

    console.log(predictions)
})
