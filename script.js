const API_KEY='AIzaSyDB7N5F46TfK2Spu2IPbuMUCpOR029un4Y';
const searchForm=document.getElementById('searchForm');
const loadingGif=document.getElementById('loadingGif');
const container=document.getElementById('container');


searchForm.addEventListener('submit',()=>{
    const searchFormValue=document.getElementById('inpt').value;
    fetchVideo(searchFormValue);
})


function fetchVideo(keyword){
    loadingGif.style.display="block";

    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=funny&key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        loadingGif.style.display="none";
        displayVideo(data)
    })
    .catch(err => console.log(err))

}

function loadVideo(id){
    container.style.display='block';
    container.innerHTML=`
    <iframe 
        src="https://www.youtube.com/embed/${id}" 
        title="nai" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" 
        allowfullscreen>
    </iframe>
    `;
}

function displayVideo(data){
    container.style.display='grid';
    let videos='';
    data.items.map(res => {
        videos +=htmlCard(res.id.videoId,res.snippet.thumbnails.high.url,res.snippet.thumbnails.high.width,res.snippet.thumbnails.high.height,res.snippet.title,res.snippet.channelTitle);
    })
    container.innerHTML=videos;
}


fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=65&chart=mostPopular&regionCode=US&key=${API_KEY}`)
.then(res => res.json())
.then(data => displayVideo(data))
.catch(err => console.log(err))

function htmlCard(videoId,imageUrl,imageWidth,imageHeight,videoTitle,channelTitle){
    return `
            <div id="singleItem" onclick="loadVideo('${videoId}')">
                <img src="${imageUrl}" style="width:${imageWidth};height:${imageHeight}"/>
                <div id="bottomInfo">
                    <strong>${videoTitle}</strong>
                    </br>
                    <a href="">${channelTitle}</a>
                    </br>
                </div>
            </div>
            `;
}



//https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=AIzaSyDB7N5F46TfK2Spu2IPbuMUCpOR029un4Y

//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY] HTTP/1.1

//https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY] HTTP/1.1
