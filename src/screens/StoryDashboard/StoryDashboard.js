
import React from 'react'
import './StoryDashboard.css'
import { apiCall } from '../../services/apiService'
import { Link } from 'react-router-dom'


class StoryDashboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: null,
            description: '',
            user: '',
            chapters: []

        };
    }

    componentDidMount = () => {
        this.getName()
        document
            .getElementsByTagName("HTML")[0]
            .setAttribute("data-theme", localStorage.getItem("theme"));
    }


    getName = async () => {
        let id = this.props.match.params.id
        let chapterid = await apiCall.get(`/chapter/${id}`)
        this.setState({
            title: chapterid.data.name,
            image: chapterid.data.imgUrl,
            description: chapterid.data.description,
            user: chapterid.data.userId,
        })
        console.log()
    }

    renderChapters = () => {
        const { chapters } = this.state
        console.log(this.state.chapters)
        return chapters.map(chapter => {
          return (
            <div key={chapter.id} className="user-chapter">
              <div className='chapter-header'>
                <Link to={`/chapter/update/${chapter.id}`}><button>Edit</button></Link>
                <h3>{chapter.name}</h3>
                <button onClick={() => this.deletechapter(chapter.id)}>Delete</button>
              </div>
              <Link to={`/chapter/${chapter.id}`}>
                <img
                  src={chapter.imgUrl}
                  alt="ProjPic"
                  className="profile-chapter-pic"
                />
              </Link>
            </div>
          )
        })
      }




    render(){
        const { title, image, description, user } = this.state

        return(
            <div>
                <h1>{this.state.name}</h1>
                <div>Upload New Chapter</div>

                {/* put given chapters here */}
                <h1 className="story-title">{title}</h1>

                <img src={image} alt="ProjPic" className="chapter-pic" />

                <div className="story-chapter-list">
                    {this.renderChapters()}
                </div>

            </div>
        )
    }
}

export default StoryDashboard;