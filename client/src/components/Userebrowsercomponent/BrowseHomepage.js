import React , {useEffect ,useState} from 'react'
import ReactPlayer from 'react-player'
import Modal from 'react-modal'
import ReactAudioPlayer from'react-audio-player'
import { Document, Page, pdfjs } from 'react-pdf';
import './BrowseHomepage.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function BrowseHomepage() {
    const [data,setData] =useState([])
    const [modalIsOpen ,setModalISOpen] =React.useState(false);
    const urls ='http://localhost:5000/books'
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }

      

    useEffect(()=>{
    fetch(urls).then((result)=>{
         result.json().then((res)=>{
             setData(res.books)
          
         })
         
     })
    },[])

    
    return (
        <div class="browsehome">
        {/* static header....................................................................... */}
        <div class="Container videoheader bg-gray">
        <div className="feature-title-browse">
        <h2 className="subtitles">
            Watch  Now
          </h2><br></br>
          <h3 className="subtitle"><address>
            Forever alone in a crowd,<br></br>
            failed comedian Arthur Fleck seeks<br></br>
            connection as he walks the streets of<br></br>
             Gotham City. Arthur wears two<br></br>
            masks, the one he paints for his<br></br>
             day job as a clown, and the guise<br></br>
            he projects in a futile attempt to <br></br>
            feel like he is part of the world<br></br>
            around him.</address> 
          </h3>
          <button class="btnst btn bg-danger" onClick={() => setModalISOpen(true)}>Play</button>
          <Modal isOpen={modalIsOpen} onRequestClose={()=>  setModalISOpen(false)}>
          <ReactPlayer
            controls
            playIcon
            width
            height='500px'  url='http://localhost:5000/videos/video/outside-the-wire' /> 
           </Modal>
         </div>
         </div>

          {/* dynamic fatch data................................................................ */}
              <div class="container-fluid bg-light">
              <h1 class="text-dark">Documentaries</h1>
              <div class="row">
             {
             data.map((item , i)=>
                    <div key={i} class=" col col-3">
                        <ReactPlayer
                            width='18rem'
                            height='10rem'
                            controls
                            url='http://localhost:5000/videos/video/tom-and-jerry' />
                            <h5 class="text-dark">{item.title}</h5><br></br>
                             <h6 class="text-dark"><i>{item. authors}</i></h6> 
                        </div>
                        )
                     }
               </div>
            </div>
             {/* dynamic fatch data................................................................ */}
             <div class="container-fluid bg-light">
              <h1 class="text-dark">Comedies</h1>
              <div class="row">
             {
             data.map((item , i)=>
                    <div key={i} class=" col col-3">
                        <ReactPlayer
                            width='18rem'
                            height='10rem'
                            controls
                            url='http://localhost:5000/videos/video/tom-and-jerry' />
                            <h5 class="text-dark">{item.title}</h5>
                            <h6 class="text-dark"><i>{item. authors}</i></h6>
                        </div>
                        )
                     }
               </div>
            </div>
             {/* dynamic fatch data................................................................ */}
             <div class="container-fluid bg-light">
              <h1 class="text-dark">Children</h1>
              <div class="row">
             {
             data.map((item , i)=>
                    <div key={i} class=" col col-3">
                        <ReactPlayer
                            width='18rem'
                            height='10rem'
                            controls
                            url='http://localhost:5000/videos/video/tom-and-jerry' />
                            <h5 class="text-dark">{item.title}</h5>
                            <h6 class="text-dark"><i>{item. authors}</i></h6>
                        </div>
                        )
                     }
               </div>
            </div>
             {/* dynamic fatch data................................................................ */}
             <div class="container-fluid bg-light">
              <h1 class="text-dark">Feel-Good</h1>
              <div class="row">
             {
             data.map((item , i)=>
                    <div key={i} class=" col col-3">
                        <ReactPlayer
                            width='18rem'
                            height='10rem'
                            controls
                            url='http://localhost:5000/videos/video/tom-and-jerry' />
                           <h5 class="text-dark">{item.title}</h5> 
                           <h6 class="text-dark"><i>{item. authors}</i></h6> 
                        </div>
                        )
                     }
               </div>
            </div>
             {/* dynamic fatch data................................................................ */}
             <div class="container-fluid bg-light">
              <h1 class="text-dark">Crime</h1>
              <div class="row">
             {
             data.map((item , i)=>
                    <div key={i} class=" col col-3">
                        <ReactPlayer
                            width='18rem'
                            height='10rem'
                            controls
                            url="http://localhost:5000/videos/video/soul" />
                            <h5 class="text-dark">{item.title}</h5>
                            <h6 class="text-dark"><i>{item. authors}</i></h6>
                        </div>
                      
                        )
                     }
               </div>
            </div>
           
           
        </div>
    )
}

export default BrowseHomepage
