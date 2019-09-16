
import React from 'react'
import './StoryDashboard.css'
import { apiCall } from '../../services/apiService'
import { Link } from 'react-router-dom'


class StoryDashboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: null,
            description: '',
            user: '',
            chapters: []

        };
    }

    componentDidMount = () => {
        // this.getName()
        document
            .getElementsByTagName("HTML")[0]
            .setAttribute("data-theme", localStorage.getItem("theme"));
        this.fetchStoryInfo()

    }


     
    fetchStoryInfo = async () => {
        let id = this.props.match.params.id
        const response = await apiCall.get(`/story/${id}`)
        // const {
        //   data: {
        //     story: { name, image, description, user, chapters }
        //   }
        // } = response
        this.setState({
          name: response.data.name,
          image: response.data.imgUrl,
          description: response.data.description,
          user: response.data.user,
          chapters: response.data.chapters
        })
      }


    // getName = async () => {
    //     let id = this.props.match.params.id
    //     let storyid = await apiCall.get(`/story/${id}`)
    //     this.setState({
    //         name: storyid.data.name,
    //         description: storyid.data.description,
    //     })
    //     console.log()
    // }

    renderChapters = () => {
        const { chapters } = this.state
        console.log(this.state.chapters)
        let chapterRowColor = 'user-chapter-white'
        return chapters.map(chapter => {
          if(chapterRowColor==='user-chapter-white'){
            chapterRowColor = 'user-chapter-grey'
          }else{
            chapterRowColor = 'user-chapter-white'
          }
          return (
            <div key={chapter.id} className={chapterRowColor}>
              <div className="chapter-row-left">
                <Link to={`/chapter/story/${chapter.id}`} className='chapter-link'>
                <img
                  src={chapter.imgUrl}
                  alt="ProjPic"
                  className="profile-chapter-pic"
                />
                 <h3 className="chapter-name">{chapter.name}</h3>
              </Link>
             
              </div>
              <div className='chapter-header'>
                <Link to={`/chapter/update/${chapter.id}`}><button className='chapter-button'>Edit</button></Link>
                <button className='chapter-button' onClick={() => this.deletechapter(chapter.id)}>Delete</button>
              </div>
            
            </div>
          )
        })
      }




    render(){
        const { image, description, user } = this.state
        let id = this.props.match.params.id
        return(
            <div>
                <div className='story-banner'>
                 

                  <div className='story-image-banner'>
                    <img src={image} alt="ProjPic" className="story-pic" />
                  </div>
                 
                </div>
                <div className='story-info-banner'>
                  <h1 className='story-title'>{this.state.name}</h1>
                  <h4 className='story-description'>{description}</h4>

                </div>
                  <Link
                      to={`/chapter/story/upload/${id}`}
                      className="links"
                      >
                  <div className="new-chapter-button">Upload New Chapter</div>
                  </Link>
                <div className="story-chapter-list">
                    {this.renderChapters()}
                </div>

            </div>
        )
    }
}

export default StoryDashboard;