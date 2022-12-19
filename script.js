console.log("JavaScript is ready to run");
const videosContainer=document.getElementById('videosContainer');
const videoIdInput= document.getElementById('videoId');
const popup = document.getElementById('popup');
const video = document.querySelector('#popup > iframe');
const IDS_KEY = 'youTubeVideoIds';
let youTubeVideoIds=[];


//localStorage.setItem('youTubeVideoIds',JSON.stringify(['-O5O32hchis','9C74_rOgui8']))
const loadVideos = () =>{
    youTubeVideoIds = JSON.parse(localStorage.getItem(IDS_KEY)) || [];
    
}

const displayVideos = () => {
    const videosHTMLString = youTubeVideoIds.map(
        (id)=>`
        <li onclick="clickVideo(event,'${id}')">
            <img class="thumbnail" src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" alt="Cover image
            for youtube video with id ${id}">
            <button class="delete-btn" > &times; </button>
         </li>
        `
        ).join('');
    videosContainer.innerHTML = videosHTMLString;
    
};

const clickVideo = (event, id) => {
    if (event?.target?.classList?.contains('delete-btn')) {
      youTubeVideoIds = youTubeVideoIds.filter((i) => i !== id);
      localStorage.setItem('youTubeVideoIds', JSON.stringify(youTubeVideoIds));
      displayVideos();
    } else {
      video.src = `https://www.youtube.com/embed/${id}`;
      popup.classList.add('open');
      popup.classList.remove('closed');
    }
  };

const handlePopupClick = () => {
    popup.classList.add('closed');
    popup.classList.remove('open');
  };
  

const saveVideo = (e)=>{
    e.preventDefault();
    const videoId=videoIdInput.value;
    youTubeVideoIds.unshift(videoId);
    videoIdInput.value="";
    localStorage.setItem(IDS_KEY,JSON.stringify(youTubeVideoIds));
    displayVideos();

}

loadVideos();
displayVideos();
